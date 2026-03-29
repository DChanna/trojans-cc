import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get('matchId');

    const where: any = {};
    if (matchId) {
      where.matchId = matchId;
    }

    const notes = await prisma.gameNote.findMany({
      where,
      include: {
        player: true,
        match: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch game notes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const note = await prisma.gameNote.upsert({
      where: {
        playerId_matchId: {
          playerId: body.playerId,
          matchId: body.matchId,
        },
      },
      update: {
        note: body.note,
      },
      create: {
        playerId: body.playerId,
        matchId: body.matchId,
        note: body.note,
      },
      include: {
        player: true,
        match: true,
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create game note' }, { status: 500 });
  }
}
