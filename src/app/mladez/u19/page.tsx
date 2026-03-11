import type { Metadata } from 'next';
import { getResults, getFixtures, getTable, getPlayers } from '@/lib/futbalnet/scraper';
import TeamPageClient from '@/components/TeamPageClient';

export const metadata: Metadata = {
  title: 'U19 Dorast',
  description: 'Výsledky, program zápasov, tabuľka a hráči U19 dorastu ŠK Sačurov.',
};

export const dynamic = 'force-dynamic';

export default async function U19Page() {
  const [results, fixtures, table, players] = await Promise.all([
    getResults('u19'),
    getFixtures('u19'),
    getTable('u19'),
    getPlayers('u19'),
  ]);

  return (
    <TeamPageClient
      teamName="U19 Dorast"
      teamBadgeClass="team-badge-youth"
      badgeLabel="🔵 U19 Dorast"
      basePath="/mladez/u19"
      results={results}
      fixtures={fixtures}
      table={table}
      players={players}
    />
  );
}
