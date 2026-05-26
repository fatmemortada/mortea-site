// Mortéa Phase 27 — Email Templates

const emailTemplates = {
  bookingConfirmation: (clientName, providerName) => `
    Hi ${clientName},

    Your booking request with ${providerName} has been received.

    Mortéa
  `,

  bookingReminder: (clientName, serviceName, date) => `
    Hi ${clientName},

    Reminder: your ${serviceName} appointment is scheduled for ${date}.

    Mortéa
  `,

  reviewRequest: (clientName, providerName) => `
    Hi ${clientName},

    We hope you enjoyed your experience with ${providerName}. Please leave a review on Mortéa.

    Mortéa
  `
};
