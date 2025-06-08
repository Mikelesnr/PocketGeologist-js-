import { buildHTML, renderElement } from "../utils.mjs";

export function renderNav() {
  const navHTML = buildHTML(
    "nav",
    { class: "main-nav" },
    `
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/mineral_listing/index.html">All Minerals</a></li>
            <li><a href="/mineral_collection/index.html">My Collection</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        `
  );

  renderElement(".nav-container", navHTML);
}
