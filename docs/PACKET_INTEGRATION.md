# Packeta API Integration Guide

## ✅ Implementation Status

Your website now has **complete Packeta API integration**:

- ✅ Packeta pickup point selection via widget
- ✅ Pickup point details stored in Stripe metadata
- ✅ Order confirmation emails with Packeta details
- ✅ **NEW:** Automatic shipment creation in Packeta's system
- ✅ **NEW:** Immediate label generation capability
- ✅ **NEW:** Test endpoint for verification

## Setup Required

### 1. Get Packeta API Password

- Contact Packeta integrations team: `integrations@packeta.com`
- Request API password for your client account
- This is a 32-character hexadecimal string

### 2. Add Environment Variable

Add to your `.env.production`:

```bash
PACKETA_API_PASSWORD=your_32_char_api_password_here
```

### 3. Test the Integration

Visit: `https://your-domain.com/api/test-packeta`

This will create a test shipment in your Packeta account (free for undispatched packets).

## How It Works

### Automatic Flow

1. Customer completes checkout with Packeta pickup point
2. Stripe processes payment
3. Webhook triggers → Packeta shipment created automatically
4. Shipment appears in https://client.packeta.com/
5. You can print labels immediately
6. Customer receives tracking information

### Data Mapping

| Your Data       | Packeta API Field  | Example                  |
| --------------- | ------------------ | ------------------------ |
| `session.id`    | `number`           | `cs_test_1234567890`     |
| Customer name   | `name` + `surname` | John Doe → "John", "Doe" |
| Customer email  | `email`            | customer@email.com       |
| Customer phone  | `phone`            | +420123456789            |
| Pickup point ID | `addressId`        | 79 (Prague pickup)       |
| Order total     | `value`            | 84900 (849 CZK)          |
| Product weight  | `weight`           | 0.8 (800g diary)         |

## Files Modified

### `/lib/packeta-api.ts` (NEW)

Complete Packeta API client with shipment creation and label generation.

### `/app/api/webhook/route.ts` (UPDATED)

Added automatic shipment creation after successful payment.

### `/lib/products.ts` (UPDATED)

Added `weight` property to all products for accurate shipping.

### `/app/api/test-packeta/route.ts` (NEW)

Test endpoint for verifying API integration.

## Testing

### Test Endpoint

```bash
curl https://your-domain.com/api/test-packeta
```

Expected response:

```json
{
  "success": true,
  "message": "Packeta shipment created successfully!",
  "packetId": "Z1234567890",
  "hasLabel": true,
  "instructions": "Check https://client.packeta.com/ to see the created shipment"
}
```

### Verify in Packeta Portal

1. Login to https://client.packeta.com/
2. Go to "Packets" section
3. Look for shipment with your test order number
4. Click "Print Label" to generate shipping label

## Benefits

- 🚀 **Zero Manual Work**: Orders appear automatically in Packeta
- 📄 **Instant Labels**: Generate shipping labels immediately
- 📊 **Real-time Tracking**: Customers get tracking info
- 🛡️ **Error Prevention**: No manual data entry mistakes
- 📈 **Scalability**: Handles any order volume automatically

## Cost Impact

- **API Usage**: Free
- **Shipping Labels**: Free generation
- **Physical Shipping**: Only charged when dispatched
- **Testing**: Undispatched packets = $0

## Troubleshooting

### Common Issues

**"PACKETA_API_PASSWORD not set"**

- Add the environment variable to your production deployment
- Contact Packeta for your API password

**"Invalid API password"**

- Verify the password with Packeta support
- Check for extra spaces or characters

**"Address ID invalid"**

- Ensure pickup point IDs are valid
- Some pickup points don't support packet consignment

**Shipment created but no label**

- Labels generate after shipment creation
- Check Packeta portal directly for label printing

### Logs to Check

Look for these in your production logs:

```
🚚 Creating Packeta shipment...
✅ Packeta shipment created: Z1234567890
📄 Shipment label generated successfully
```

## Next Steps

1. **Get API Password** from Packeta
2. **Deploy** with `PACKETA_API_PASSWORD` environment variable
3. **Test** with real orders
4. **Monitor** Packeta portal for automatic shipments
5. **Print Labels** as orders come in

## API Reference

### createShipment()

Creates a shipment in Packeta's system.

**Parameters:**

- `orderNumber`: Your order ID
- `customerName/Surname`: Split customer name
- `customerEmail/Phone`: Contact details
- `packetaAddressId`: Pickup point ID from widget
- `packageValue`: Order total in CZK
- `weight`: Package weight in kg
- `codAmount`: Cash on Delivery (0 = no COD)

**Returns:**

- `success`: boolean
- `packetId`: Packeta shipment ID (e.g., "Z1234567890")
- `error`: Error message if failed

### getShipmentLabel()

Generates PDF shipping label.

**Parameters:**

- `packetId`: From createShipment response
- `format`: Label format ("A6 on A6", "A7 on A4", etc.)

**Returns:** PDF buffer or null

## Support

- **Packeta API**: `integrations@packeta.com`
- **Integration Issues**: Check logs and test endpoint
- **Label Printing**: Use Packeta client portal

---

**🎉 Your Packeta integration is now complete! Orders will automatically appear in your Packeta administration system for immediate label printing.**
