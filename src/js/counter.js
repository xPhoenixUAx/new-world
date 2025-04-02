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
      countdownElement.innerHTML = "Час вийшов!";
      clearInterval(interval);
      console.log("⏰ Час вийшов!");
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
          <span class="countdown-label">Dzień</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${
            hours < 10 ? "0" + hours : hours
          }</span>
          <span class="countdown-label">Godzina</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${
            minutes < 10 ? "0" + minutes : minutes
          }</span>
          <span class="countdown-label">Chwila</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${
            seconds < 10 ? "0" + seconds : seconds
          }</span>
          <span class="countdown-label">Chwila</span>
        </div>
      </div>
    `;
  }

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);

  console.log("🔥 Таймер запущено!");
}
