// Mortéa Phase 22 — Real-Time Messaging

async function loadConversations() {
  console.log("Loading conversations...");
}

async function sendMessage(conversationId, senderId, body) {
  const message = {
    conversation_id: conversationId,
    sender_id: senderId,
    body,
    created_at: new Date().toISOString()
  };

  console.log("Message ready to send:", message);
  return message;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("message-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.getElementById("message-input");
    if (!input || !input.value.trim()) return;

    await sendMessage(null, null, input.value.trim());
    input.value = "";
  });
});
