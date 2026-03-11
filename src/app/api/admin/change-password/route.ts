import { NextRequest, NextResponse } from 'next/server';
import { getAdminById, updateAdminPassword } from '@/lib/db';
import { verifySession, verifyPassword, hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Vyplňte staré a nové heslo' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Nové heslo musí mať aspoň 6 znakov' },
        { status: 400 }
      );
    }

    const user = getAdminById(session.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'Používateľ nenájdený' },
        { status: 404 }
      );
    }

    const validOld = await verifyPassword(oldPassword, user.password_hash);
    if (!validOld) {
      return NextResponse.json(
        { error: 'Nesprávne staré heslo' },
        { status: 401 }
      );
    }

    const newHash = await hashPassword(newPassword);
    updateAdminPassword(user.id, newHash);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Interná chyba servera' },
      { status: 500 }
    );
  }
}
