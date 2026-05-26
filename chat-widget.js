// Mortéa Phase 22 — Floating Chat Widget

function openChatWidget(providerId) {
  console.log("Opening chat with provider:", providerId);
}

function createChatButton(providerId) {
  const button = document.createElement("button");
  button.className = "mortea-chat-button";
  button.textContent = "Message Provider";
  button.addEventListener("click", () => openChatWidget(providerId));
  return button;
}
