// app/api/nonOperatingDays/route.ts
import { NextResponse } from "next/server";

let nonOperatingDates: string[] = [];

export async function GET() {
  return NextResponse.json(nonOperatingDates);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { dates } = body;
  nonOperatingDates = dates;
  return NextResponse.json({ success: true });
}
