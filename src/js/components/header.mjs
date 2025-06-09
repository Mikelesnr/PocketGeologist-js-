import { buildHTML, renderElement } from "../utils.mjs";
import { logoutUser } from "../auth/auth.mjs";
import { openPopup } from "./popup.mjs";
import { renderNav } from "./nav.mjs";

export function renderHeader() {
  const loggedInUser = localStorage.getItem("loggedInUser"); // Get the current logged-in username
  const users = JSON.parse(localStorage.getItem("users")) || {}; // Retrieve all users
  const user = loggedInUser ? users[loggedInUser] : null; // Find the specific logged-in user's data

  // Remove any existing header before re-rendering
  document.querySelector(".header-container").innerHTML = "";

  const headerHTML = buildHTML(
    "header",
    { class: "main-header" },
    `
      <div class="header-content">
        <img src="/images/site/logo.png" alt="Pocket Geologist Logo" class="site-logo">
        <div class="auth-links" style="display: ${
          loggedInUser ? "none" : "flex"
        };">
          <a href="#" id="login-btn">Sign In</a>
          <a href="#" id="register-btn">Sign Up</a>
        </div>
        <div class="user-info" style="display: ${
          loggedInUser ? "flex" : "none"
        };">
          <span>${loggedInUser ? loggedInUser : ""}</span>
          <button id="logout-btn" class="logout-btn">Logout</button>
        </div>
      </div>
      <nav class="nav-container"></nav>
      <div id="notification-container" class="notification-container"></div>
    `
  );

  renderElement(".header-container", headerHTML);

  // Attach event listeners AFTER the DOM is fully loaded
  setTimeout(() => {
    document.getElementById("logout-btn")?.addEventListener("click", () => {
      logoutUser();
      renderHeader(); // Refresh UI after logout
      renderNav(); // Refresh navigation after logout
    });

    document
      .getElementById("login-btn")
      ?.addEventListener("click", () => openPopup("login-popup"));
    document
      .getElementById("register-btn")
      ?.addEventListener("click", () => openPopup("register-popup"));
  }, 0);
}
