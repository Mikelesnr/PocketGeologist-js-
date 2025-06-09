import { buildHTML, renderElement } from "../utils.mjs";
import { openPopup, logoutUser } from "../auth/auth.mjs";
import { renderNav } from "./nav.mjs";

export function renderHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("loggedInUser"); // Check actual login status

  //Remove any existing header before re-rendering
  document.querySelector(".header-container").innerHTML = "";

  const headerHTML = buildHTML(
    "header",
    { class: "main-header" },
    `
      <div class="header-content">
        <img src="/images/site/logo.png" alt="Pocket Geologist Logo" class="site-logo">
        <div class="auth-links" style="display: ${
          isLoggedIn ? "none" : "flex"
        };">
          <a href="#" id="login-btn">Sign In</a>
          <a href="#" id="register-btn">Sign Up</a>
        </div>
        <div class="user-info" style="display: ${
          isLoggedIn ? "flex" : "none"
        };">
          <span>Welcome, ${isLoggedIn ? user?.username : ""}!</span>
          <button id="logout-btn">Logout</button>
        </div>
      </div>
      <nav class="nav-container"></nav>
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
