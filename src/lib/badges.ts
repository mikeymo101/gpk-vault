// Badge definitions and logic
// Badges are computed on-read and stored in the badges table

export interface BadgeDef {
  type: string;
  name: string;
  description: string;
  icon: string;
  check: (stats: CollectorStats) => boolean;
}

export interface CollectorStats {
  totalHave: number;
  totalWant: number;
  totalSets: number;
  completedSets: string[]; // set names
  dupeCount: number;
  totalTrades: number;
}

export const BADGE_DEFINITIONS: BadgeDef[] = [
  // Collection size milestones
  {
    type: "collector_10",
    name: "Getting Started",
    description: "Own 10 cards",
    icon: "🌱",
    check: (s) => s.totalHave >= 10,
  },
  {
    type: "collector_50",
    name: "Building Up",
    description: "Own 50 cards",
    icon: "📦",
    check: (s) => s.totalHave >= 50,
  },
  {
    type: "collector_100",
    name: "Centurion",
    description: "Own 100 cards",
    icon: "💯",
    check: (s) => s.totalHave >= 100,
  },
  {
    type: "collector_250",
    name: "Serious Collector",
    description: "Own 250 cards",
    icon: "🏆",
    check: (s) => s.totalHave >= 250,
  },
  {
    type: "collector_500",
    name: "Half a Thousand",
    description: "Own 500 cards",
    icon: "⭐",
    check: (s) => s.totalHave >= 500,
  },
  {
    type: "collector_1000",
    name: "GPK Vault Master",
    description: "Own 1,000 cards",
    icon: "👑",
    check: (s) => s.totalHave >= 1000,
  },

  // Set completion
  {
    type: "first_set",
    name: "Completionist",
    description: "Complete your first set",
    icon: "✅",
    check: (s) => s.completedSets.length >= 1,
  },
  {
    type: "five_sets",
    name: "Set Hoarder",
    description: "Complete 5 sets",
    icon: "🗄️",
    check: (s) => s.completedSets.length >= 5,
  },
  {
    type: "all_os",
    name: "Original Gangster",
    description: "Complete all 15 Original Series sets",
    icon: "🎖️",
    check: (s) => s.completedSets.length >= 15,
  },

  // Duplicates
  {
    type: "dupes_10",
    name: "Double Vision",
    description: "Accumulate 10 duplicate cards",
    icon: "👯",
    check: (s) => s.dupeCount >= 10,
  },
  {
    type: "dupes_50",
    name: "Dupe Machine",
    description: "Accumulate 50 duplicate cards",
    icon: "🔄",
    check: (s) => s.dupeCount >= 50,
  },

  // Engagement
  {
    type: "want_list",
    name: "Wish Maker",
    description: "Add 10 cards to your want list",
    icon: "🌟",
    check: (s) => s.totalWant >= 10,
  },
  {
    type: "multi_set",
    name: "Set Explorer",
    description: "Collect cards from 5 different sets",
    icon: "🗺️",
    check: (s) => s.totalSets >= 5,
  },
];
