import { NextRequest, NextResponse } from "next/server";
import { packetaAPI } from "@/lib/packeta-api";

export async function GET(request: NextRequest) {
  console.log("🚀 Test Packeta API endpoint called");

  try {
    // Test data for Packeta API
    const testShipmentData = {
      orderNumber: `TEST-${Date.now()}`,
      customerName: "Test",
      customerSurname: "Customer",
      customerEmail: "test@example.com",
      customerPhone: "+420123456789",
      packetaAddressId: 79, // Prague pickup point ID
      packageValue: 1000, // 1000 CZK
      weight: 0.5, // 500g
      codAmount: 0,
    };

    console.log("🧪 Testing Packeta API with data:", testShipmentData);
    console.log(
      "🧪 API Password from env:",
      process.env.PACKETA_API_PASSWORD ? "Set" : "Not set"
    );
    console.log(
      "🧪 API Password length:",
      process.env.PACKETA_API_PASSWORD?.length
    );

    const result = await packetaAPI.createShipment(testShipmentData);

    console.log("🧪 Packeta API result:", result);

    if (result.success && result.packetId) {
      // Try to get the label as well
      const labelPdf = await packetaAPI.getShipmentLabel(result.packetId);
      const hasLabel = !!labelPdf;

      return NextResponse.json({
        success: true,
        message: "Packeta shipment created successfully!",
        packetId: result.packetId,
        hasLabel,
        testData: testShipmentData,
        instructions:
          "Check https://client.packeta.com/ to see the created shipment",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          testData: testShipmentData,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Test endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
