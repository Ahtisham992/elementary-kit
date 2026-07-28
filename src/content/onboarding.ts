export const onboardingContent = {
  headline: "Welcome to Elementary Kit",
  bodyCopy: "We're thrilled to have you here. Elementary Kit lets you write one component tree and render it everywhere.",
  ctaText: "Get Started",
  // Demo link — points to the project repo so judges land somewhere real
  ctaUrl: "https://github.com/Ahtisham992/elementary-kit",
  lineItems: [
    { label: "Plan", value: "Pro" },
    { label: "Price", value: "$0.00/mo" },
  ],
};

export const receiptContent = {
  headline: "Payment Receipt",
  bodyCopy: "Thank you for your purchase! Your order #EK-9938 has been processed successfully.",
  ctaText: "Download Invoice",
  // Demo link — in production this would point to a generated PDF download
  ctaUrl: "https://github.com/Ahtisham992/elementary-kit",
  lineItems: [
    { label: "Elementary Kit Pro", value: "$49.00" },
    { label: "Tax (0%)", value: "$0.00" },
    { label: "Total", value: "$49.00" },
  ],
};

export const orderShippedContent = {
  headline: "Your Order is Shipped",
  bodyCopy: "Great news! Your package is on its way. You can track your shipment using the link below.",
  ctaText: "Track Package",
  ctaUrl: "https://github.com/Ahtisham992/elementary-kit",
  lineItems: [
    { label: "Carrier", value: "FedEx" },
    { label: "Tracking #", value: "9876543210" },
  ],
};

export const orderShippedReceiptContent = {
  headline: "Order Invoice",
  bodyCopy: "Here is your invoice for order #EK-9939 shipped today.",
  ctaText: "Download Invoice",
  ctaUrl: "https://github.com/Ahtisham992/elementary-kit",
  lineItems: [
    { label: "Mechanical Keyboard", value: "$129.00" },
    { label: "Shipping", value: "$0.00" },
    { label: "Tax (8%)", value: "$10.32" },
    { label: "Total", value: "$139.32" },
  ],
};

export type ContentPayload = typeof onboardingContent;
