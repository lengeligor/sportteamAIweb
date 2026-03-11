import type { Metadata } from 'next';
import { getResults, getFixtures, getTable, getPlayers } from '@/lib/futbalnet/scraper';
import TeamPageClient from '@/components/TeamPageClient';

export const metadata: Metadata = {
  title: 'U15 Žiaci',
  description: 'Výsledky, program zápasov, tabuľka a hráči U15 žiakov ŠK Sačurov.',
};

export const dynamic = 'force-dynamic';

export default async function U15Page() {
  const [results, fixtures, table, players] = await Promise.all([
    getResults('u15'),
    getFixtures('u15'),
    getTable('u15'),
    getPlayers('u15'),
  ]);

  return (
    <TeamPageClient
      teamName="U15 Žiaci"
      teamBadgeClass="team-badge-youth"
      badgeLabel="🔵 U15 Žiaci"
      basePath="/mladez/u15"
      results={results}
      fixtures={fixtures}
      table={table}
      players={players}
    />
  );
}
