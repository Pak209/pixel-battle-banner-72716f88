export interface HolobotStats {
    name: string;
    attack: number;
    defense: number;
    speed: number;
    hp?: number;
    maxHealth?: number;
    level?: number;
    specialMove?: string;
    intelligence?: number;
    fatigue?: number;
    gasTokens?: number;
    hackUsed?: boolean;
    specialAttackGauge?: number;
    specialAttackThreshold?: number;
    syncPoints?: number;
    comboChain?: number;
    maxComboChain?: number;
    experience?: number;
    nextLevelExp?: number;
    abilityDescription?: string;
    abilityStats?: string;
    boostedAttributes?: {
        attack?: number;
        defense?: number;
        speed?: number;
        health?: number;
    };
}

export const HOLOBOT_STATS: Record<string, HolobotStats> = {
    ace: {
        name: "ACE",
        maxHealth: 150,
        attack: 8,
        defense: 6,
        speed: 7,
        intelligence: 5,
        specialMove: "1st Strike",
        level: 1,
        experience: 0,
        nextLevelExp: 100,
        abilityDescription: "uses its speed to evade attacks and gets in pos to land the cr.hit",
        abilityStats: "+3 atk | +4 spd"
    },
    kuma: {
        name: "KUMA",
        maxHealth: 200,
        attack: 7,
        defense: 5,
        speed: 3,
        intelligence: 4,
        specialMove: "Sharp Claws",
        level: 1,
        experience: 0,
        nextLevelExp: 100,
        abilityDescription: "unleashes a powerful slash with razor-sharp claws",
        abilityStats: "+5 atk"
    },
    shadow: {
        name: "Shadow",
        maxHealth: 170,
        attack: 5,
        defense: 7,
        speed: 4,
        intelligence: 3,
        specialMove: "Shadow Strike",
        level: 1
    },
    hare: {
        name: "HARE",
        maxHealth: 160,
        attack: 4,
        defense: 5,
        speed: 4,
        intelligence: 3,
        specialMove: "Counter Claw",
        level: 1
    },
    tora: {
        name: "TORA",
        maxHealth: 180,
        attack: 5,
        defense: 4,
        speed: 6,
        intelligence: 4,
        specialMove: "Stalk",
        level: 1
    },
    wake: {
        name: "WAKE",
        maxHealth: 170,
        attack: 6,
        defense: 3,
        speed: 4,
        intelligence: 4,
        specialMove: "Torrent",
        level: 1
    },
    era: {
        name: "ERA",
        maxHealth: 165,
        attack: 5,
        defense: 4,
        speed: 6,
        intelligence: 4,
        specialMove: "Time Warp",
        level: 1
    },
    gama: {
        name: "GAMA",
        maxHealth: 180,
        attack: 6,
        defense: 5,
        speed: 3,
        intelligence: 4,
        specialMove: "Heavy Leap",
        level: 1
    },
    ken: {
        name: "KEN",
        maxHealth: 150,
        attack: 7,
        defense: 3,
        speed: 6,
        intelligence: 5,
        specialMove: "Blade Storm",
        level: 1
    },
    kurai: {
        name: "KURAI",
        maxHealth: 190,
        attack: 4,
        defense: 6,
        speed: 3,
        intelligence: 3,
        specialMove: "Dark Veil",
        level: 1
    },
    tsuin: {
        name: "TSUIN",
        maxHealth: 160,
        attack: 6,
        defense: 4,
        speed: 5,
        intelligence: 4,
        specialMove: "Twin Strike",
        level: 1
    },
    wolf: {
        name: "WOLF",
        maxHealth: 175,
        attack: 5,
        defense: 5,
        speed: 5,
        intelligence: 4,
        specialMove: "Lunar Howl",
        level: 1
    }
};

export function getRank(level: number): string {
    if (level >= 41) return "Legendary";
    if (level >= 31) return "Elite";
    if (level >= 21) return "Rare";
    if (level >= 11) return "Champion";
    if (level >= 2) return "Starter";
    return "Rookie";
}

export const BLUEPRINT_TIERS = {
    common: { level: 1, pieces: 5, name: "Common" },
    champion: { level: 11, pieces: 10, name: "Champion" },
    rare: { level: 21, pieces: 25, name: "Rare" },
    elite: { level: 31, pieces: 50, name: "Elite" },
    legendary: { level: 41, pieces: 100, name: "Legendary" }
};

export function getHighestPossibleTier(pieces: number): { tier: keyof typeof BLUEPRINT_TIERS, level: number } {
    if (pieces >= BLUEPRINT_TIERS.legendary.pieces) return { tier: 'legendary', level: BLUEPRINT_TIERS.legendary.level };
    if (pieces >= BLUEPRINT_TIERS.elite.pieces) return { tier: 'elite', level: BLUEPRINT_TIERS.elite.level };
    if (pieces >= BLUEPRINT_TIERS.rare.pieces) return { tier: 'rare', level: BLUEPRINT_TIERS.rare.level };
    if (pieces >= BLUEPRINT_TIERS.champion.pieces) return { tier: 'champion', level: BLUEPRINT_TIERS.champion.level };
    return { tier: 'common', level: BLUEPRINT_TIERS.common.level };
}
