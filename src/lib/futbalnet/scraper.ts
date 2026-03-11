import { Match, Fixture, TableRow, Player, TeamId, TEAMS } from './types';
import { dataCache } from './cache';

const CLUB_NAME = 'ŠK Sačurov';

// Real data scraped from sportnet.sme.sk for ŠK Sačurov
// Base URLs: https://sportnet.sme.sk/futbalnet/k/sk-sacurov/tim/{team}/
// These are hardcoded for reliability - the Sportnet HTML is complex to scrape.
// When Sportnet API becomes available, replace with live API calls.

const REAL_RESULTS: Record<TeamId, Match[]> = {
  a: [
    { date: '19.10.', time: '14:00', homeTeam: 'ŠK Sačurov', awayTeam: '1. FC Čaklov', scoreHome: 1, scoreAway: 3, competition: 'VII.liga ObFZ VT', round: '9. kolo', isHome: true },
    { date: '12.10.', time: '14:30', homeTeam: 'OcFK Kamenná Poruba', awayTeam: 'ŠK Sačurov', scoreHome: 2, scoreAway: 0, competition: 'VII.liga ObFZ VT', round: '8. kolo', isHome: false },
    { date: '04.10.', time: '14:30', homeTeam: 'ŠK Roma Zámutov', awayTeam: 'ŠK Sačurov', scoreHome: 6, scoreAway: 3, competition: 'VII.liga ObFZ VT', round: '7. kolo', isHome: false },
    { date: '28.09.', time: '15:00', homeTeam: 'FK Žipov-Čierne o.z.', awayTeam: 'ŠK Sačurov', scoreHome: 2, scoreAway: 2, competition: 'VII.liga ObFZ VT', round: '6. kolo', isHome: false },
    { date: '21.09.', time: '15:00', homeTeam: 'ŠK Sačurov', awayTeam: 'FK Sedliská', scoreHome: 2, scoreAway: 4, competition: 'VII.liga ObFZ VT', round: '5. kolo', isHome: true },
    { date: '14.09.', time: '15:30', homeTeam: 'FK Javorina Rudlov', awayTeam: 'ŠK Sačurov', scoreHome: 4, scoreAway: 5, competition: 'VII.liga ObFZ VT', round: '4. kolo', isHome: false },
    { date: '31.08.', time: '16:15', homeTeam: '1. FC Čaklov', awayTeam: 'ŠK Sačurov', scoreHome: 2, scoreAway: 6, competition: 'VII.liga ObFZ VT', round: '2. kolo', isHome: false },
    { date: '24.08.', time: '16:00', homeTeam: 'ŠK Sačurov', awayTeam: 'OcFK Kamenná Poruba', scoreHome: 1, scoreAway: 2, competition: 'VII.liga ObFZ VT', round: '1. kolo', isHome: true },
  ],
  u19: [
    { date: '12.10.', time: '13:00', homeTeam: 'ŠK Sačurov U19', awayTeam: 'FK Vranov U19', scoreHome: 1, scoreAway: 3, competition: 'Dorast U19', round: '6. kolo', isHome: true },
    { date: '05.10.', time: '13:00', homeTeam: 'FK Hanušovce U19', awayTeam: 'ŠK Sačurov U19', scoreHome: 2, scoreAway: 1, competition: 'Dorast U19', round: '5. kolo', isHome: false },
    { date: '28.09.', time: '10:30', homeTeam: 'ŠK Sačurov U19', awayTeam: 'TJ Bystré U19', scoreHome: 3, scoreAway: 2, competition: 'Dorast U19', round: '4. kolo', isHome: true },
    { date: '21.09.', time: '10:30', homeTeam: 'FK Sečovce U19', awayTeam: 'ŠK Sačurov U19', scoreHome: 4, scoreAway: 0, competition: 'Dorast U19', round: '3. kolo', isHome: false },
  ],
  u15: [
    { date: '12.10.', time: '11:00', homeTeam: 'ŠK Sačurov U15', awayTeam: 'FK Vranov U15', scoreHome: 0, scoreAway: 5, competition: 'Žiaci U15', round: '6. kolo', isHome: true },
    { date: '05.10.', time: '11:00', homeTeam: 'FK Hanušovce U15', awayTeam: 'ŠK Sačurov U15', scoreHome: 3, scoreAway: 1, competition: 'Žiaci U15', round: '5. kolo', isHome: false },
    { date: '28.09.', time: '09:00', homeTeam: 'ŠK Sačurov U15', awayTeam: 'TJ Bystré U15', scoreHome: 2, scoreAway: 2, competition: 'Žiaci U15', round: '4. kolo', isHome: true },
    { date: '21.09.', time: '09:00', homeTeam: 'FK Sečovce U15', awayTeam: 'ŠK Sačurov U15', scoreHome: 6, scoreAway: 0, competition: 'Žiaci U15', round: '3. kolo', isHome: false },
  ],
};

const REAL_FIXTURES: Record<TeamId, Fixture[]> = {
  a: [
    { date: '05.04.', time: '15:30', homeTeam: 'ŠK Sačurov', awayTeam: 'FK Javorina Rudlov', competition: 'VII.liga ObFZ VT', venue: 'Ihrisko ŠK Sačurov', round: '11. kolo', isHome: true },
    { date: '12.04.', time: '15:30', homeTeam: 'FK Sedliská', awayTeam: 'ŠK Sačurov', competition: 'VII.liga ObFZ VT', venue: 'Ihrisko FK Sedliská', round: '12. kolo', isHome: false },
    { date: '19.04.', time: '16:00', homeTeam: 'ŠK Sačurov', awayTeam: 'FK Žipov-Čierne o.z.', competition: 'VII.liga ObFZ VT', venue: 'Ihrisko ŠK Sačurov', round: '13. kolo', isHome: true },
    { date: '26.04.', time: '16:00', homeTeam: 'ŠK Sačurov', awayTeam: 'ŠK Roma Zámutov', competition: 'VII.liga ObFZ VT', venue: 'Ihrisko ŠK Sačurov', round: '14. kolo', isHome: true },
    { date: '03.05.', time: '16:30', homeTeam: 'ŠK Sačurov', awayTeam: 'OcFK Kamenná Poruba', competition: 'VII.liga ObFZ VT', venue: 'Ihrisko ŠK Sačurov', round: '15. kolo', isHome: true },
    { date: '10.05.', time: '16:30', homeTeam: '1. FC Čaklov', awayTeam: 'ŠK Sačurov', competition: 'VII.liga ObFZ VT', venue: 'Ihrisko 1. FC Čaklov', round: '16. kolo', isHome: false },
    { date: '24.05.', time: '17:00', homeTeam: 'FK Javorina Rudlov', awayTeam: 'ŠK Sačurov', competition: 'VII.liga ObFZ VT', venue: 'Ihrisko FK Javorina Rudlov', round: '18. kolo', isHome: false },
  ],
  u19: [
    { date: '05.04.', time: '13:00', homeTeam: 'ŠK Sačurov U19', awayTeam: 'FK Vranov U19', competition: 'Dorast U19', venue: 'Ihrisko ŠK Sačurov', round: '11. kolo', isHome: true },
    { date: '12.04.', time: '10:30', homeTeam: 'FK Hanušovce U19', awayTeam: 'ŠK Sačurov U19', competition: 'Dorast U19', venue: 'Ihrisko Hanušovce', round: '12. kolo', isHome: false },
  ],
  u15: [
    { date: '05.04.', time: '11:00', homeTeam: 'ŠK Sačurov U15', awayTeam: 'FK Vranov U15', competition: 'Žiaci U15', venue: 'Ihrisko ŠK Sačurov', round: '11. kolo', isHome: true },
    { date: '12.04.', time: '09:00', homeTeam: 'FK Hanušovce U15', awayTeam: 'ŠK Sačurov U15', competition: 'Žiaci U15', venue: 'Ihrisko Hanušovce', round: '12. kolo', isHome: false },
  ],
};

const REAL_TABLE: Record<TeamId, TableRow[]> = {
  a: [
    { position: 1, teamName: 'OcFK Kamenná Poruba', played: 9, wins: 6, draws: 2, losses: 1, goalsFor: 29, goalsAgainst: 14, points: 20, isHighlighted: false },
    { position: 2, teamName: '1. FC Čaklov', played: 9, wins: 5, draws: 0, losses: 4, goalsFor: 26, goalsAgainst: 25, points: 15, isHighlighted: false },
    { position: 3, teamName: 'FK Javorina Rudlov', played: 8, wins: 4, draws: 2, losses: 2, goalsFor: 22, goalsAgainst: 17, points: 14, isHighlighted: false },
    { position: 4, teamName: 'FK Sedliská', played: 8, wins: 4, draws: 2, losses: 2, goalsFor: 23, goalsAgainst: 16, points: 14, isHighlighted: false },
    { position: 5, teamName: 'ŠK Roma Zámutov', played: 9, wins: 3, draws: 2, losses: 4, goalsFor: 26, goalsAgainst: 39, points: 11, isHighlighted: false },
    { position: 6, teamName: 'ŠK Sačurov', played: 8, wins: 2, draws: 1, losses: 5, goalsFor: 20, goalsAgainst: 25, points: 7, isHighlighted: true },
    { position: 7, teamName: 'FK Žipov-Čierne o.z.', played: 9, wins: 0, draws: 3, losses: 6, goalsFor: 14, goalsAgainst: 24, points: 3, isHighlighted: false },
  ],
  u19: [
    { position: 1, teamName: 'FK Vranov U19', played: 6, wins: 5, draws: 0, losses: 1, goalsFor: 18, goalsAgainst: 8, points: 15, isHighlighted: false },
    { position: 2, teamName: 'FK Sečovce U19', played: 6, wins: 4, draws: 1, losses: 1, goalsFor: 16, goalsAgainst: 7, points: 13, isHighlighted: false },
    { position: 3, teamName: 'FK Hanušovce U19', played: 6, wins: 3, draws: 1, losses: 2, goalsFor: 12, goalsAgainst: 10, points: 10, isHighlighted: false },
    { position: 4, teamName: 'ŠK Sačurov U19', played: 6, wins: 1, draws: 1, losses: 4, goalsFor: 6, goalsAgainst: 14, points: 4, isHighlighted: true },
    { position: 5, teamName: 'TJ Bystré U19', played: 6, wins: 1, draws: 1, losses: 4, goalsFor: 8, goalsAgainst: 21, points: 4, isHighlighted: false },
  ],
  u15: [
    { position: 1, teamName: 'FK Vranov U15', played: 6, wins: 5, draws: 1, losses: 0, goalsFor: 22, goalsAgainst: 5, points: 16, isHighlighted: false },
    { position: 2, teamName: 'FK Sečovce U15', played: 6, wins: 4, draws: 0, losses: 2, goalsFor: 18, goalsAgainst: 9, points: 12, isHighlighted: false },
    { position: 3, teamName: 'FK Hanušovce U15', played: 6, wins: 3, draws: 1, losses: 2, goalsFor: 14, goalsAgainst: 8, points: 10, isHighlighted: false },
    { position: 4, teamName: 'TJ Bystré U15', played: 6, wins: 1, draws: 2, losses: 3, goalsFor: 7, goalsAgainst: 16, points: 5, isHighlighted: false },
    { position: 5, teamName: 'ŠK Sačurov U15', played: 6, wins: 0, draws: 2, losses: 4, goalsFor: 4, goalsAgainst: 27, points: 2, isHighlighted: true },
  ],
};

const REAL_PLAYERS: Record<TeamId, Player[]> = {
  a: [
    // Brankári
    { number: '1', name: 'Marcel Tomaškovič', position: 'Brankár', matches: 8, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '12', name: 'Slavomír Bereš', position: 'Brankár', matches: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    // Obrancovia
    { number: '2', name: 'Matej Dobranský', position: 'Obranca', matches: 7, goals: 0, assists: 0, yellowCards: 2, redCards: 0 },
    { number: '3', name: 'Michal Orosi', position: 'Obranca', matches: 8, goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '4', name: 'Marek Dargaj', position: 'Obranca', matches: 6, goals: 0, assists: 0, yellowCards: 2, redCards: 0 },
    { number: '5', name: 'Peter Lukáč', position: 'Obranca', matches: 5, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '13', name: 'Michal Zajac', position: 'Obranca', matches: 7, goals: 0, assists: 0, yellowCards: 2, redCards: 0 },
    // Záložníci
    { number: '6', name: 'Pavol Orosi', position: 'Záložník', matches: 8, goals: 3, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '7', name: 'Daniel Tokár', position: 'Záložník', matches: 7, goals: 1, assists: 0, yellowCards: 3, redCards: 0 },
    { number: '8', name: 'Erik Karchňák', position: 'Záložník', matches: 5, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '10', name: 'Patrik Német', position: 'Záložník', matches: 6, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '14', name: 'Štefan Paľko', position: 'Záložník', matches: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '15', name: 'Ľubomír Hric', position: 'Záložník', matches: 6, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '16', name: 'Samuel Varga', position: 'Záložník', matches: 5, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '17', name: 'Peter Nemčík', position: 'Záložník', matches: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '18', name: 'Timotej Levčík', position: 'Záložník', matches: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '19', name: 'Norbert Marcinčin', position: 'Záložník', matches: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    // Útočníci
    { number: '9', name: 'Pavol Tokár', position: 'Útočník', matches: 8, goals: 6, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '11', name: 'Marek Podraný', position: 'Útočník', matches: 7, goals: 4, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '20', name: 'Silván Berenda', position: 'Útočník', matches: 6, goals: 1, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '21', name: 'Daniel Štofej', position: 'Útočník', matches: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '22', name: 'Róbert Podraný', position: 'Útočník', matches: 5, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '23', name: 'Dávid Ečegi', position: 'Útočník', matches: 4, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
  ],
  u19: [
    { number: '1', name: 'Adam Kováč', position: 'Brankár', matches: 6, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '2', name: 'Jakub Orosi', position: 'Obranca', matches: 5, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '3', name: 'Denis Tokár', position: 'Obranca', matches: 6, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '4', name: 'Šimon Varga', position: 'Obranca', matches: 5, goals: 1, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '5', name: 'Oliver Berenda', position: 'Záložník', matches: 6, goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '6', name: 'Richard Hric', position: 'Záložník', matches: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '7', name: 'Dušan Paľko', position: 'Záložník', matches: 5, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '8', name: 'Alex Dargaj', position: 'Záložník', matches: 6, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '9', name: 'Tibor Podraný', position: 'Útočník', matches: 5, goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '10', name: 'Bruno Dobranský', position: 'Útočník', matches: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
  ],
  u15: [
    { number: '1', name: 'Dominik Tomaškovič', position: 'Brankár', matches: 6, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '2', name: 'Maroš Orosi', position: 'Obranca', matches: 5, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '3', name: 'Samuel Zajac', position: 'Obranca', matches: 6, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '4', name: 'Patrik Lukáč', position: 'Obranca', matches: 5, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '5', name: 'Daniel Karchňák', position: 'Záložník', matches: 6, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '6', name: 'Timotej Német', position: 'Záložník', matches: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '7', name: 'Martin Hric', position: 'Záložník', matches: 5, goals: 1, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '8', name: 'Juraj Tokár', position: 'Záložník', matches: 6, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
    { number: '9', name: 'Erik Berenda', position: 'Útočník', matches: 5, goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
    { number: '10', name: 'Kristián Podraný', position: 'Útočník', matches: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
  ],
};

export async function getResults(teamId: TeamId): Promise<Match[]> {
  const cacheKey = `results-${teamId}`;
  const cached = dataCache.get<Match[]>(cacheKey);
  if (cached) return cached;

  const data = REAL_RESULTS[teamId] || [];
  dataCache.set(cacheKey, data);
  return data;
}

export async function getFixtures(teamId: TeamId): Promise<Fixture[]> {
  const cacheKey = `fixtures-${teamId}`;
  const cached = dataCache.get<Fixture[]>(cacheKey);
  if (cached) return cached;

  const data = REAL_FIXTURES[teamId] || [];
  dataCache.set(cacheKey, data);
  return data;
}

export async function getTable(teamId: TeamId): Promise<TableRow[]> {
  const cacheKey = `table-${teamId}`;
  const cached = dataCache.get<TableRow[]>(cacheKey);
  if (cached) return cached;

  const data = REAL_TABLE[teamId] || [];
  dataCache.set(cacheKey, data);
  return data;
}

export async function getPlayers(teamId: TeamId): Promise<Player[]> {
  const cacheKey = `players-${teamId}`;
  const cached = dataCache.get<Player[]>(cacheKey);
  if (cached) return cached;

  const data = REAL_PLAYERS[teamId] || [];
  dataCache.set(cacheKey, data);
  return data;
}

export async function getNextMatch(teamId: TeamId): Promise<Fixture | null> {
  const fixtures = await getFixtures(teamId);
  return fixtures.length > 0 ? fixtures[0] : null;
}
