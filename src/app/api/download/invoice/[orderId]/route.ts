import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  
  return NextResponse.json({
    message: `Invoice for order ${orderId}`,
    status: 'success',
    note: "Demo placeholder — full PDF export available locally via `npm run render-all` in the /output directory."
  }, { status: 200 });
}
