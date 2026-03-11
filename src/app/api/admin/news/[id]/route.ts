import { NextRequest, NextResponse } from 'next/server';
import { getNewsById, updateNews, deleteNews } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const post = getNewsById(parseInt(id));
  if (!post) {
    return NextResponse.json({ error: 'Článok nenájdený' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { title, slug, content } = await request.json();
    const post = updateNews(parseInt(id), { title, slug, content });

    if (!post) {
      return NextResponse.json({ error: 'Článok nenájdený' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: 'Interná chyba servera' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deleteNews(parseInt(id));

  if (!deleted) {
    return NextResponse.json({ error: 'Článok nenájdený' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
