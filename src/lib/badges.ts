// Badge definitions and logic
// Themed to the GPK universe — gross, fun, collectible

export interface BadgeDef {
  type: string;
  name: string;
  description: string;
  detail: string;
  icon: string;
  check: (stats: CollectorStats) => boolean;
}

export interface CollectorStats {
  totalHave: number;
  totalWant: number;
  totalSets: number;
  completedSets: string[];
  dupeCount: number;
  totalTrades: number;
}

export const BADGE_DEFINITIONS: BadgeDef[] = [
  // === Collection size milestones ===
  {
    type: "collector_10",
    name: "Trash Picker",
    description: "Own 10 cards",
    detail: "Every collection starts somewhere — you just dug your first 10 cards out of the garbage pail. Welcome to the obsession.",
    icon: "🗑️",
    check: (s) => s.totalHave >= 10,
  },
  {
    type: "collector_50",
    name: "Dumpster Diver",
    description: "Own 50 cards",
    detail: "50 cards deep and your hands are getting sticky. You're not just collecting anymore — you're hoarding.",
    icon: "🤿",
    check: (s) => s.totalHave >= 50,
  },
  {
    type: "collector_100",
    name: "Slime Centurion",
    description: "Own 100 cards",
    detail: "Triple digits! 100 cards means you've officially got a collection worth bragging about at the lunch table.",
    icon: "💯",
    check: (s) => s.totalHave >= 100,
  },
  {
    type: "collector_250",
    name: "Garbage Hoarder",
    description: "Own 250 cards",
    detail: "250 cards. Your binder is getting thick, your wallet is getting thin, and your family is getting concerned. Keep going.",
    icon: "📦",
    check: (s) => s.totalHave >= 250,
  },
  {
    type: "collector_500",
    name: "Toxic Waste",
    description: "Own 500 cards",
    detail: "Half a thousand Garbage Pail Kids. At this point, your collection is a biohazard. The EPA has been notified.",
    icon: "☢️",
    check: (s) => s.totalHave >= 500,
  },
  {
    type: "collector_1000",
    name: "Pail King",
    description: "Own 1,000 cards",
    detail: "A THOUSAND cards. You don't just collect GPK — you ARE a Garbage Pail Kid. Bow down to the Pail King.",
    icon: "👑",
    check: (s) => s.totalHave >= 1000,
  },

  // === Set completion ===
  {
    type: "first_set",
    name: "Set Slayer",
    description: "Complete your first set",
    detail: "You hunted down every last card in a set. That final card you needed? Chef's kiss. Pure satisfaction.",
    icon: "⚔️",
    check: (s) => s.completedSets.length >= 1,
  },
  {
    type: "five_sets",
    name: "Pail Crusher",
    description: "Complete 5 sets",
    detail: "Five complete sets. You've crushed more checklists than most collectors dream of. The obsession is real.",
    icon: "💀",
    check: (s) => s.completedSets.length >= 5,
  },
  {
    type: "all_os",
    name: "O.G. Nasty",
    description: "Complete all 15 Original Series",
    detail: "Every. Single. Original. Series. Completed. 1985-1988. You are the ultimate OG collector. Legends only.",
    icon: "🎖️",
    check: (s) => s.completedSets.length >= 15,
  },

  // === Duplicates ===
  {
    type: "dupes_10",
    name: "Double Trouble",
    description: "Accumulate 10 duplicates",
    detail: "10 doubles! Time to start trading — or just keep both because you can't let go. We don't judge.",
    icon: "👯",
    check: (s) => s.dupeCount >= 10,
  },
  {
    type: "dupes_50",
    name: "Copy Cat",
    description: "Accumulate 50 duplicates",
    detail: "50 duplicates means you've ripped enough packs to wallpaper your room. Trade them, sell them, or build a fort.",
    icon: "🐱",
    check: (s) => s.dupeCount >= 50,
  },

  // === Engagement ===
  {
    type: "want_list",
    name: "Wish Lister",
    description: "Add 10 cards to your want list",
    detail: "You've got a hit list of 10 cards you're hunting. Share your want list to let other collectors know what you need.",
    icon: "📋",
    check: (s) => s.totalWant >= 10,
  },
  {
    type: "multi_set",
    name: "Set Hopper",
    description: "Collect from 5 different sets",
    detail: "You don't stick to one era — you're bouncing across 5 different sets. A true GPK historian in the making.",
    icon: "🐸",
    check: (s) => s.totalSets >= 5,
  },
];
