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

    const availability = await prisma.availability.findMany({
      where,
      include: {
        player: true,
        match: true,
        season: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const availability = await prisma.availability.upsert({
      where: {
        playerId_matchId: {
          playerId: body.playerId,
          matchId: body.matchId,
        },
      },
      update: {
        status: body.status,
      },
      create: {
        playerId: body.playerId,
        matchId: body.matchId,
        seasonId: body.seasonId,
        status: body.status,
      },
      include: {
        player: true,
        match: true,
      },
    });
    return NextResponse.json(availability, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set availability' }, { status: 500 });
  }
}
