document.addEventListener('DOMContentLoaded', function () {
    const textElements = document.querySelectorAll('[data-en]');
    const spinner = document.getElementById('spinner');
    const form = document.getElementById('contact-form');
    const dialog = document.getElementById('submissionModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const modalCloseButton = document.getElementById('modalCloseButton');
  
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
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Show spinner
      spinner.classList.remove('hidden');
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
  
      const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY; // Access the environment variable
      const baseId = 'app1wO4gKmNIuRXxn'; // Replace with your Airtable base ID
      const tableId = 'tbllFn4iyXdZfH3kR'; // Replace with your Airtable table ID or name
  
      const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
  
      const data = {
        records: [
          {
            fields: {
              Name: name,
              Email: email,
              Subject: subject,
              Message: message
            }
          }
        ]
      };
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          dialog.showModal();
          form.reset();
        })
        .catch(error => {
          console.error('Error:', error);
          dialog.showModal();
        })
        .finally(() => {
          // Hide spinner
          spinner.classList.add('hidden');
        });
    });
  
    closeModalButton.addEventListener('click', () => {
      dialog.close();
    });
  
    modalCloseButton.addEventListener('click', () => {
      dialog.close();
    });
  });
  