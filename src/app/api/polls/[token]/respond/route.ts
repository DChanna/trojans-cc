import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json();

    // Find the poll by token
    const poll = await prisma.poll.findUnique({ where: { token } });
    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }
    if (!poll.isOpen) {
      return NextResponse.json({ error: 'This poll is closed' }, { status: 400 });
    }
    if (poll.deadline && new Date() > poll.deadline) {
      return NextResponse.json({ error: 'This poll has expired' }, { status: 400 });
    }

    // Upsert the response
    const response = await prisma.pollResponse.upsert({
      where: {
        pollId_playerId: {
          pollId: poll.id,
          playerId: body.playerId,
        },
      },
      update: {
        status: body.status,
        note: body.note || null,
      },
      create: {
        pollId: poll.id,
        playerId: body.playerId,
        status: body.status,
        note: body.note || null,
      },
      include: { player: true },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit response' }, { status: 500 });
  }
}
