// Mortéa Phase 54 — Dashboard Bookings

function renderBookings(bookings = []) {
  const container = document.getElementById("live-bookings");
  if (!container) return;

  container.innerHTML = bookings.map(booking => `
    <div class="booking-card">
      <h3>${booking.client_name || "Client"}</h3>
      <p>${booking.service_name || "Service"}</p>
      <p>${booking.booking_date || ""}</p>
    </div>
  `).join("");
}\n