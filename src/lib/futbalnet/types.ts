export interface Match {
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  scoreHome: number | null;
  scoreAway: number | null;
  competition: string;
  round: string;
  isHome: boolean;
}

export interface Fixture {
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  venue: string;
  round: string;
  isHome: boolean;
}

export interface TableRow {
  position: number;
  teamName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  isHighlighted?: boolean;
}

export interface Player {
  number: string;
  name: string;
  position: string;
  matches: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

export type TeamId = 'a' | 'u19' | 'u15';

export interface TeamConfig {
  id: TeamId;
  name: string;
  slug: string;
  futbalnetPath: string;
}

export const TEAMS: Record<TeamId, TeamConfig> = {
  a: {
    id: 'a',
    name: 'A-tím (Dospelí)',
    slug: 'a-tim',
    futbalnetPath: 'dospeli',
  },
  u19: {
    id: 'u19',
    name: 'U19 (Dorast)',
    slug: 'mladez/u19',
    futbalnetPath: 'u19',
  },
  u15: {
    id: 'u15',
    name: 'U15 (Žiaci)',
    slug: 'mladez/u15',
    futbalnetPath: 'u15',
  },
};
