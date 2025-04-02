function loadPartial(selector, file) {
  fetch(file)
    .then((response) => {
      if (!response.ok)
        throw new Error(`❌ HTTP error! Status: ${response.status}`);
      return response.text();
    })
    .then((data) => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch((error) => console.error(`⚠️ Error loading ${file}:`, error));
}

// Завантажуємо партіали
document.addEventListener("DOMContentLoaded", () => {
  loadPartial("#header", "./src/partials/header.html");
  loadPartial("#hero", "./src/partials/main/hero.html");
});
