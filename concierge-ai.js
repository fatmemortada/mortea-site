// Mortéa Phase 22 — Beauty Concierge Assistant

function getConciergeReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes("book")) {
    return "I can help you choose a service and send a booking request.";
  }

  if (lower.includes("price")) {
    return "I can help compare pricing, service duration, and provider availability.";
  }

  return "Tell me what type of beauty service you are looking for, and I will help you find the best match.";
}
