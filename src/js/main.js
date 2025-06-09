import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";
import { closePopup } from "./auth/auth.mjs";
import { initGallery } from "./gallery.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderNav();
  renderFooter();
});

initGallery();
