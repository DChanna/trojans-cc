import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        team: true,
        responses: {
          include: { player: true },
        },
        _count: { select: { responses: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(polls);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch polls' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const poll = await prisma.poll.create({
      data: {
        title: body.title,
        description: body.description || null,
        teamId: body.teamId,
        matchLabel: body.matchLabel || null,
        deadline: body.deadline ? new Date(body.deadline) : null,
      },
      include: { team: true },
    });
    return NextResponse.json(poll, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create poll' }, { status: 500 });
  }
}
