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