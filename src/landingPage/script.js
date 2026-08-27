const form = document.querySelector("#waitlist-form");
const note = document.querySelector("#form-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = new FormData(form).get("email");

  if (!email) {
    return;
  }

  form.innerHTML = `
    <div style="padding: 15px; color: #30704e; font-weight: 700;">
      You’re on the list ✦
    </div>
  `;

  note.textContent = "We’ll save you a spot and be in touch soon.";
});