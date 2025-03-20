import { NextResponse } from "next/server";

const installationResults: { installed: boolean; timestamp: string }[] = [];

export async function POST(req: Request) {
  try {
    const { installed, timestamp } = await req.json();
    if (installed === undefined || !timestamp) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    installationResults.push({ installed, timestamp });
    console.log("📥 Next.js가 받은 데이터:", { installed, timestamp });

    return NextResponse.json({ success: true, data: installationResults });
  } catch (error) {
    console.error("❌ Next.js API 오류:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ data: installationResults });
}
