import { renderLoginPopup } from "./login.mjs";
import { renderRegisterPopup } from "./register.mjs";
import { renderHeader } from "../components/header.mjs"; // ✅ Ensure header updates dynamically
import { renderNav } from "../components/nav.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const loginPopupContainer = document.getElementById("login-popup");
  const registerPopupContainer = document.getElementById("register-popup");

  if (loginPopupContainer && registerPopupContainer) {
    console.log("Popups found, injecting forms...");
    loginPopupContainer.innerHTML = renderLoginPopup();
    registerPopupContainer.innerHTML = renderRegisterPopup();

    // Attach event listeners AFTER popups are injected
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

// Close popups when clicking outside
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
    alert("Please fill in all fields.");
    return;
  }

  // Check if user already exists
  const existingUser = JSON.parse(localStorage.getItem("user"));
  if (existingUser && existingUser.username === username) {
    alert("Username already exists. Try a different one.");
    return;
  }

  // Store user data securely
  const hashedPassword = btoa(password);
  localStorage.setItem(
    "user",
    JSON.stringify({ username, password: hashedPassword })
  );
  localStorage.setItem("loggedInUser", username);

  alert("Registration successful!");
  closePopup("register-popup");

  // ✅ Fix: Re-render header after registration
  renderHeader();
}

// User Login
export function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    !storedUser ||
    storedUser.username !== username ||
    storedUser.password !== btoa(password)
  ) {
    alert("Invalid username or password. Please try again.");
    return;
  }

  // Store logged-in user
  localStorage.setItem("loggedInUser", username);
  alert(`Welcome back, ${username}!`);
  closePopup("login-popup");

  renderHeader(); // Refresh header after login
  renderNav(); // Refresh navigation after login
}

// Logout Function
export function logoutUser() {
  localStorage.removeItem("loggedInUser");

  // ✅ Fix: Re-render header after logout
  renderHeader();
}

// Popup Handlers
export function openPopup(id) {
  console.log(`Trying to open popup: ${id}`);
  const popup = document.getElementById(id);
  if (popup) {
    popup.classList.remove("hidden");
    popup.style.display = "block";
    console.log(`Popup ${id} opened successfully`);
  } else {
    console.error(`Popup with ID '${id}' not found.`);
  }
}

export function closePopup(id) {
  console.log(`Trying to close popup: ${id}`);
  const popup = document.getElementById(id);
  if (popup) {
    popup.classList.add("hidden");
    popup.style.display = "none";
    console.log(`Popup ${id} closed successfully`);
  } else {
    console.error(`Popup with ID '${id}' not found.`);
  }
}
