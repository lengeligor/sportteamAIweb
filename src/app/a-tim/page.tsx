import type { Metadata } from 'next';
import { getResults, getFixtures, getTable, getPlayers } from '@/lib/futbalnet/scraper';
import TeamPageClient from '@/components/TeamPageClient';

export const metadata: Metadata = {
  title: 'A-tím (Dospelí)',
  description: 'Výsledky, program zápasov, tabuľka a hráči A-tímu ŠK Sačurov vo VII. lige ObFZ Vranov.',
};

export const dynamic = 'force-dynamic';

export default async function ATeamPage() {
  const [results, fixtures, table, players] = await Promise.all([
    getResults('a'),
    getFixtures('a'),
    getTable('a'),
    getPlayers('a'),
  ]);

  return (
    <TeamPageClient
      teamName="A-tím (Dospelí)"
      teamBadgeClass="team-badge-a"
      badgeLabel="⚽ A-tím"
      basePath="/a-tim"
      results={results}
      fixtures={fixtures}
      table={table}
      players={players}
    />
  );
}
