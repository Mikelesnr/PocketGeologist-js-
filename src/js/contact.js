import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";
import { showNotification } from "./components/alert.mjs";
import emailjs from "emailjs-com";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderNav();
  renderFooter();
});

document.addEventListener("DOMContentLoaded", () => {
  emailjs.init(`${import.meta.env.VITE_USER_ID}`);
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs
        .sendForm(
          `${import.meta.env.VITE_SERVICE_ID}`,
          `${import.meta.env.VITE_TEMPLATE_ID}`,
          this
        )
        .then((response) => {
          console.log("SUCCESS!", response);
          showNotification(
            "Your message has been sent successfully!",
            "success"
          );
        })
        .catch((error) => {
          console.error("FAILED...", error);
          showNotification(
            "Failed to send message. Please try again.",
            "error"
          );
        });
    });
});
