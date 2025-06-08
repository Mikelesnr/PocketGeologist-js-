import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";
import { initGallery } from "./gallery.mjs";

renderHeader();
renderNav();
renderFooter();

initGallery();

// Ensure gallery renders only on the home page
// if (document.querySelector("#gallery-container")) {
//     initGallery();
// }
