import { buildHTML, renderElement } from "../utils.mjs";

export function renderNav() {
  const navHTML = buildHTML(
    "nav",
    { class: "main-nav" },
    `
      <button id="menu-toggle" class="menu-toggle">&#9776;</button>
      <ul id="nav-menu" class="nav-menu hide-nav">
        <li><a href="/">Home</a></li>
        <li><a href="/mineral_listing/index.html">All Minerals</a></li>
        <li><a href="/mineral_collection/index.html">My Collection</a></li>
        <li><a href="/about/index.html">About Us</a></li>
        <li><a href="/contact/index.html">Contact</a></li>
      </ul>
    `
  );

  renderElement(".nav-container", navHTML);

  // ✅ Add toggle functionality for mobile menu
  document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("nav-menu").classList.toggle("hide-nav");
  });
}
