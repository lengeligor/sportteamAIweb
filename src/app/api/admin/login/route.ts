import { NextRequest, NextResponse } from 'next/server';
import { getAdminByUsername } from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/auth';

// Simple rate limiter
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const attempts = loginAttempts.get(ip);
    
    // Rate limiting: max 5 attempts per 5 minutes
    if (attempts && attempts.count >= 5) {
      const elapsed = Date.now() - attempts.lastAttempt;
      if (elapsed < 5 * 60 * 1000) {
        return NextResponse.json(
          { error: 'Príliš veľa pokusov. Skúste neskôr.' },
          { status: 429 }
        );
      } else {
        loginAttempts.delete(ip);
      }
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Vyplňte meno a heslo' },
        { status: 400 }
      );
    }

    const user = getAdminByUsername(username);
    if (!user) {
      // Track failed attempt
      const current = loginAttempts.get(ip) || { count: 0, lastAttempt: Date.now() };
      loginAttempts.set(ip, { count: current.count + 1, lastAttempt: Date.now() });

      return NextResponse.json(
        { error: 'Nesprávne meno alebo heslo' },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      const current = loginAttempts.get(ip) || { count: 0, lastAttempt: Date.now() };
      loginAttempts.set(ip, { count: current.count + 1, lastAttempt: Date.now() });

      return NextResponse.json(
        { error: 'Nesprávne meno alebo heslo' },
        { status: 401 }
      );
    }

    // Clear failed attempts on success
    loginAttempts.delete(ip);

    await createSession(user.id, user.username);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Interná chyba servera' },
      { status: 500 }
    );
  }
}
