import { buildHTML, renderElement } from "../utils.mjs";

export function renderNav() {
  const navHTML = buildHTML(
    "nav",
    { class: "main-nav" },
    `
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/minerals">All Minerals</a></li>
            <li><a href="/collection">My Collection</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        `
  );

  renderElement(".nav-container", navHTML);
}
