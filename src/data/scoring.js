// Scoring Engine — calculates all 10 scores for each job based on Hadia's CV
import { hadiaProfile } from "./hadiaProfile";

// Keyword banks with weights
const KEYWORDS = {
  tier1: [
    "ivf", "embryo", "oocyte", "embryology", "cryopreservation", "vitrification",
    "in-vitro", "in vitro", "reproductive", "reproduction", "art", "assisted reproductive",
    "ivm", "blastocyst", "fertilization", "fertilisation", "ivc", "embryologist",
    "semen", "sperm", "gamete", "follicular",
  ],
  tier2: [
    "ngs", "next generation sequencing", "crispr", "rt-qpcr", "qpcr", "pcr",
    "rna extraction", "dna extraction", "cdna", "chip", "chromatin",
    "cell culture", "tissue culture", "molecular biology", "genomics",
    "gene editing", "sequencing", "bioinformatics",
  ],
  tier3: [
    "laboratory", "quality control", "sop", "research", "data analysis",
    "life science", "biotech", "biotechnology", "biological", "scientist",
    "lab manager", "laboratory manager", "cell biology", "gcp", "gmp", "glp",
  ],
  english: [
    "english", "international", "global", "multinational", "english-speaking",
    "english required", "business english",
  ],
  german: [
    "deutsch", "german", "deutschkenntnisse", "deutschsprachig", "muttersprache",
    "german required", "german native",
  ],
};

// --- Individual Score Calculators ---

export function calcCVMatch(job) {
  const text = `${job.title} ${job.description || ""} ${(job.keySkills || []).join(" ")}`.toLowerCase();
  let score = 0;
  let max = 0;
  KEYWORDS.tier1.forEach((k) => { max += 3; if (text.includes(k)) score += 3; });
  KEYWORDS.tier2.forEach((k) => { max += 2; if (text.includes(k)) score += 2; });
  KEYWORDS.tier3.forEach((k) => { max += 1; if (text.includes(k)) score += 1; });
  const raw = Math.round((score / max) * 100);
  return Math.min(100, Math.max(0, raw));
}

export function calcHiringProbability(job, cvMatch) {
  // Based on CV match, competition, and company openness to internationals
  let base = cvMatch * 0.7;
  if (job.competition === "Low") base += 15;
  else if (job.competition === "Medium") base += 8;
  if (job.visaSponsorship?.toLowerCase().includes("yes")) base += 5;
  if (job.englishAccessScore >= 70) base += 5;
  return Math.min(95, Math.round(base));
}

export function calcEnglishAccess(job) {
  const text = `${job.title} ${job.description || ""} ${job.language || ""}`.toLowerCase();
  let score = 50; // default neutral
  KEYWORDS.english.forEach((k) => { if (text.includes(k)) score += 10; });
  KEYWORDS.german.forEach((k) => { if (text.includes(k)) score -= 15; });
  if (job.language?.toLowerCase().includes("english")) score += 20;
  if (job.language?.toLowerCase().includes("german")) score -= 20;
  // International company bonus
  if (job.isInternational) score += 15;
  return Math.min(100, Math.max(0, score));
}

export function calcSkillGap(cvMatch) {
  // Inverse of CV match — how much is missing
  return Math.max(0, 100 - cvMatch);
}

export function calcSalaryScore(job) {
  // Estimate salary attractiveness based on role and city (German market)
  const seniorKeywords = ["manager", "lead", "senior", "head", "director", "principal"];
  const entryKeywords = ["junior", "intern", "assistant", "trainee", "student"];
  const text = job.title?.toLowerCase() || "";
  if (seniorKeywords.some((k) => text.includes(k))) return 80;
  if (entryKeywords.some((k) => text.includes(k))) return 45;
  return 62; // Mid-level estimate
}

export function calcVisaSponsorship(job) {
  if (!job.visaSponsorship) return 30;
  const v = job.visaSponsorship.toLowerCase();
  if (v.includes("yes") || v.includes("confirmed")) return 85;
  if (v.includes("possible") || v.includes("likely")) return 60;
  if (v.includes("no") || v.includes("eu only")) return 10;
  return 35;
}

export function calcCareerGrowth(job) {
  const growthKeywords = ["r&d", "research", "development", "innovation", "global", "international", "startup"];
  const text = `${job.title} ${job.industry} ${job.notes || ""}`.toLowerCase();
  let score = 50;
  growthKeywords.forEach((k) => { if (text.includes(k)) score += 8; });
  if (job.isInternational) score += 10;
  return Math.min(95, score);
}

export function calcApplicationComplexity(job) {
  // Lower score = easier to apply
  const easyKeywords = ["easy apply", "quick apply", "direct apply", "one click"];
  const hardKeywords = ["assessment", "test", "cover letter required", "portfolio", "presentation"];
  const text = `${job.applicationComplexity || ""} ${job.notes || ""}`.toLowerCase();
  let score = 50;
  easyKeywords.forEach((k) => { if (text.includes(k)) score -= 15; });
  hardKeywords.forEach((k) => { if (text.includes(k)) score += 10; });
  return Math.min(100, Math.max(10, score));
}

export function calcCompetitionLevel(job) {
  return job.competition || "Medium";
}

export function calcPriorityScore(scores) {
  // Weighted composite of all scores
  return Math.round(
    scores.cvMatch * 0.30 +
    scores.hiringProbability * 0.20 +
    scores.englishAccess * 0.15 +
    scores.visaSponsorship * 0.15 +
    scores.careerGrowth * 0.10 +
    scores.salaryScore * 0.10
  );
}

export function scoreJob(job) {
  const cvMatch = job.cvMatch !== undefined ? job.cvMatch : calcCVMatch(job);
  const englishAccess = calcEnglishAccess(job);
  const visaSponsorship = calcVisaSponsorship(job);
  const salaryScore = calcSalaryScore(job);
  const careerGrowth = calcCareerGrowth(job);
  const applicationComplexity = calcApplicationComplexity(job);
  const hiringProbability = calcHiringProbability(job, cvMatch);
  const skillGap = calcSkillGap(cvMatch);
  const scores = {
    cvMatch,
    hiringProbability,
    skillGap,
    salaryScore,
    englishAccess,
    visaSponsorship,
    careerGrowth,
    applicationComplexity,
    competition: job.competition || "Medium",
  };
  scores.priorityScore = calcPriorityScore(scores);
  return { ...job, scores };
}

export function getMatchLabel(score) {
  if (score >= 75) return { label: "🟢 Excellent Match", color: "#10b981" };
  if (score >= 55) return { label: "🟡 Moderate Match", color: "#f59e0b" };
  return { label: "🔴 Weak Match", color: "#ef4444" };
}

export function getSalaryEstimate(job) {
  const text = job.title?.toLowerCase() || "";
  if (text.includes("manager") || text.includes("lead") || text.includes("senior")) return "€55,000 – €75,000";
  if (text.includes("scientist") || text.includes("specialist")) return "€42,000 – €60,000";
  if (text.includes("associate") || text.includes("junior")) return "€32,000 – €45,000";
  if (text.includes("intern")) return "€1,200 – €1,800/mo";
  return "€38,000 – €55,000";
}
