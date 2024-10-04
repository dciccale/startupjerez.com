(async () => {
  const darkIcon = document.getElementById("dark-icon");
  const lightIcon = document.getElementById("light-icon");

  function isDarkModePreferred() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function isDarkMode() {
    const savedTheme = localStorage.theme;
    return savedTheme === "dark" || (!savedTheme && isDarkModePreferred());
  }

  const modes = {
    dark: {
      showIcon: darkIcon,
      hideIcon: lightIcon,
    },
    light: {
      showIcon: lightIcon,
      hideIcon: darkIcon,
    },
  };

  function setMode(mode) {
    const { showIcon, hideIcon } = modes[mode];
    showIcon.removeAttribute("hidden");
    hideIcon.setAttribute("hidden", true);
  }

  if (isDarkMode()) {
    setMode("dark");
  } else {
    setMode("light");
  }

  // Function to toggle the theme
  function toggleTheme() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setMode("light");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      setMode("dark");
      localStorage.theme = "dark";
    }
  }

  // Add event listener to the button
  document
    .getElementById("toggle-theme")
    .addEventListener("click", toggleTheme);
})();
