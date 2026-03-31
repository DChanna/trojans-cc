import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const poll = await prisma.poll.findUnique({
      where: { token },
      include: {
        team: {
          include: {
            players: {
              include: { player: true },
              orderBy: { player: { fullName: 'asc' } },
            },
          },
        },
        responses: {
          include: { player: true },
        },
      },
    });

    if (!poll) {
      return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    }

    return NextResponse.json(poll);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch poll' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json();

    const poll = await prisma.poll.update({
      where: { token },
      data: {
        isOpen: body.isOpen ?? undefined,
        title: body.title ?? undefined,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
      },
    });

    return NextResponse.json(poll);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update poll' }, { status: 500 });
  }
}
