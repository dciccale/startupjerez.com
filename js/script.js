// Select all elements with data-en attribute for text content
const textElements = document.querySelectorAll('[data-en]');

// Function to change language
function changeLanguage(language) {
  textElements.forEach(el => {
    if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
      if (language === "EN") {
        el.setAttribute('placeholder', el.getAttribute('data-en'));
      } else {
        el.setAttribute('placeholder', el.defaultPlaceholder); // fallback to the default placeholder in HTML
      }
    } else {
      if (language === "EN") {
        el.textContent = el.getAttribute('data-en');
      } else {
        el.textContent = el.defaultText; // fallback to the default content in HTML
      }
    }
  });

  localStorage.setItem('selectedLanguage', language);
}

// Save default text and placeholders
textElements.forEach(el => {
  if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
    el.defaultPlaceholder = el.getAttribute('placeholder');
  } else {
    el.defaultText = el.textContent;
  }
});

// Event listener for language change
document.querySelector('#language').addEventListener("change", function() {
  changeLanguage(this.value);
});

// Set initial language on page load
window.addEventListener('load', () => {
  const savedLanguage = localStorage.getItem('selectedLanguage') || 'ES';
  document.querySelector('#language').value = savedLanguage;
  changeLanguage(savedLanguage);
});


// Open mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu-2');

    toggleButton.addEventListener('click', function() {
        menu.classList.toggle('hidden');
    });
});


// THEME DARK LIGHT

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
  document.getElementById('dark-icon').removeAttribute('hidden');
  document.getElementById('light-icon').setAttribute('hidden', true);
} else {
  document.documentElement.classList.remove('dark');
  document.getElementById('light-icon').removeAttribute('hidden');
  document.getElementById('dark-icon').setAttribute('hidden', true);
}

// Function to toggle the theme
function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    document.getElementById('dark-icon').setAttribute('hidden', true);
    document.getElementById('light-icon').removeAttribute('hidden');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    document.getElementById('light-icon').setAttribute('hidden', true);
    document.getElementById('dark-icon').removeAttribute('hidden');
    localStorage.theme = 'dark';
  }
}

// Add event listener to the button
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);