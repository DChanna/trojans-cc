import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        teams: { include: { team: true } },
        availability: { include: { match: true } },
        gameNotes: { include: { match: true } },
      },
    });

    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch player' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const player = await prisma.player.update({
      where: { id },
      data: {
        fullName: body.fullName,
        email: body.email ?? undefined,
        phone: body.phone ?? undefined,
        usaCricketId: body.usaCricketId ?? undefined,
        role: body.role ?? undefined,
        battingStyle: body.battingStyle ?? undefined,
        bowlingStyle: body.bowlingStyle ?? undefined,
        paymentPlan: body.paymentPlan ?? undefined,
        duesPaid: body.duesPaid ?? undefined,
        outstandingAmount: body.outstandingAmount ?? undefined,
        umpireAssignments: body.umpireAssignments ?? undefined,
        notes: body.notes ?? undefined,
      },
    });

    if (body.teamIds) {
      await prisma.playerTeam.deleteMany({ where: { playerId: id } });
      for (const teamId of body.teamIds) {
        await prisma.playerTeam.create({
          data: { playerId: id, teamId, isPrimary: true },
        });
      }
    }

    const updated = await prisma.player.findUnique({
      where: { id },
      include: { teams: { include: { team: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update player' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.player.delete({ where: { id } });
    return NextResponse.json({ message: 'Player deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete player' }, { status: 500 });
  }
}
