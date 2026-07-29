import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  
  try {
    const isShipped = orderId === 'EK-9939';
    const filename = isShipped ? 'shipped-receipt.pdf' : 'receipt.pdf';
    
    const filePath = path.join(process.cwd(), 'output', filename);
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice_${orderId}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json({
      error: 'PDF not found. Please run `npm run render-all` to generate PDFs.',
      status: 404
    }, { status: 404 });
  }
}
