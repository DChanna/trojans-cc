import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonId = searchParams.get('seasonId');

    const where: any = {};
    if (seasonId) {
      where.seasonId = seasonId;
    }

    const matches = await prisma.match.findMany({
      where,
      include: {
        homeTeam: true,
        awayTeam: true,
        season: true,
      },
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const match = await prisma.match.create({
      data: {
        seasonId: body.seasonId,
        homeTeamId: body.homeTeamId,
        awayTeamId: body.awayTeamId,
        date: new Date(body.date),
        time: body.time || null,
        format: body.format || null,
        ground: body.ground || null,
        result: body.result || null,
        homeScore: body.homeScore || null,
        awayScore: body.awayScore || null,
        gameNumber: body.gameNumber,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        season: true,
      },
    });
    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}
