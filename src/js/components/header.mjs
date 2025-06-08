import { buildHTML, renderElement } from "../utils.mjs";

export function renderHeader() {
  const headerHTML = buildHTML(
    "header",
    { class: "main-header" }, // Correctly targets header
    `
        <div class="header-content"> <!-- Changed from header-container -->
            <img src="/images/site/logo.png" alt="Pocket Geologist Logo" class="site-logo">
            <div class="auth-links">
                <a href="/signin">Sign In</a>
                <a href="/signup">Sign Up</a>
            </div>
        </div>
        <nav class="nav-container"></nav>
    `
  );

  renderElement(".header-container", headerHTML); // Targets the correct element
}
