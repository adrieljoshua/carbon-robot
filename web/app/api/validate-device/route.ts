import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { public_key, pin } = body;

    console.log("Validating device with:", { public_key, pin });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NILLION_URL}/validate-device`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_key,
          pin,
        }),
      }
    );

    const data = await response.json();
    console.log("Nillion response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error validating device:", error);
    return NextResponse.json(
      {
        message: "Error validating device",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
