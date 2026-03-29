import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const forms = await prisma.form.findMany({
      include: {
        _count: { select: { responses: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(forms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch forms' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const form = await prisma.form.create({
      data: {
        title: body.title,
        description: body.description || null,
        fields: typeof body.fields === 'string' ? body.fields : JSON.stringify(body.fields),
        isActive: body.isActive ?? true,
      },
    });
    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create form' }, { status: 500 });
  }
}
