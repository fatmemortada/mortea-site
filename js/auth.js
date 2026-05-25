
const MORTEA_ADMIN_EMAIL = "fatmemortada88@gmail.com";

async function getCurrentUser() {
  if (typeof supabaseClient === "undefined") return null;
  const { data } = await supabaseClient.auth.getUser();
  return data?.user || null;
}

async function setupAuthPage() {
  const loginForm = document.querySelector("[data-login-form]");
  const signupForm = document.querySelector("[data-signup-form]");
  const message = document.querySelector("[data-auth-message]");

  function setMessage(text, type = "info") {
    if (!message) return;
    message.textContent = text;
    message.dataset.type = type;
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = loginForm.querySelector('input[name="email"]').value;
      const password = loginForm.querySelector('input[name="password"]').value;

      setMessage("Signing you in...");

      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message, "error");
        return;
      }

      setMessage("Signed in successfully.", "success");

      if (email.toLowerCase() === MORTEA_ADMIN_EMAIL.toLowerCase()) {
        window.location.href = "admin.html";
      } else {
        window.location.href = "provider-dashboard.html";
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = signupForm.querySelector('input[name="email"]').value;
      const password = signupForm.querySelector('input[name="password"]').value;

      setMessage("Creating your account...");

      const { error } = await supabaseClient.auth.signUp({
        email,
        password
      });

      if (error) {
        setMessage(error.message, "error");
        return;
      }

      setMessage("Account created. Check your email if Supabase asks for confirmation.", "success");
    });
  }
}

async function protectProviderDashboard() {
  const page = document.querySelector("[data-provider-dashboard]");
  if (!page) return;

  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const emailDisplay = document.querySelector("[data-user-email]");
  if (emailDisplay) emailDisplay.textContent = user.email;

  const form = document.querySelector("[data-provider-profile-form]");
  const message = document.querySelector("[data-profile-message]");

  function setProfileMessage(text, type = "info") {
    if (!message) return;
    message.textContent = text;
    message.dataset.type = type;
  }

  // Try to load a provider profile connected by email.
  const { data: existing, error } = await supabaseClient
    .from("professionals")
    .select("*")
    .eq("email", user.email)
    .limit(1)
    .maybeSingle();

  if (!error && existing && form) {
    form.querySelector('[name="business_name"]').value = existing.business_name || "";
    form.querySelector('[name="owner_name"]').value = existing.owner_name || "";
    form.querySelector('[name="phone"]').value = existing.phone || "";
    form.querySelector('[name="category"]').value = existing.category || "";
    form.querySelector('[name="country"]').value = existing.country || "";
    form.querySelector('[name="province"]').value = existing.province || "";
    form.querySelector('[name="city"]').value = existing.city || "";
    form.querySelector('[name="address"]').value = existing.address || "";
    form.querySelector('[name="instagram"]').value = existing.instagram || "";
    form.querySelector('[name="whatsapp"]').value = existing.whatsapp || "";
    form.querySelector('[name="website"]').value = existing.website || "";
    form.querySelector('[name="booking_link"]').value = existing.booking_link || "";
    form.querySelector('[name="description"]').value = existing.description || "";

    const status = document.querySelector("[data-profile-status]");
    if (status) status.textContent = existing.status || "pending";
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const payload = {
        business_name: form.querySelector('[name="business_name"]').value,
        owner_name: form.querySelector('[name="owner_name"]').value,
        email: user.email,
        phone: form.querySelector('[name="phone"]').value,
        category: form.querySelector('[name="category"]').value,
        country: form.querySelector('[name="country"]').value,
        province: form.querySelector('[name="province"]').value,
        city: form.querySelector('[name="city"]').value,
        address: form.querySelector('[name="address"]').value,
        instagram: form.querySelector('[name="instagram"]').value,
        whatsapp: form.querySelector('[name="whatsapp"]').value,
        website: form.querySelector('[name="website"]').value,
        booking_link: form.querySelector('[name="booking_link"]').value,
        description: form.querySelector('[name="description"]').value,
        status: existing?.status || "pending"
      };

      setProfileMessage("Saving profile...");

      let result;

      if (existing?.id) {
        result = await supabaseClient
          .from("professionals")
          .update(payload)
          .eq("id", existing.id);
      } else {
        result = await supabaseClient
          .from("professionals")
          .insert([payload]);
      }

      if (result.error) {
        setProfileMessage(result.error.message, "error");
        console.error(result.error);
        return;
      }

      setProfileMessage("Profile saved. It will appear publicly after approval.", "success");
    });
  }
}

async function setupLogoutButtons() {
  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", async () => {
      await supabaseClient.auth.signOut();
      window.location.href = "login.html";
    });
  });
}

async function protectAdminVisual() {
  const adminPage = document.querySelector("[data-admin-protected]");
  if (!adminPage) return;

  const user = await getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (user.email.toLowerCase() !== MORTEA_ADMIN_EMAIL.toLowerCase()) {
    adminPage.innerHTML = `
      <section class="auth-card">
        <p class="eyebrow">Access Restricted</p>
        <h1>Admin access only.</h1>
        <p>This area is reserved for Mortéa admin access.</p>
        <a class="btn primary" href="index.html">Return Home</a>
      </section>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupAuthPage();
  protectProviderDashboard();
  protectAdminVisual();
  setupLogoutButtons();
});
