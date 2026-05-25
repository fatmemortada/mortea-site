
function setupStripeButtons() {
  document.querySelectorAll("[data-stripe-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.stripePlan || "professional";
      const link = getStripeCheckoutLink(plan);

      if (!link || link.includes("REPLACE_")) {
        alert("Stripe payment link is not connected yet. Create the Stripe Payment Link first, then replace it in js/stripe-config.js.");
        return;
      }

      window.location.href = link;
    });
  });
}

async function setupDashboardPlanPayment() {
  const dashboard = document.querySelector("[data-provider-dashboard]");
  if (!dashboard || typeof supabaseClient === "undefined") return;

  const planSelect = document.querySelector('[name="plan_type"]');
  const checkoutButton = document.querySelector("[data-dashboard-checkout]");
  const membershipText = document.querySelector("[data-membership-summary]");

  function updatePlanUi() {
    if (!planSelect) return;

    const plan = planSelect.value || "professional";
    const price = plan === "creator" ? 30 : plan === "single_user" ? 10 : 35;
    const label = plan === "creator" ? "Creator" : plan === "single_user" ? "Single User" : "Professional";

    if (membershipText) {
      membershipText.textContent = `${label} — $${price}/month after 5-day free trial`;
    }

    if (checkoutButton) {
      checkoutButton.dataset.stripePlan = plan;
    }
  }

  if (planSelect) {
    planSelect.addEventListener("change", updatePlanUi);
    updatePlanUi();
  }

  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const plan = checkoutButton.dataset.stripePlan || "professional";
      const link = getStripeCheckoutLink(plan);

      if (!link || link.includes("REPLACE_")) {
        alert("Stripe payment link is not connected yet. Replace the placeholder URL in js/stripe-config.js.");
        return;
      }

      window.location.href = link;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupStripeButtons();
  setupDashboardPlanPayment();
});
