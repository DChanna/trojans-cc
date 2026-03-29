import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const team = searchParams.get('team');
    const search = searchParams.get('search');

    const where: any = {};
    if (search) {
      where.fullName = { contains: search };
    }
    if (team) {
      where.teams = { some: { team: { shortName: team } } };
    }

    const players = await prisma.player.findMany({
      where,
      include: { teams: { include: { team: true } } },
      orderBy: { playerId: 'asc' },
    });
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const player = await prisma.player.create({
      data: {
        playerId: body.playerId,
        fullName: body.fullName,
        email: body.email || null,
        phone: body.phone || null,
        usaCricketId: body.usaCricketId || null,
        role: body.role || null,
        battingStyle: body.battingStyle || null,
        bowlingStyle: body.bowlingStyle || null,
        paymentPlan: body.paymentPlan || 'Season Dues',
        duesPaid: body.duesPaid || 'Unpaid',
        notes: body.notes || null,
      },
    });

    if (body.teamIds && body.teamIds.length > 0) {
      for (const teamId of body.teamIds) {
        await prisma.playerTeam.create({
          data: { playerId: player.id, teamId, isPrimary: true },
        });
      }
    }

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
  }
}
