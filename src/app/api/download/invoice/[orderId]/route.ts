import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  const orderId = params.orderId;
  
  return NextResponse.json({
    message: `Invoice for order ${orderId}`,
    status: 'success',
    note: "Demo placeholder — full PDF export available locally via `npm run render-all` in the /output directory."
  }, { status: 200 });
}
