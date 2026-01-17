import axios from "axios";
import { parseStringPromise } from "xml2js";

export interface PacketaShipmentData {
  orderNumber: string;
  customerName: string;
  customerSurname: string;
  customerEmail: string;
  customerPhone: string;
  packetaAddressId: number; // From pickup point selection
  packageValue: number; // In CZK
  weight: number; // In kg
  codAmount?: number; // Cash on Delivery (optional)
}

export interface PacketaShipmentResult {
  success: boolean;
  packetId?: string;
  error?: string;
}

export class PacketaAPI {
  private apiPassword: string;
  private apiUrl = "https://www.zasilkovna.cz/api/rest";

  constructor(apiPassword: string) {
    this.apiPassword = apiPassword;
  }

  async createShipment(
    shipmentData: PacketaShipmentData
  ): Promise<PacketaShipmentResult> {
    // Use the exact XML structure from Packeta documentation
    const xmlBody = `<createPacket>
	<apiPassword>${this.apiPassword}</apiPassword>
	<packetAttributes>
		<number>${shipmentData.orderNumber}</number>
		<name>${shipmentData.customerName}</name>
		<surname>${shipmentData.customerSurname}</surname>
		<email>${shipmentData.customerEmail}</email>
		<phone>${shipmentData.customerPhone}</phone>
		<addressId>${shipmentData.packetaAddressId}</addressId>
		<cod>${shipmentData.codAmount || 0}</cod>
		<value>${shipmentData.packageValue}</value>
		<weight>${shipmentData.weight}</weight>
	</packetAttributes>
</createPacket>`;

    try {
      console.log(
        "📦 Creating Packeta shipment for order:",
        shipmentData.orderNumber
      );
      console.log("📧 API Password length:", this.apiPassword.length);
      console.log(
        "📧 API Password starts with:",
        this.apiPassword.substring(0, 4)
      );

      const response = await axios.post(this.apiUrl, xmlBody, {
        headers: {
          "Content-Type": "application/xml",
          Accept: "application/xml",
        },
        timeout: 30000, // 30 second timeout
      });

      console.log("📧 Packeta API response status:", response.status);
      console.log("📧 Packeta API response data:", response.data);

      const result = await parseStringPromise(response.data);

      console.log("📧 Parsed result:", JSON.stringify(result, null, 2));

      if (result.response.status[0] === "ok") {
        const packetId = result.response.result[0].id[0];
        console.log("✅ Packeta shipment created successfully:", packetId);
        return { success: true, packetId };
      } else {
        const error =
          result.response.errors?.[0]?.error?.[0] || "Unknown error";
        console.error("❌ Packeta API error:", error);
        return { success: false, error };
      }
    } catch (error: any) {
      console.error("❌ Packeta API request failed:", error.message);
      console.error("❌ Error response:", error.response?.data);
      console.error("❌ Error status:", error.response?.status);
      console.error("❌ Error headers:", error.response?.headers);
      return {
        success: false,
        error: error.message || "Unknown error",
      };
    }
  }

  async getShipmentLabel(
    packetId: string,
    format: string = "A6 on A6"
  ): Promise<Buffer | null> {
    const xmlBody = `<packetLabelPdf>
      <apiPassword>${this.apiPassword}</apiPassword>
      <packetId>${packetId}</packetId>
      <format>${format}</format>
      <offset>0</offset>
    </packetLabelPdf>`;

    try {
      const response = await axios.post(this.apiUrl, xmlBody, {
        headers: { "Content-Type": "application/xml" },
        responseType: "arraybuffer",
      });

      return Buffer.from(response.data);
    } catch (error) {
      console.error("❌ Failed to get shipment label:", error);
      return null;
    }
  }
}

// Export singleton instance
export const packetaAPI = new PacketaAPI(process.env.PACKETA_API_PASSWORD!);
