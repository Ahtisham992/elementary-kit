export const onboardingContent = {
  headline: "Welcome to Elementary Kit",
  bodyCopy: "We're thrilled to have you here. Elementary Kit lets you write one component tree and render it everywhere.",
  ctaText: "Get Started",
  ctaUrl: "https://unlayer.com",
  lineItems: [
    { label: "Plan", value: "Pro" },
    { label: "Price", value: "$0.00/mo" },
  ],
};

export const receiptContent = {
  headline: "Payment Receipt",
  bodyCopy: "Thank you for your purchase! Your order #EK-9938 has been processed successfully.",
  ctaText: "Download Invoice",
  ctaUrl: "https://unlayer.com",
  lineItems: [
    { label: "Elementary Kit Pro", value: "$49.00" },
    { label: "Tax (0%)", value: "$0.00" },
    { label: "Total", value: "$49.00" },
  ],
};

export type ContentPayload = typeof onboardingContent;
