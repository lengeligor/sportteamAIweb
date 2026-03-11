import * as cheerio from 'cheerio';
import { Match, Fixture, TableRow, Player, TeamId, TEAMS } from './types';
import { dataCache } from './cache';

const BASE_URL = 'https://sportnet.sme.sk/futbalnet/klub/sk-sacurov';
const CLUB_NAME = 'ŠK Sačurov';

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SKSacurovWeb/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'sk,cs;q=0.9,en;q=0.8',
      },
      next: { revalidate: 900 }, // 15 min ISR
    });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

// Generate demo data for development/fallback
function generateDemoResults(teamId: TeamId): Match[] {
  const opponents: Record<TeamId, string[]> = {
    a: ['FK Vranov', 'TJ Parchovany', 'OFK Trnovec', 'FK Sečovce', 'TJ Bystré', 'FK Hanušovce', 'OFK Čierna', 'TJ Hencovce'],
    u19: ['FK Vranov U19', 'TJ Parchovany U19', 'FK Sečovce U19', 'FK Hanušovce U19', 'OFK Trnovec U19', 'TJ Bystré U19'],
    u15: ['FK Vranov U15', 'TJ Parchovany U15', 'FK Sečovce U15', 'FK Hanušovce U15', 'OFK Trnovec U15', 'TJ Bystré U15'],
  };
  const competitions: Record<TeamId, string> = {
    a: 'VII. liga ObFZ Vranov',
    u19: 'III. liga dorast U19',
    u15: 'III. liga žiaci U15',
  };
  const teamOpponents = opponents[teamId];
  const results: Match[] = [];
  const baseDate = new Date(2026, 2, 1); // March 2026

  for (let i = 0; i < 8; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - (i * 7));
    const isHome = i % 2 === 0;
    const opponent = teamOpponents[i % teamOpponents.length];
    const sh = Math.floor(Math.random() * 5);
    const sa = Math.floor(Math.random() * 4);
    results.push({
      date: d.toLocaleDateString('sk-SK'),
      time: '15:30',
      homeTeam: isHome ? CLUB_NAME : opponent,
      awayTeam: isHome ? opponent : CLUB_NAME,
      scoreHome: sh,
      scoreAway: sa,
      competition: competitions[teamId],
      round: `${8 - i}. kolo`,
      isHome,
    });
  }
  return results;
}

function generateDemoFixtures(teamId: TeamId): Fixture[] {
  const opponents: Record<TeamId, string[]> = {
    a: ['FK Sečovce', 'TJ Bystré', 'FK Hanušovce', 'OFK Čierna', 'TJ Hencovce'],
    u19: ['FK Vranov U19', 'FK Sečovce U19', 'FK Hanušovce U19', 'TJ Bystré U19'],
    u15: ['FK Vranov U15', 'FK Sečovce U15', 'FK Hanušovce U15', 'TJ Bystré U15'],
  };
  const competitions: Record<TeamId, string> = {
    a: 'VII. liga ObFZ Vranov',
    u19: 'III. liga dorast U19',
    u15: 'III. liga žiaci U15',
  };
  const teamOpponents = opponents[teamId];
  const fixtures: Fixture[] = [];
  const baseDate = new Date(2026, 2, 15);

  for (let i = 0; i < 5; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + (i * 7));
    const isHome = i % 2 === 0;
    const opponent = teamOpponents[i % teamOpponents.length];
    fixtures.push({
      date: d.toLocaleDateString('sk-SK'),
      time: i % 2 === 0 ? '15:30' : '10:30',
      homeTeam: isHome ? CLUB_NAME : opponent,
      awayTeam: isHome ? opponent : CLUB_NAME,
      competition: competitions[teamId],
      venue: isHome ? 'Ihrisko ŠK Sačurov' : `Ihrisko ${opponent}`,
      round: `${9 + i}. kolo`,
      isHome,
    });
  }
  return fixtures;
}

function generateDemoTable(teamId: TeamId): TableRow[] {
  const teams: Record<TeamId, string[]> = {
    a: [CLUB_NAME, 'FK Vranov', 'TJ Parchovany', 'OFK Trnovec', 'FK Sečovce', 'TJ Bystré', 'FK Hanušovce', 'OFK Čierna', 'TJ Hencovce', 'FK Kučín'],
    u19: [CLUB_NAME, 'FK Vranov U19', 'TJ Parchovany U19', 'FK Sečovce U19', 'FK Hanušovce U19', 'OFK Trnovec U19', 'TJ Bystré U19', 'FK Kučín U19'],
    u15: [CLUB_NAME, 'FK Vranov U15', 'TJ Parchovany U15', 'FK Sečovce U15', 'FK Hanušovce U15', 'OFK Trnovec U15', 'TJ Bystré U15', 'FK Kučín U15'],
  };
  const rows = teams[teamId].map((name, i) => {
    const played = 8;
    const wins = Math.max(0, 7 - i + Math.floor(Math.random() * 2));
    const draws = Math.floor(Math.random() * 3);
    const losses = played - wins - draws;
    const gf = wins * 3 + draws + Math.floor(Math.random() * 5);
    const ga = losses * 2 + Math.floor(Math.random() * 4);
    return {
      position: i + 1,
      teamName: name,
      played,
      wins: Math.min(wins, played),
      draws: Math.min(draws, played - Math.min(wins, played)),
      losses: Math.max(0, played - Math.min(wins, played) - Math.min(draws, played - Math.min(wins, played))),
      goalsFor: gf,
      goalsAgainst: ga,
      points: Math.min(wins, played) * 3 + Math.min(draws, played - Math.min(wins, played)),
      isHighlighted: name === CLUB_NAME,
    };
  });
  rows.sort((a, b) => b.points - a.points);
  rows.forEach((r, i) => (r.position = i + 1));
  return rows;
}

function generateDemoPlayers(teamId: TeamId): Player[] {
  const names: Record<TeamId, string[]> = {
    a: ['Marek Horváth', 'Jozef Kováč', 'Peter Balog', 'Ján Novák', 'Tomáš Varga', 'Martin Szabó', 'Lukáš Molnár', 'Michal Tóth', 'Patrik Fekete', 'Dávid Mészáros', 'Adrián Kiss', 'Rastislav Barna', 'Erik Lakatos', 'Filip Hudák', 'Samuel Džugan'],
    u19: ['Adam Kováč', 'Matej Horváth', 'Jakub Balog', 'Denis Novák', 'Šimon Varga', 'Oliver Szabó', 'Richard Molnár', 'Dušan Tóth', 'Alex Fekete', 'Tibor Mészáros', 'Bruno Kiss', 'Igor Barna'],
    u15: ['Dominik Kováč', 'Maroš Horváth', 'Samuel Balog', 'Patrik Novák', 'Daniel Varga', 'Timotej Szabó', 'Martin Molnár', 'Juraj Tóth', 'Erik Fekete', 'Kristián Mészáros', 'Nikolas Kiss'],
  };
  const positions = ['Brankár', 'Obranca', 'Obranca', 'Obranca', 'Záložník', 'Záložník', 'Záložník', 'Záložník', 'Útočník', 'Útočník', 'Obranca', 'Záložník', 'Útočník', 'Obranca', 'Záložník'];
  return names[teamId].map((name, i) => ({
    number: String(i + 1),
    name,
    position: positions[i % positions.length],
    matches: Math.floor(Math.random() * 8) + 1,
    goals: positions[i % positions.length] === 'Útočník' ? Math.floor(Math.random() * 6) : Math.floor(Math.random() * 3),
    assists: Math.floor(Math.random() * 4),
    yellowCards: Math.floor(Math.random() * 3),
    redCards: Math.floor(Math.random() * 1),
  }));
}

export async function getResults(teamId: TeamId): Promise<Match[]> {
  const cacheKey = `results-${teamId}`;
  const cached = dataCache.get<Match[]>(cacheKey);
  if (cached) return cached;

  try {
    const team = TEAMS[teamId];
    const url = `${BASE_URL}/${team.futbalnetPath}/vysledky/`;
    const html = await fetchPage(url);
    if (html) {
      const $ = cheerio.load(html);
      const matches: Match[] = [];
      $('table.matches-table tbody tr, .match-row, [class*="match"]').each((_, el) => {
        const cols = $(el).find('td');
        if (cols.length >= 4) {
          const dateText = $(cols[0]).text().trim();
          const home = $(cols[1]).text().trim();
          const score = $(cols[2]).text().trim();
          const away = $(cols[3]).text().trim();
          const [sh, sa] = score.split(':').map(s => parseInt(s.trim()));
          matches.push({
            date: dateText,
            time: '',
            homeTeam: home,
            awayTeam: away,
            scoreHome: isNaN(sh) ? null : sh,
            scoreAway: isNaN(sa) ? null : sa,
            competition: team.name,
            round: '',
            isHome: home.includes('Sačurov'),
          });
        }
      });
      if (matches.length > 0) {
        dataCache.set(cacheKey, matches);
        return matches;
      }
    }
  } catch (e) {
    console.error('Scraping results failed:', e);
  }

  // Fallback: return stale cache or demo data
  const stale = dataCache.getStale<Match[]>(cacheKey);
  if (stale) return stale;

  const demo = generateDemoResults(teamId);
  dataCache.set(cacheKey, demo, 5 * 60 * 1000);
  return demo;
}

export async function getFixtures(teamId: TeamId): Promise<Fixture[]> {
  const cacheKey = `fixtures-${teamId}`;
  const cached = dataCache.get<Fixture[]>(cacheKey);
  if (cached) return cached;

  try {
    const team = TEAMS[teamId];
    const url = `${BASE_URL}/${team.futbalnetPath}/program/`;
    const html = await fetchPage(url);
    if (html) {
      const $ = cheerio.load(html);
      const fixtures: Fixture[] = [];
      $('table.matches-table tbody tr, .match-row, [class*="match"]').each((_, el) => {
        const cols = $(el).find('td');
        if (cols.length >= 4) {
          const dateText = $(cols[0]).text().trim();
          const home = $(cols[1]).text().trim();
          const away = $(cols[3]).text().trim();
          const isHome = home.includes('Sačurov');
          fixtures.push({
            date: dateText,
            time: '',
            homeTeam: home,
            awayTeam: away,
            competition: team.name,
            venue: isHome ? 'Ihrisko ŠK Sačurov' : '',
            round: '',
            isHome,
          });
        }
      });
      if (fixtures.length > 0) {
        dataCache.set(cacheKey, fixtures);
        return fixtures;
      }
    }
  } catch (e) {
    console.error('Scraping fixtures failed:', e);
  }

  const stale = dataCache.getStale<Fixture[]>(cacheKey);
  if (stale) return stale;

  const demo = generateDemoFixtures(teamId);
  dataCache.set(cacheKey, demo, 5 * 60 * 1000);
  return demo;
}

export async function getTable(teamId: TeamId): Promise<TableRow[]> {
  const cacheKey = `table-${teamId}`;
  const cached = dataCache.get<TableRow[]>(cacheKey);
  if (cached) return cached;

  try {
    const team = TEAMS[teamId];
    const url = `${BASE_URL}/${team.futbalnetPath}/tabulky/`;
    const html = await fetchPage(url);
    if (html) {
      const $ = cheerio.load(html);
      const rows: TableRow[] = [];
      $('table tbody tr').each((_, el) => {
        const cols = $(el).find('td');
        if (cols.length >= 8) {
          const teamName = $(cols[1]).text().trim();
          rows.push({
            position: parseInt($(cols[0]).text().trim()) || 0,
            teamName,
            played: parseInt($(cols[2]).text().trim()) || 0,
            wins: parseInt($(cols[3]).text().trim()) || 0,
            draws: parseInt($(cols[4]).text().trim()) || 0,
            losses: parseInt($(cols[5]).text().trim()) || 0,
            goalsFor: parseInt($(cols[6]).text().trim().split(':')[0]) || 0,
            goalsAgainst: parseInt($(cols[6]).text().trim().split(':')[1]) || 0,
            points: parseInt($(cols[7]).text().trim()) || 0,
            isHighlighted: teamName.includes('Sačurov'),
          });
        }
      });
      if (rows.length > 0) {
        dataCache.set(cacheKey, rows);
        return rows;
      }
    }
  } catch (e) {
    console.error('Scraping table failed:', e);
  }

  const stale = dataCache.getStale<TableRow[]>(cacheKey);
  if (stale) return stale;

  const demo = generateDemoTable(teamId);
  dataCache.set(cacheKey, demo, 5 * 60 * 1000);
  return demo;
}

export async function getPlayers(teamId: TeamId): Promise<Player[]> {
  const cacheKey = `players-${teamId}`;
  const cached = dataCache.get<Player[]>(cacheKey);
  if (cached) return cached;

  try {
    const team = TEAMS[teamId];
    const url = `${BASE_URL}/${team.futbalnetPath}/sutaz/hraci/`;
    const html = await fetchPage(url);
    if (html) {
      const $ = cheerio.load(html);
      const players: Player[] = [];
      $('table tbody tr').each((_, el) => {
        const cols = $(el).find('td');
        if (cols.length >= 3) {
          players.push({
            number: $(cols[0]).text().trim() || '-',
            name: $(cols[1]).text().trim(),
            position: $(cols[2]).text().trim() || '-',
            matches: parseInt($(cols[3])?.text()?.trim()) || 0,
            goals: parseInt($(cols[4])?.text()?.trim()) || 0,
            assists: parseInt($(cols[5])?.text()?.trim()) || 0,
            yellowCards: parseInt($(cols[6])?.text()?.trim()) || 0,
            redCards: parseInt($(cols[7])?.text()?.trim()) || 0,
          });
        }
      });
      if (players.length > 0) {
        dataCache.set(cacheKey, players);
        return players;
      }
    }
  } catch (e) {
    console.error('Scraping players failed:', e);
  }

  const stale = dataCache.getStale<Player[]>(cacheKey);
  if (stale) return stale;

  const demo = generateDemoPlayers(teamId);
  dataCache.set(cacheKey, demo, 5 * 60 * 1000);
  return demo;
}

export async function getNextMatch(teamId: TeamId): Promise<Fixture | null> {
  const fixtures = await getFixtures(teamId);
  return fixtures.length > 0 ? fixtures[0] : null;
}
