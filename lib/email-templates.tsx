import React from "react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress?: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  };
  packetaPickupPoint?: {
    id: string;
    name: string;
    address: string;
  };
  deliveryMethod?: string;
}

// Customer confirmation email template
export const CustomerOrderConfirmationEmail = ({
  orderId,
  customerName,
  items,
  subtotal,
  shipping,
  total,
  shippingAddress,
  packetaPickupPoint,
  deliveryMethod,
}: OrderDetails) => (
  <html>
    <head>
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #ffffff;
          padding: 30px;
          border: 1px solid #e0e0e0;
        }
        .order-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .item {
          padding: 15px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .item:last-child {
          border-bottom: none;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 14px;
        }
        .total-row.final {
          font-size: 18px;
          font-weight: bold;
          border-top: 2px solid #333;
          margin-top: 10px;
          padding-top: 15px;
        }
        .address-box {
          background: #f0f7ff;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-radius: 0 0 10px 10px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
      `}</style>
    </head>
    <body>
      <div className="header">
        <h1 style={{ margin: 0 }}>Děkujeme za vaši objednávku! 💐</h1>
        <p style={{ margin: "10px 0 0 0", opacity: 0.9 }}>
          Thank you for your order!
        </p>
      </div>

      <div className="content">
        <p>Milá/Milý {customerName},</p>
        <p>
          Vaše objednávka byla úspěšně přijata a brzy bude zpracována. Těšíme
          se, že vám náš produkt přinese radost! 🌸
        </p>

        <div className="order-info">
          <h2 style={{ marginTop: 0, color: "#667eea" }}>
            Detail objednávky #{orderId}
          </h2>

          {items.map((item, index) => (
            <div key={index} className="item">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    Množství: {item.quantity}
                  </div>
                </div>
                <div style={{ fontWeight: "bold" }}>
                  {(item.price / 100).toFixed(2)} Kč
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <div className="total-row">
              <span>Mezisoučet:</span>
              <span>{(subtotal / 100).toFixed(2)} Kč</span>
            </div>
            <div className="total-row">
              <span>Doprava:</span>
              <span>{(shipping / 100).toFixed(2)} Kč</span>
            </div>
            <div className="total-row final">
              <span>Celkem:</span>
              <span>{(total / 100).toFixed(2)} Kč</span>
            </div>
          </div>
        </div>

        {packetaPickupPoint && (
          <div className="address-box">
            <h3 style={{ marginTop: 0, color: "#667eea" }}>
              📦 Výdejní místo Zásilkovna
            </h3>
            <p style={{ margin: "5px 0" }}>
              <strong>{packetaPickupPoint.name}</strong>
            </p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {packetaPickupPoint.address}
            </p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
              ID: {packetaPickupPoint.id}
            </p>
          </div>
        )}

        {shippingAddress && !packetaPickupPoint && (
          <div className="address-box">
            <h3 style={{ marginTop: 0, color: "#667eea" }}>
              📬 Doručovací adresa
            </h3>
            <p style={{ margin: "5px 0" }}>{shippingAddress.name}</p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {shippingAddress.line1}
            </p>
            {shippingAddress.line2 && (
              <p style={{ margin: "5px 0", color: "#666" }}>
                {shippingAddress.line2}
              </p>
            )}
            <p style={{ margin: "5px 0", color: "#666" }}>
              {shippingAddress.postal_code} {shippingAddress.city}
            </p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {shippingAddress.country}
            </p>
          </div>
        )}

        <p style={{ marginTop: "30px" }}>
          <strong>Co bude dál?</strong>
        </p>
        <ul style={{ paddingLeft: "20px" }}>
          <li>Vaše objednávka bude zpracována do 2 pracovních dnů</li>
          <li>Jakmile zásilku odešleme, pošleme vám sledovací číslo</li>
          <li>Doručení obvykle trvá 2-3 pracovní dny</li>
        </ul>

        <p style={{ marginTop: "30px" }}>
          Máte-li jakékoli dotazy, neváhejte nás kontaktovat na{" "}
          <a href="mailto:info@terezajinochova.cz">info@terezajinochova.cz</a>
        </p>

        <p style={{ marginTop: "30px" }}>
          S pozdravem,
          <br />
          <strong>Tereza Jinochová</strong>
        </p>
      </div>

      <div className="footer">
        <p style={{ margin: "5px 0" }}>© 2026 Tereza Jinochová</p>
        <p style={{ margin: "5px 0" }}>
          www.terezajinochova.cz | info@terezajinochova.cz
        </p>
      </div>
    </body>
  </html>
);

// Admin notification email template
export const AdminOrderNotificationEmail = ({
  orderId,
  customerEmail,
  customerName,
  items,
  subtotal,
  shipping,
  total,
  shippingAddress,
  packetaPickupPoint,
  deliveryMethod,
}: OrderDetails) => (
  <html>
    <head>
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: #ff6b6b;
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #ffffff;
          padding: 30px;
          border: 1px solid #e0e0e0;
        }
        .alert {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 10px;
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .info-label {
          font-weight: bold;
          color: #666;
        }
        .item {
          padding: 15px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .item:last-child {
          border-bottom: none;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 14px;
        }
        .total-row.final {
          font-size: 18px;
          font-weight: bold;
          border-top: 2px solid #333;
          margin-top: 10px;
          padding-top: 15px;
        }
        .address-box {
          background: #f0f7ff;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-radius: 0 0 10px 10px;
        }
      `}</style>
    </head>
    <body>
      <div className="header">
        <h1 style={{ margin: 0 }}>🔔 Nová objednávka!</h1>
        <p style={{ margin: "10px 0 0 0", opacity: 0.9 }}>New Order Received</p>
      </div>

      <div className="content">
        <div className="alert">
          <strong>⚠️ Akce požadována:</strong> Nová objednávka čeká na
          zpracování!
        </div>

        <h2 style={{ color: "#ff6b6b" }}>Informace o objednávce</h2>
        <div className="info-grid">
          <div className="info-label">Číslo objednávky:</div>
          <div>#{orderId}</div>

          <div className="info-label">Zákazník:</div>
          <div>{customerName}</div>

          <div className="info-label">Email:</div>
          <div>
            <a href={`mailto:${customerEmail}`}>{customerEmail}</a>
          </div>

          <div className="info-label">Datum:</div>
          <div>{new Date().toLocaleString("cs-CZ")}</div>

          {deliveryMethod && (
            <>
              <div className="info-label">Doprava:</div>
              <div>
                {deliveryMethod === "packeta_pickup"
                  ? "Zásilkovna - výdejní místo"
                  : "Zásilkovna - doručení na adresu"}
              </div>
            </>
          )}
        </div>

        <h3 style={{ color: "#ff6b6b" }}>Objednané produkty</h3>
        {items.map((item, index) => (
          <div key={index} className="item">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Množství: {item.quantity}
                </div>
              </div>
              <div style={{ fontWeight: "bold" }}>
                {(item.price / 100).toFixed(2)} Kč
              </div>
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <div className="total-row">
            <span>Mezisoučet:</span>
            <span>{(subtotal / 100).toFixed(2)} Kč</span>
          </div>
          <div className="total-row">
            <span>Doprava:</span>
            <span>{(shipping / 100).toFixed(2)} Kč</span>
          </div>
          <div className="total-row final">
            <span>Celkem zaplaceno:</span>
            <span>{(total / 100).toFixed(2)} Kč</span>
          </div>
        </div>

        {packetaPickupPoint && (
          <div className="address-box">
            <h3 style={{ marginTop: 0, color: "#ff6b6b" }}>
              📦 Výdejní místo Zásilkovna
            </h3>
            <p style={{ margin: "5px 0" }}>
              <strong>{packetaPickupPoint.name}</strong>
            </p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {packetaPickupPoint.address}
            </p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
              ID pobočky: {packetaPickupPoint.id}
            </p>
          </div>
        )}

        {shippingAddress && !packetaPickupPoint && (
          <div className="address-box">
            <h3 style={{ marginTop: 0, color: "#ff6b6b" }}>
              📬 Doručovací adresa
            </h3>
            <p style={{ margin: "5px 0" }}>
              <strong>{shippingAddress.name}</strong>
            </p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {shippingAddress.line1}
            </p>
            {shippingAddress.line2 && (
              <p style={{ margin: "5px 0", color: "#666" }}>
                {shippingAddress.line2}
              </p>
            )}
            <p style={{ margin: "5px 0", color: "#666" }}>
              {shippingAddress.postal_code} {shippingAddress.city}
            </p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              {shippingAddress.country}
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            background: "#e8f5e9",
            borderRadius: "8px",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>
            ✅ Další kroky:
          </h4>
          <ol style={{ margin: 0, paddingLeft: "20px" }}>
            <li>Zabalit produkt a připravit k odeslání</li>
            <li>Vytvořit štítek na Zásilkovně</li>
            <li>Zadat číslo balíku do systému</li>
            <li>Předat zásilku dopravci</li>
          </ol>
        </div>
      </div>

      <div className="footer">
        <p style={{ margin: "5px 0" }}>Toto je automatický notifikační email</p>
        <p style={{ margin: "5px 0" }}>Tereza Jinochová Admin Panel</p>
      </div>
    </body>
  </html>
);
