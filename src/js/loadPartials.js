function loadPartial(selector, file) {
  console.log(`🔄 Fetching: ${file}`); // Лог для перевірки шляху до файлу
  fetch(file)
    .then((response) => {
      if (!response.ok)
        throw new Error(`❌ HTTP error! Status: ${response.status}`);
      return response.text();
    })
    .then((data) => {
      console.log(`✅ Loaded: ${file}`); // Лог для підтвердження завантаження
      console.log("📌 Content:", data); // Лог для перевірки отриманого контенту
      document.querySelector(selector).innerHTML = data;
    })
    .catch((error) => console.error(`⚠️ Error loading ${file}:`, error));
}

// Завантажуємо партіали
document.addEventListener("DOMContentLoaded", () => {
  loadPartial("#header", "./src/partials/header.html");
  loadPartial("#hero", "./src/partials/main/hero.html");
});
