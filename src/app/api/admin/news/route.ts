import { NextRequest, NextResponse } from 'next/server';
import { getAllNews, createNews } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const news = getAllNews();
  return NextResponse.json(news);
}

export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, slug, content } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Vyplňte všetky povinné polia' },
        { status: 400 }
      );
    }

    const post = createNews({ title, slug, content });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Interná chyba servera' },
      { status: 500 }
    );
  }
}
