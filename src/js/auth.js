import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";
import { setupAuthHandlers } from "./authHandlers.mjs"; // Authentication logic

// Inject dynamic elements
document.body.prepend(renderHeader());
document.body.appendChild(renderNav());
document.body.appendChild(renderFooter());

// Attach authentication event listeners
setupAuthHandlers();
