"use client";

import { useEffect, useState } from "react";
import {
  getStoredReferral,
  getReferralSummary,
  hasReferral,
} from "@/lib/referral-tracking";

export default function ReferralTestPage() {
  const [referralData, setReferralData] = useState<any>(null);
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    const data = getStoredReferral();
    setReferralData(data);
    setSummary(getReferralSummary(data));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Referral Tracking Test</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Has Referral: {hasReferral() ? "YES" : "NO"}</h2>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Referral Summary:</h2>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: referralData ? "#dcab6f" : "#666",
          }}
        >
          {summary}
        </p>
      </div>

      <div>
        <h2>Raw Referral Data:</h2>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "5px",
            overflow: "auto",
          }}
        >
          {JSON.stringify(referralData, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Test Links:</h2>
        <ul>
          <li>
            <a href="?ref=instagram_influencer1">?ref=instagram_influencer1</a>
          </li>
          <li>
            <a href="?utm_source=facebook&utm_medium=social&utm_campaign=wedding_blogger">
              Facebook UTM
            </a>
          </li>
          <li>
            <a href="?utm_source=instagram&utm_medium=stories&utm_campaign=bride_influencer">
              Instagram UTM
            </a>
          </li>
          <li>
            <a href="?ref=direct_sale">?ref=direct_sale</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
