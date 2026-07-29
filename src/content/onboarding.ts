export type ContentPayload = {
  headline: string;
  bodyCopy: string;
  ctaText: string;
  ctaUrl: string;
  lineItems: Array<{ label: string; value: string }>;
  receiptDetails?: {
    items: Array<{ description: string; price: number }>;
    taxRate: number;
    extraCharges: Array<{ label: string; amount: number }>;
  };
};

export const onboardingContent: ContentPayload = {
  headline: "Welcome to Elementary Kit",
  bodyCopy: "We're thrilled to have you here. Elementary Kit lets you write one component tree and render it everywhere.",
  ctaText: "Get Started",
  ctaUrl: "https://elementary-kit.vercel.app/onboarding",
  lineItems: [
    { label: "Plan", value: "Pro" },
    { label: "Price", value: "$0.00/mo" },
  ],
};

export const receiptContent: ContentPayload = {
  headline: "Payment Receipt",
  bodyCopy: "Thank you for your purchase! Your order #EK-9938 has been processed successfully.",
  ctaText: "Download Invoice",
  ctaUrl: "https://elementary-kit.vercel.app/api/download/invoice/EK-9938",
  lineItems: [],
  receiptDetails: {
    items: [
      { description: "Elementary Kit Pro", price: 49.00 }
    ],
    taxRate: 0,
    extraCharges: []
  }
};

export const orderShippedContent: ContentPayload = {
  headline: "Your Order is Shipped",
  bodyCopy: "Great news! Your package is on its way. You can track your shipment using the link below.",
  ctaText: "Track Package",
  ctaUrl: "https://elementary-kit.vercel.app/track/EK-9939",
  lineItems: [
    { label: "Carrier", value: "FedEx" },
    { label: "Tracking #", value: "9876543210" },
  ],
};

export const orderShippedReceiptContent: ContentPayload = {
  headline: "Order Invoice",
  bodyCopy: "Here is your invoice for order #EK-9939 shipped today.",
  ctaText: "Download Invoice",
  ctaUrl: "https://elementary-kit.vercel.app/api/download/invoice/EK-9939",
  lineItems: [],
  receiptDetails: {
    items: [
      { description: "Mechanical Keyboard", price: 129.00 }
    ],
    taxRate: 8,
    extraCharges: [
      { label: "Shipping", amount: 0.00 }
    ]
  }
};
