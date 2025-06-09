import { closePopup } from "../components/popup.mjs";
import { showNotification } from "../components/alert.mjs";
import { renderHeader } from "../components/header.mjs";
import { renderNav } from "../components/nav.mjs";
import { renderLoginPopup } from "./login.mjs";
import { renderRegisterPopup } from "./register.mjs";

// Ensure popups are injected on page load
document.addEventListener("DOMContentLoaded", () => {
  const loginPopupContainer = document.getElementById("login-popup");
  const registerPopupContainer = document.getElementById("register-popup");

  if (loginPopupContainer && registerPopupContainer) {
    console.log("Popups found, injecting forms...");
    loginPopupContainer.innerHTML = renderLoginPopup();
    registerPopupContainer.innerHTML = renderRegisterPopup();

    setTimeout(() => {
      document.getElementById("login-submit")?.addEventListener("click", () => {
        console.log("Login button clicked");
        loginUser();
      });

      document
        .getElementById("register-submit")
        ?.addEventListener("click", () => {
          console.log("Register button clicked");
          registerUser();
        });
    }, 100);
  } else {
    console.error("Popup containers not found in the DOM");
  }
});

// outside click functionality to close popups
document.addEventListener("click", (event) => {
  const loginPopup = document.getElementById("login-popup");
  const registerPopup = document.getElementById("register-popup");

  if (
    loginPopup &&
    !loginPopup.contains(event.target) &&
    registerPopup &&
    !registerPopup.contains(event.target) &&
    !event.target.closest(".auth-links")
  ) {
    closePopup("login-popup");
    closePopup("register-popup");
  }
});

// User Registration
export function registerUser() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value;

  if (!username || !password) {
    showNotification("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) {
    showNotification("Username already exists. Try a different one.");
    return;
  }

  users[username] = { password: btoa(password) };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", username);

  showNotification("Registration successful!");
  closePopup("register-popup");

  renderHeader();
}

// User Login
export function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[username] || users[username].password !== btoa(password)) {
    showNotification(
      "Invalid username or password. Please try again.",
      "error"
    );
    return;
  }

  localStorage.setItem("loggedInUser", username);
  showNotification(`Welcome back, ${username}!`);
  closePopup("login-popup");

  renderHeader();
  renderNav();
}

//Logout Functionality
export function logoutUser() {
  localStorage.removeItem("loggedInUser");
  renderHeader(); // Refresh header after logout
  renderNav(); // Refresh navigation
}
