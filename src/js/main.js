import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";
import { initGallery } from "./gallery.mjs";
import { openPopup } from "./components/popup.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderNav();
  renderFooter();
});

initGallery();
