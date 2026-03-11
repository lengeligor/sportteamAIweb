import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
}

export interface NewsPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

// In-memory database for serverless (Vercel) compatibility
// For production, migrate to Vercel Postgres or Turso
let adminUsers: AdminUser[] = [];
let newsPosts: NewsPost[] = [];
let nextNewsId = 1;
let initialized = false;

function ensureInitialized() {
  if (initialized) return;
  initialized = true;

  // Seed admin user
  const hash = bcrypt.hashSync('changeme123', 12);
  adminUsers = [
    { id: 1, username: 'admin', password_hash: hash },
  ];

  // Seed some demo news
  newsPosts = [
    {
      id: nextNewsId++,
      title: 'Príprava na jarnú časť sezóny 2026',
      slug: 'priprava-na-jarnu-cast-sezony-2026',
      content: `Zimná príprava A-tímu ŠK Sačurov je v plnom prúde! Hráči trénujú trikrát týždenne a pripravujú sa na jarné zápasy VII. ligy.\n\nTréner Marek Horváth zdôrazňuje dôležitosť fyzickej kondície: "Chceme byť pripravení na prvý jarný zápas. Cieľom je umiestnenie v hornej polovici tabuľky."\n\nZimný prípravný kemp sa uskutoční v dňoch 15.-17. februára na domácom ihrisku.`,
      published_at: '2026-02-01T10:00:00Z',
      created_at: '2026-02-01T10:00:00Z',
      updated_at: '2026-02-01T10:00:00Z',
    },
    {
      id: nextNewsId++,
      title: 'Turnaj mládeže v Sačurove',
      slug: 'turnaj-mladeze-v-sacurove',
      content: `ŠK Sačurov organizuje halový turnaj pre mládežnícke kategórie U15 a U19. Turnaj sa uskutoční 22. februára 2026 v športovej hale.\n\nPozvané sú okolité kluby z okresu Vranov nad Topľou. Registrácia prebieha do 15. februára.\n\nPríďte podporiť našich mladých futbalistov!`,
      published_at: '2026-02-10T14:00:00Z',
      created_at: '2026-02-10T14:00:00Z',
      updated_at: '2026-02-10T14:00:00Z',
    },
    {
      id: nextNewsId++,
      title: 'Nový sponzor pre sezónu 2026',
      slug: 'novy-sponzor-pre-sezonu-2026',
      content: `S radosťou oznamujeme, že ŠK Sačurov získal nového sponzora pre sezónu 2026. Spoločnosť ABC s.r.o. podporí klub finančným príspevkom na nákup nového vybavenia.\n\n"Vážime si podporu lokálnych podnikateľov. Nové dresy a tréningové pomôcky pomôžu hráčom zlepšiť výkonnosť," povedal predseda klubu.\n\nĎakujeme všetkým partnerom za ich podporu!`,
      published_at: '2026-03-01T09:00:00Z',
      created_at: '2026-03-01T09:00:00Z',
      updated_at: '2026-03-01T09:00:00Z',
    },
    {
      id: nextNewsId++,
      title: 'Začiatok jarnej časti sezóny',
      slug: 'zaciatok-jarnej-casti-sezony',
      content: `Jarná časť sezóny 2025/2026 štartuje už tento víkend! A-tím ŠK Sačurov nastúpi na prvý zápas proti FK Vranov na domácom ihrisku.\n\nZápas sa odohrá v nedeľu 15. marca o 15:30. Vstup je voľný.\n\nPríďte povzbudiť náš tím a užiť si atmosféru futbalového zápasu!`,
      published_at: '2026-03-10T12:00:00Z',
      created_at: '2026-03-10T12:00:00Z',
      updated_at: '2026-03-10T12:00:00Z',
    },
  ];
}

// Admin user operations
export function getAdminByUsername(username: string): AdminUser | undefined {
  ensureInitialized();
  return adminUsers.find(u => u.username === username);
}

export function getAdminById(id: number): AdminUser | undefined {
  ensureInitialized();
  return adminUsers.find(u => u.id === id);
}

export function updateAdminPassword(id: number, newHash: string): void {
  ensureInitialized();
  const user = adminUsers.find(u => u.id === id);
  if (user) user.password_hash = newHash;
}

// News post operations
export function getAllNews(): NewsPost[] {
  ensureInitialized();
  return [...newsPosts].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export function getNewsBySlug(slug: string): NewsPost | undefined {
  ensureInitialized();
  return newsPosts.find(p => p.slug === slug);
}

export function getNewsById(id: number): NewsPost | undefined {
  ensureInitialized();
  return newsPosts.find(p => p.id === id);
}

export function getLatestNews(count: number): NewsPost[] {
  return getAllNews().slice(0, count);
}

export function createNews(data: { title: string; slug: string; content: string; published_at?: string }): NewsPost {
  ensureInitialized();
  const now = new Date().toISOString();
  const post: NewsPost = {
    id: nextNewsId++,
    title: data.title,
    slug: data.slug,
    content: data.content,
    published_at: data.published_at || now,
    created_at: now,
    updated_at: now,
  };
  newsPosts.push(post);
  return post;
}

export function updateNews(id: number, data: { title?: string; slug?: string; content?: string; published_at?: string }): NewsPost | null {
  ensureInitialized();
  const post = newsPosts.find(p => p.id === id);
  if (!post) return null;

  if (data.title) post.title = data.title;
  if (data.slug) post.slug = data.slug;
  if (data.content) post.content = data.content;
  if (data.published_at) post.published_at = data.published_at;
  post.updated_at = new Date().toISOString();

  return post;
}

export function deleteNews(id: number): boolean {
  ensureInitialized();
  const idx = newsPosts.findIndex(p => p.id === id);
  if (idx === -1) return false;
  newsPosts.splice(idx, 1);
  return true;
}
