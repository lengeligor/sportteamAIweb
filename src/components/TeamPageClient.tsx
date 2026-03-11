'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Match, Fixture, TableRow, Player } from '@/lib/futbalnet/types';
import { Suspense } from 'react';

interface TeamPageClientProps {
  teamName: string;
  teamBadgeClass: string;
  badgeLabel: string;
  basePath: string;
  results: Match[];
  fixtures: Fixture[];
  table: TableRow[];
  players: Player[];
}

function TeamContent({ teamName, teamBadgeClass, badgeLabel, basePath, results, fixtures, table, players }: TeamPageClientProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'vysledky';

  function getScoreClass(match: Match): string {
    if (match.scoreHome === null || match.scoreAway === null) return '';
    const isHome = match.homeTeam.includes('Sačurov');
    const ourScore = isHome ? match.scoreHome : match.scoreAway;
    const theirScore = isHome ? match.scoreAway : match.scoreHome;
    if (ourScore > theirScore) return 'score-win';
    if (ourScore < theirScore) return 'score-loss';
    return 'score-draw';
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className={`team-badge ${teamBadgeClass}`}>{badgeLabel}</span>
          <h1>{teamName}</h1>
          <p style={{ position: 'relative', zIndex: 1 }}>Výsledky, program, tabuľka a hráči</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="tabs" id="team-tabs">
            <Link href={`${basePath}?tab=vysledky`} className={`tab ${activeTab === 'vysledky' ? 'active' : ''}`}>
              Výsledky
            </Link>
            <Link href={`${basePath}?tab=program`} className={`tab ${activeTab === 'program' ? 'active' : ''}`}>
              Program
            </Link>
            <Link href={`${basePath}?tab=tabulka`} className={`tab ${activeTab === 'tabulka' ? 'active' : ''}`}>
              Tabuľka
            </Link>
            <Link href={`${basePath}?tab=hraci`} className={`tab ${activeTab === 'hraci' ? 'active' : ''}`}>
              Hráči
            </Link>
          </div>

          {/* Results Tab */}
          {activeTab === 'vysledky' && (
            <div className="animate-fade-in" id="results-tab">
              <h2 className="mb-3">Výsledky</h2>
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Kolo</th>
                      <th>Dátum</th>
                      <th>Domáci</th>
                      <th>Skóre</th>
                      <th>Hostia</th>
                      <th>Súťaž</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((match, i) => (
                      <tr key={i}>
                        <td>{match.round}</td>
                        <td>{match.date}</td>
                        <td style={{ fontWeight: match.homeTeam.includes('Sačurov') ? 700 : 400, color: match.homeTeam.includes('Sačurov') ? 'var(--primary-yellow)' : 'inherit' }}>
                          {match.homeTeam}
                        </td>
                        <td>
                          <span className={`score-badge ${getScoreClass(match)}`}>
                            {match.scoreHome !== null ? `${match.scoreHome}:${match.scoreAway}` : '-'}
                          </span>
                        </td>
                        <td style={{ fontWeight: match.awayTeam.includes('Sačurov') ? 700 : 400, color: match.awayTeam.includes('Sačurov') ? 'var(--primary-yellow)' : 'inherit' }}>
                          {match.awayTeam}
                        </td>
                        <td><span className="badge badge-blue">{match.competition}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fixtures Tab */}
          {activeTab === 'program' && (
            <div className="animate-fade-in" id="fixtures-tab">
              <h2 className="mb-3">Program zápasov</h2>
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Kolo</th>
                      <th>Dátum</th>
                      <th>Čas</th>
                      <th>Domáci</th>
                      <th>Hostia</th>
                      <th>Miesto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fixtures.map((fixture, i) => (
                      <tr key={i}>
                        <td>{fixture.round}</td>
                        <td>{fixture.date}</td>
                        <td>{fixture.time}</td>
                        <td style={{ fontWeight: fixture.homeTeam.includes('Sačurov') ? 700 : 400, color: fixture.homeTeam.includes('Sačurov') ? 'var(--primary-yellow)' : 'inherit' }}>
                          {fixture.homeTeam}
                        </td>
                        <td style={{ fontWeight: fixture.awayTeam.includes('Sačurov') ? 700 : 400, color: fixture.awayTeam.includes('Sačurov') ? 'var(--primary-yellow)' : 'inherit' }}>
                          {fixture.awayTeam}
                        </td>
                        <td>{fixture.venue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Table Tab */}
          {activeTab === 'tabulka' && (
            <div className="animate-fade-in" id="table-tab">
              <h2 className="mb-3">Tabuľka</h2>
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tím</th>
                      <th>Z</th>
                      <th>V</th>
                      <th>R</th>
                      <th>P</th>
                      <th>Góly</th>
                      <th>Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((row) => (
                      <tr key={row.position} className={row.isHighlighted ? 'highlighted' : ''}>
                        <td>{row.position}.</td>
                        <td>{row.teamName}</td>
                        <td>{row.played}</td>
                        <td>{row.wins}</td>
                        <td>{row.draws}</td>
                        <td>{row.losses}</td>
                        <td>{row.goalsFor}:{row.goalsAgainst}</td>
                        <td><strong>{row.points}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Players Tab */}
          {activeTab === 'hraci' && (
            <div className="animate-fade-in" id="players-tab">
              <h2 className="mb-3">Hráči</h2>
              <div className="data-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Meno</th>
                      <th>Post</th>
                      <th>Zápasy</th>
                      <th>Góly</th>
                      <th>Asistencie</th>
                      <th>ŽK</th>
                      <th>ČK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, i) => (
                      <tr key={i}>
                        <td>{player.number}</td>
                        <td><strong>{player.name}</strong></td>
                        <td><span className="badge badge-yellow">{player.position}</span></td>
                        <td>{player.matches}</td>
                        <td>{player.goals || '-'}</td>
                        <td>{player.assists || '-'}</td>
                        <td>{player.yellowCards || '-'}</td>
                        <td>{player.redCards || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function TeamPageClient(props: TeamPageClientProps) {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: '120px' }}>Načítavam...</div>}>
      <TeamContent {...props} />
    </Suspense>
  );
}
