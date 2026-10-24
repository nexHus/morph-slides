import { NextResponse } from "next/server";

// In-memory slide state shared across devices on the server
let currentSlide = 0;
let lastUpdated = Date.now();

export async function GET() {
  return NextResponse.json({
    slide: currentSlide,
    timestamp: lastUpdated,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (typeof body.slide === "number") {
      currentSlide = body.slide;
      lastUpdated = Date.now();
    }
    return NextResponse.json({ success: true, slide: currentSlide });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}