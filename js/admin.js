
async function loadAdminSummary() {
  const approvedList = document.querySelector("[data-approved-professionals]");
  const approvedCount = document.querySelector("[data-approved-count]");
  const clientCount = document.querySelector("[data-client-count]");
  const pendingNotice = document.querySelector("[data-pending-notice]");

  if (typeof supabaseClient === "undefined") return;

  const { data: approved, error: approvedError } = await supabaseClient
    .from("professionals")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (approvedError) {
    console.error("Approved professionals loading error:", approvedError);
  }

  if (approvedCount) approvedCount.textContent = approved ? approved.length : "0";

  if (approvedList) {
    approvedList.innerHTML = "";

    if (!approved || approved.length === 0) {
      approvedList.innerHTML = `<div class="admin-empty">No approved professionals yet.</div>`;
    } else {
      approved.forEach((professional) => {
        const item = document.createElement("div");
        item.className = "admin-list-item";
        item.innerHTML = `
          <div>
            <strong>${safeAdminText(professional.business_name, "Unnamed business")}</strong>
            <span>${safeAdminText(professional.city, "City not set")} • ${safeAdminText(professional.category, "Category not set")}</span>
          </div>
          <div class="admin-status approved">Approved</div>
        `;
        approvedList.appendChild(item);
      });
    }
  }

  // Clients table currently has insert-only public policy; reading clients must stay private.
  if (clientCount) clientCount.textContent = "Private";
  if (pendingNotice) pendingNotice.style.display = "block";
}

function safeAdminText(value, fallback = "") {
  return value && String(value).trim() ? String(value).trim() : fallback;
}

function setupSqlGenerator() {
  const emailInput = document.querySelector("[data-approval-email]");
  const approveOutput = document.querySelector("[data-approve-sql]");
  const rejectOutput = document.querySelector("[data-reject-sql]");
  const featureOutput = document.querySelector("[data-feature-sql]");

  function updateSql() {
    const email = (emailInput?.value || "professional@email.com").trim();

    if (approveOutput) {
      approveOutput.value =
`update professionals
set status = 'approved'
where email = '${email}';`;
    }

    if (rejectOutput) {
      rejectOutput.value =
`update professionals
set status = 'rejected'
where email = '${email}';`;
    }

    if (featureOutput) {
      featureOutput.value =
`update professionals
set membership = 'Featured Founder'
where email = '${email}';`;
    }
  }

  if (emailInput) {
    emailInput.addEventListener("input", updateSql);
    updateSql();
  }

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.querySelector(button.dataset.copyTarget);
      if (!target) return;

      await navigator.clipboard.writeText(target.value || target.textContent);
      button.textContent = "Copied";
      setTimeout(() => button.textContent = "Copy SQL", 1200);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadAdminSummary();
  setupSqlGenerator();
});
