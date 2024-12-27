export const keywords = [
  "adventure",
  "algorithm",
  "ambition",
  "animal",
  "architecture",
  "art",
  "atmosphere",
  "balance",
  "beach",
  "beauty",
  "biology",
  "blockchain",
  "book",
  "bridge",
  "butterfly",
  "career",
  "celebration",
  "challenge",
  "chemistry",
  "city",
  "cloud",
  "coding",
  "collaboration",
  "communication",
  "compassion",
  "competition",
  "concept",
  "connection",
  "content",
  "courage",
  "creativity",
  "curiosity",
  "dance",
  "data",
  "decision",
  "dedication",
  "design",
  "determination",
  "discovery",
  "dream",
  "earth",
  "education",
  "efficiency",
  "emotion",
  "energy",
  "engineering",
  "environment",
  "equality",
  "event",
  "evolution",
  "experience",
  "exploration",
  "family",
  "fantasy",
  "fashion",
  "festival",
  "fitness",
  "flower",
  "food",
  "forest",
  "friendship",
  "future",
  "galaxy",
  "garden",
  "generosity",
  "gratitude",
  "growth",
  "happiness",
  "harmony",
  "health",
  "history",
  "holiday",
  "horizon",
  "humanity",
  "idea",
  "imagination",
  "improvement",
  "independence",
  "industry",
  "infinity",
  "inspiration",
  "integrity",
  "intelligence",
  "invention",
  "journey",
  "joy",
  "justice",
  "kindness",
  "knowledge",
  "landscape",
  "laughter",
  "leadership",
  "learning",
  "legacy",
  "library",
  "light",
  "love",
  "magic",
  "mountain",
  "music",
  "nature",
  "network",
  "ocean",
  "passion",
  "patience",
  "peace",
  "planet",
  "power",
  "rain",
  "river",
  "science",
  "sky",
  "space",
  "star",
  "success",
  "sun",
  "technology",
  "time",
  "tree",
  "universe",
  "water",
  "wisdom",
  "world",
  "youth",
  "zen",
];

// Function to pick a random keyword
export function getRandomKeyword() {
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
}
