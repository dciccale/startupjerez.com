// Open mobile menu
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu-2");

  toggleButton.addEventListener("click", function () {
    menu.classList.toggle("hidden");
  });
});

