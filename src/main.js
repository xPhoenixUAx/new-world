import "./css/style.css";
import { startCountdown } from "./js/counter.js";

// Функція для спостереження за змінами в DOM
function waitForElement(selector, callback) {
  const observer = new MutationObserver((mutationsList, observer) => {
    if (document.querySelector(selector)) {
      observer.disconnect(); // Зупиняємо спостереження
      callback();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Чекаємо, поки #hero завантажиться, і тільки тоді запускаємо таймер
waitForElement("#countdown", () => {
  console.log("🔥 Hero загружено! Запускаємо таймер...");
  const targetDate = new Date("2025-04-10T00:00:00").getTime();
  startCountdown(targetDate);
});
