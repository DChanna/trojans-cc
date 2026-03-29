import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const records = await prisma.moneyRecord.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch money records' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const record = await prisma.moneyRecord.create({
      data: {
        description: body.description,
        amount: body.amount,
        owedBy: body.owedBy || null,
        paidBy: body.paidBy || null,
        status: body.status || 'Unpaid',
        datePaid: body.datePaid ? new Date(body.datePaid) : null,
        hasReceipt: body.hasReceipt || false,
        notes: body.notes || null,
      },
    });
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create money record' }, { status: 500 });
  }
}
