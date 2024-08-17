document.addEventListener("DOMContentLoaded", function () {
  const spinner = document.getElementById("spinner");
  const form = document.getElementById("contact-form");
  const dialog = document.getElementById("submissionModal");
  const closeModalButton = document.getElementById("closeModalButton");
  const modalCloseButton = document.getElementById("modalCloseButton");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Show spinner
    spinner.classList.remove("hidden");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const apiKey =
      "patNCwtCHhEnPq1xg.b6b938f88fa5de4ca3adfffd8ed323dd5e385a18c83882f0483cfb94ef742039"; // Access the environment variable
    const baseId = "app1wO4gKmNIuRXxn"; // Replace with your Airtable base ID
    const tableId = "tbllFn4iyXdZfH3kR"; // Replace with your Airtable table ID or name

    const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

    const data = {
      records: [
        {
          fields: {
            Name: name,
            Email: email,
            Subject: subject,
            Message: message,
          },
        },
      ],
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        dialog.showModal();
        form.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        dialog.showModal();
      })
      .finally(() => {
        // Hide spinner
        spinner.classList.add("hidden");
      });
  });

  closeModalButton.addEventListener("click", () => {
    dialog.close();
  });

  modalCloseButton.addEventListener("click", () => {
    dialog.close();
  });
});

