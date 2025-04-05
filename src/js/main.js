import "./css/style.css";
import { startCountdown } from "./js/counter.js";


function waitForElement(selector, callback) {
  const observer = new MutationObserver((mutationsList, observer) => {
    if (document.querySelector(selector)) {
      observer.disconnect(); 
      callback();
    }
    const targetDate = new Date("2025-09-15T00:00:00").getTime(); 
    startCountdown(targetDate);
  });

  observer.observe(document.body, { childList: true, subtree: true });
}


waitForElement("#countdown", () => {
  console.log("🔥 Hero загружено! Запускаємо таймер...");
  const targetDate = new Date("2025-04-10T00:00:00").getTime();
  startCountdown(targetDate);
});






