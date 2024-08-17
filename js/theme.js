// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.getElementById("dark-icon").removeAttribute("hidden");
  document.getElementById("light-icon").setAttribute("hidden", true);
} else {
  document.getElementById("light-icon").removeAttribute("hidden");
  document.getElementById("dark-icon").setAttribute("hidden", true);
}

// Function to toggle the theme
function toggleTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    document.getElementById("dark-icon").setAttribute("hidden", true);
    document.getElementById("light-icon").removeAttribute("hidden");
    localStorage.theme = "light";
  } else {
    document.documentElement.classList.add("dark");
    document.getElementById("light-icon").setAttribute("hidden", true);
    document.getElementById("dark-icon").removeAttribute("hidden");
    localStorage.theme = "dark";
  }
}

// Add event listener to the button
document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

