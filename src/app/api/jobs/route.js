import { ApifyClient } from "apify-client";

// Apify API Route — server-side only
const APIFY_TOKEN = process.env.APIFY_TOKEN;

// Primary: worldunboxer/rapid-linkedin-scraper — FREE, 9.3K users
// Fallback: borderline/indeed-scraper — Pay-per-result, free trial available
const LINKEDIN_FREE_ACTOR = "worldunboxer/rapid-linkedin-scraper";
const INDEED_ACTOR = "borderline/indeed-scraper";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("query") || "embryologist IVF";
  const location = searchParams.get("location") || "Germany";

  if (!APIFY_TOKEN || APIFY_TOKEN === "your_apify_token_here") {
    return Response.json({ error: "APIFY_TOKEN not configured", jobs: [], source: "no-token" });
  }

  const client = new ApifyClient({ token: APIFY_TOKEN });
  let jobs = [];

  // --- Attempt 1: Free LinkedIn Scraper (worldunboxer) ---
  try {
    console.log(`[Apify] Free LinkedIn scraper: "${rawQuery}" in "${location}"`);
    const run = await client.actor(LINKEDIN_FREE_ACTOR).call({
      keywords: rawQuery,
      location: location,
      rows: 25,
      proxy: { useApifyProxy: true },
    });
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    console.log(`[Apify] LinkedIn FREE returned ${items.length} items`);
    if (items[0]) console.log("[Apify] Keys:", Object.keys(items[0]).slice(0, 12).join(", "));

    if (items.length > 0) {
      jobs = items.map((item, idx) => normalizeLinkedIn(item, idx, location));
    }
  } catch (err) {
    console.error("[Apify] LinkedIn FREE failed:", err.message);
  }

  // --- Attempt 2: Indeed Scraper (borderline — free trial) ---
  if (jobs.length === 0) {
    try {
      console.log(`[Apify] Trying borderline Indeed scraper...`);
      const run = await client.actor(INDEED_ACTOR).call({
        position: rawQuery,
        location: location,
        country: "DE",
        maxItems: 25,
      });
      const { items } = await client.dataset(run.defaultDatasetId).listItems();
      console.log(`[Apify] Indeed returned ${items.length} items`);
      if (items.length > 0) {
        jobs = items.map((item, idx) => normalizeIndeed(item, idx, location));
      }
    } catch (err) {
      console.error("[Apify] Indeed failed:", err.message);
    }
  }

  // --- Deduplicate ---
  const seen = new Set();
  const deduplicated = jobs.filter((j) => {
    const key = `${j.title}-${j.company}`.toLowerCase().replace(/\s+/g, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return Response.json({
    jobs: deduplicated,
    source: deduplicated.length > 0 ? "apify" : "empty",
    count: deduplicated.length,
    timestamp: new Date().toISOString(),
  });
}

// ---- Normalizers ----

function normalizeLinkedIn(item, idx, fallbackLocation) {
  // worldunboxer/rapid-linkedin-scraper field mapping:
  // job_id, job_url, job_title, company_name, company_url, location,
  // time_posted, num_applicants, salary_range, job_description, job_description_raw_html, company_logo_url
  return {
    id: `li-${item.job_id || Date.now()}-${idx}`,
    company: item.company_name || item.companyName || item.company || "Unknown Company",
    title: item.job_title || item.title || item.jobTitle || "Unknown Title",
    industry: item.jobFunction || item.industry || "Life Science / Biotech",
    city: item.location || item.city || fallbackLocation,
    region: item.location || fallbackLocation,
    workType: item.workType || item.employmentType || item.workplace_type || "See listing",
    language: "See job listing",
    isInternational: true,
    visaSponsorship: "Check with employer",
    applicationLink: item.job_url || item.jobUrl || item.applyUrl || item.url || "#",
    deadline: item.time_posted || item.postedAt || "See job listing",
    keySkills: Array.isArray(item.skills) ? item.skills.slice(0, 6) : [],
    salaryRaw: item.salary_range || null,
    description: item.job_description || item.description || item.jobDescription || "",
    whyItMatchesMe: "Auto-scored against Hadia Awan's CV profile",
    missingSkills: [],
    competition: "Medium",
    notes: `LinkedIn · ${item.num_applicants ? item.num_applicants + ' applicants · ' : ''}Scraped ${new Date().toLocaleDateString("de-DE")}`,
    category: "saved",
    source: "linkedin",
  };
}


function normalizeIndeed(item, idx, fallbackLocation) {
  return {
    id: `in-${Date.now()}-${idx}`,
    company: item.company || item.companyName || "Unknown Company",
    title: item.positionName || item.title || item.jobTitle || "Unknown Title",
    industry: "Life Science / Biotech",
    city: item.location || item.city || fallbackLocation,
    region: item.location || fallbackLocation,
    workType: item.jobType || item.employmentType || "See listing",
    language: "See job listing",
    isInternational: true,
    visaSponsorship: "Check with employer",
    applicationLink: item.url || item.link || item.jobUrl || "#",
    deadline: item.date || item.scrapedAt || "See job listing",
    keySkills: [],
    description: item.description || item.summary || item.jobDescription || "",
    whyItMatchesMe: "Auto-scored against Hadia Awan's CV profile",
    missingSkills: [],
    competition: "Medium",
    notes: `Indeed.de · Scraped ${new Date().toLocaleDateString("de-DE")}`,
    category: "saved",
    source: "indeed",
  };
}
