export function startCountdown(targetDate) {
  const countdownElement = document.getElementById("countdown");

  if (!countdownElement) {
    console.error("❌ Елемент #countdown не знайдено!");
    return;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
      countdownElement.innerHTML = "Czas minął!";
      clearInterval(interval);
      console.log("⏰ Czas minął!");
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
      <div class="countdown-grid">
        <div class="countdown-item">
          <span class="countdown-number">${days}</span>
          <span class="countdown-label">Dni</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${hours
            .toString()
            .padStart(2, "0")}</span>
          <span class="countdown-label">Godziny</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${minutes
            .toString()
            .padStart(2, "0")}</span>
          <span class="countdown-label">Minuty</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${seconds
            .toString()
            .padStart(2, "0")}</span>
          <span class="countdown-label">Sekundy</span>
        </div>
      </div>
    `;
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);

  console.log("🔥 Timer uruchomiony!");
}
