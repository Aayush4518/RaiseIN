"use client";

import { useState } from "react";

export default function PayButton({ amount = 500, description = "Support My Project" }) {
  const [loading, setLoading] = useState(false);

  const amountNumber = Number(amount) || 0;

  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const res = await loadScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountNumber }),
    });

    const order = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your Company",
      description: description,
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const result = await verifyRes.json();
        alert(result.status);
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

    return (
    <button onClick={handlePayment} disabled={loading || amountNumber <= 0} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-95">
      {loading ? "Processing..." : `Pay Complete ₹${amountNumber}`}
    </button>
  );
}