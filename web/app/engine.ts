export interface PlatformDef {
  id: string;
  name: string;
  icon: string;
  color: string;
  us_canada: number;
  europe: number;
  asia_pacific: number;
  rest_of_world: number;
  source: string;
}

export const PLATFORMS: PlatformDef[] = [
  { id: "google", name: "Google", icon: "G", color: "#4285F4", us_canada: 342, europe: 168, asia_pacific: 62, rest_of_world: 38, source: "Alphabet 10-K 2024" },
  { id: "meta", name: "Meta", icon: "M", color: "#0668E1", us_canada: 217, europe: 70, asia_pacific: 17, rest_of_world: 12, source: "Meta 10-K 2024" },
  { id: "tiktok", name: "TikTok", icon: "T", color: "#ff0050", us_canada: 112, europe: 48, asia_pacific: 22, rest_of_world: 9, source: "Bloomberg/FT estimates" },
  { id: "amazon", name: "Amazon", icon: "A", color: "#FF9900", us_canada: 164, europe: 72, asia_pacific: 28, rest_of_world: 14, source: "Amazon 10-K 2024" },
  { id: "microsoft", name: "Microsoft", icon: "MS", color: "#00A4EF", us_canada: 95, europe: 52, asia_pacific: 18, rest_of_world: 10, source: "Microsoft 10-K 2024" },
  { id: "apple", name: "Apple", icon: "🍎", color: "#A2AAAD", us_canada: 78, europe: 38, asia_pacific: 19, rest_of_world: 8, source: "Apple 10-K 2024" },
  { id: "twitter", name: "X (Twitter)", icon: "X", color: "#1DA1F2", us_canada: 32, europe: 14, asia_pacific: 5, rest_of_world: 3, source: "Twitter 10-K (pre-acq)" },
  { id: "spotify", name: "Spotify", icon: "S", color: "#1DB954", us_canada: 18, europe: 14, asia_pacific: 5, rest_of_world: 3, source: "Spotify 10-K 2024" },
  { id: "data_brokers", name: "Data Brokers", icon: "DB", color: "#8B0000", us_canada: 198, europe: 87, asia_pacific: 24, rest_of_world: 11, source: "Proton 2025 report" },
];

const REGION_MAP: Record<string, string> = {
  US: "us_canada", CA: "us_canada",
  GB: "europe", DE: "europe", FR: "europe", IT: "europe", ES: "europe",
  NL: "europe", SE: "europe", NO: "europe", PL: "europe", TR: "europe",
  CH: "europe", AT: "europe", BE: "europe", PT: "europe", IE: "europe",
  DK: "europe", FI: "europe", GR: "europe", CZ: "europe", RO: "europe",
  HU: "europe", UA: "europe", RU: "europe",
  JP: "asia_pacific", KR: "asia_pacific", CN: "asia_pacific",
  IN: "asia_pacific", AU: "asia_pacific", NZ: "asia_pacific",
  ID: "asia_pacific", TH: "asia_pacific", VN: "asia_pacific",
  PH: "asia_pacific", MY: "asia_pacific", SG: "asia_pacific",
  TW: "asia_pacific", HK: "asia_pacific",
  BR: "rest_of_world", MX: "rest_of_world", AR: "rest_of_world",
  CO: "rest_of_world", CL: "rest_of_world", PE: "rest_of_world",
  NG: "rest_of_world", ZA: "rest_of_world", EG: "rest_of_world",
  KE: "rest_of_world", SA: "rest_of_world", AE: "rest_of_world",
  IL: "rest_of_world", PK: "rest_of_world",
};

const COUNTRIES = [
  { code: "US", name: "United States" }, { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" }, { code: "DE", name: "Germany" },
  { code: "FR", name: "France" }, { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" }, { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" }, { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" }, { code: "FI", name: "Finland" },
  { code: "CH", name: "Switzerland" }, { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" }, { code: "PT", name: "Portugal" },
  { code: "IE", name: "Ireland" }, { code: "GR", name: "Greece" },
  { code: "PL", name: "Poland" }, { code: "CZ", name: "Czechia" },
  { code: "RO", name: "Romania" }, { code: "HU", name: "Hungary" },
  { code: "TR", name: "Turkey" }, { code: "RU", name: "Russia" },
  { code: "UA", name: "Ukraine" },
  { code: "JP", name: "Japan" }, { code: "KR", name: "South Korea" },
  { code: "CN", name: "China" }, { code: "IN", name: "India" },
  { code: "AU", name: "Australia" }, { code: "NZ", name: "New Zealand" },
  { code: "ID", name: "Indonesia" }, { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" }, { code: "PH", name: "Philippines" },
  { code: "MY", name: "Malaysia" }, { code: "SG", name: "Singapore" },
  { code: "TW", name: "Taiwan" }, { code: "HK", name: "Hong Kong" },
  { code: "BR", name: "Brazil" }, { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" }, { code: "CO", name: "Colombia" },
  { code: "CL", name: "Chile" }, { code: "PE", name: "Peru" },
  { code: "NG", name: "Nigeria" }, { code: "ZA", name: "South Africa" },
  { code: "EG", name: "Egypt" }, { code: "KE", name: "Kenya" },
  { code: "SA", name: "Saudi Arabia" }, { code: "AE", name: "UAE" },
  { code: "IL", name: "Israel" }, { code: "PK", name: "Pakistan" },
];
export { COUNTRIES };

const AGE_MULT: Record<string, number> = {
  "13-17": 0.65, "18-24": 1.20, "25-34": 1.35, "35-44": 1.25, "45-54": 1.10, "55-64": 0.90, "65+": 0.70,
};
const USAGE_MULT: Record<string, number> = { light: 0.6, moderate: 1.0, heavy: 1.5, extreme: 2.0 };
const USAGE_HOURS: Record<string, number> = { light: 1, moderate: 3, heavy: 6.5, extreme: 10 };

const LIFE_EXPECTANCY: Record<string, number> = {
  US: 78.5, CA: 82.3, GB: 81.0, DE: 81.2, FR: 82.5, IT: 83.5, ES: 83.6,
  NL: 82.3, SE: 83.0, NO: 83.2, PL: 78.0, CH: 83.8, AT: 82.0, BE: 81.5,
  PT: 81.9, IE: 82.0, DK: 81.4, FI: 82.0, GR: 81.6, CZ: 79.5, RO: 76.0,
  HU: 76.7, UA: 73.6, RU: 73.2, JP: 84.6, KR: 83.7, CN: 78.2, IN: 70.4,
  AU: 83.4, NZ: 82.5, ID: 71.9, TH: 78.7, VN: 75.4, PH: 71.2, MY: 76.2,
  SG: 83.6, TW: 81.0, HK: 85.3, BR: 75.9, MX: 75.1, AR: 76.5, CO: 77.3,
  CL: 80.7, PE: 76.5, NG: 54.7, ZA: 64.1, EG: 72.0, KE: 61.6, SA: 77.6,
  AE: 78.7, IL: 83.0, PK: 67.3, TR: 78.6,
};

export function ageGroupFromAge(age: number): string {
  if (age < 18) return "13-17";
  if (age < 25) return "18-24";
  if (age < 35) return "25-34";
  if (age < 45) return "35-44";
  if (age < 55) return "45-54";
  if (age < 65) return "55-64";
  return "65+";
}

export interface CalcResult {
  platforms: { id: string; name: string; icon: string; color: string; annual: number; daily: number; source: string }[];
  annualTotal: number;
  dailyTotal: number;
  lifetimeTotal: number;
  yearsLeft: number;
  perHour: number;
  globalFairShare: number;
  coffeeEquiv: string;
}

export function calculate(
  country: string,
  ageGroup: string,
  usage: string,
  selectedPlatforms: string[],
  age: number,
): CalcResult {
  const region = REGION_MAP[country] || "rest_of_world";
  const aMult = AGE_MULT[ageGroup] || 1.0;
  const uMult = USAGE_MULT[usage] || 1.0;

  const platforms = PLATFORMS
    .filter(p => selectedPlatforms.includes(p.id))
    .map(p => {
      const base = p[region as keyof Pick<PlatformDef, "us_canada" | "europe" | "asia_pacific" | "rest_of_world">] ?? p.rest_of_world;
      const annual = Math.round(base * aMult * uMult * 100) / 100;
      return { id: p.id, name: p.name, icon: p.icon, color: p.color, annual, daily: Math.round((annual / 365) * 100) / 100, source: p.source };
    })
    .sort((a, b) => b.annual - a.annual);

  const annualTotal = Math.round(platforms.reduce((s, p) => s + p.annual, 0) * 100) / 100;
  const dailyTotal = Math.round((annualTotal / 365) * 100) / 100;
  const lifeExp = LIFE_EXPECTANCY[country] || 73.4;
  const yearsLeft = Math.max(1, lifeExp - Math.max(13, Math.min(100, age)));
  const lifetimeTotal = Math.round(annualTotal * yearsLeft * 100) / 100;
  const dailyHours = USAGE_HOURS[usage] || 3;
  const perHour = dailyHours > 0 ? Math.round((dailyTotal / dailyHours) * 100) / 100 : 0;
  const globalFairShare = Math.round((740e9 / 5.35e9) * 100) / 100;

  const coffeeDays = dailyTotal > 0 ? Math.max(1, Math.round(5.0 / dailyTotal)) : 999;
  const coffeeEquiv = dailyTotal >= 5 ? "a coffee every day" : `a coffee every ${coffeeDays} days`;

  return { platforms, annualTotal, dailyTotal, lifetimeTotal, yearsLeft, perHour, globalFairShare, coffeeEquiv };
}
