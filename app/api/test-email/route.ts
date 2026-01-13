import { NextRequest, NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/email";

// This endpoint is for testing email configuration
// Usage: GET /api/test-email?email=your@email.com
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      {
        error:
          "Email parameter required. Usage: /api/test-email?email=your@email.com",
      },
      { status: 400 }
    );
  }

  const result = await sendTestEmail(email);

  if (result.success) {
    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      emailId: result.id,
    });
  } else {
    return NextResponse.json(
      {
        success: false,
        error: result.error,
      },
      { status: 500 }
    );
  }
}
