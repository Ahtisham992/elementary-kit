import { NextResponse, NextRequest } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();

    if (!html) {
      return NextResponse.json({ error: 'No HTML provided' }, { status: 400 });
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set the HTML content directly
    await page.setContent(html, { waitUntil: 'load' });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({ 
      format: 'A4', 
      printBackground: true, 
      margin: { top: '0', bottom: '0', left: '0', right: '0' } 
    });
    
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="custom_receipt.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
