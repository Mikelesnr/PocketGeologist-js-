import { renderMineral } from "./mineralDetails.mjs";
import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader(); // Ensures UI updates on page load
  renderNav();
  renderFooter();
});
renderMineral();
