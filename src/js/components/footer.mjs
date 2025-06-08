import { buildHTML, renderElement } from "../utils.mjs";

export function renderFooter() {
  const footerHTML = buildHTML(
    "footer",
    { class: "main-footer" },
    `
        <div class="footer-content">
            <div class="footer-logo">
                <img src="/images/site/logo.png" alt="Pocket Geologist">
            </div>
            <div class="footer-links">
                <ul>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/about">About Us</a></li>
                </ul>
            </div>
            <div class="footer-info">
                <p>Created by <strong>Michael Mwanza</strong></p>
                <p>&copy; 2025 Pocket Geologist. All rights reserved.</p>
            </div>
        </div>
        `
  );

  renderElement(".footer-container", footerHTML);
}
