import { renderMineralList } from "./mineralList.mjs";
import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";
import { showNotification } from "./components/alert.mjs"; // ✅ Import notification system

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderNav();
  renderFooter();

  // Retrieve stored page if available
  const storedPage = localStorage.getItem("currentPage");
  currentPage = storedPage ? parseInt(storedPage, 10) : 1;

  updateMineralPage(currentPage);
});

let currentPage = 1;
let nextPageUrl = null;
let previousPageUrl = null;

async function updateMineralPage(page = currentPage) {
  currentPage = page > 616 ? 616 : page < 1 ? 1 : page; // Ensure page is within valid range

  // Store current page for persistence
  localStorage.setItem("currentPage", currentPage);

  const pageNumberDisplay = document.querySelector("#page-number");
  const prevButton = document.querySelector("#prev-page");
  const nextButton = document.querySelector("#next-page");

  pageNumberDisplay.textContent = `Page ${currentPage}`;

  const { nextPage, previousPage } = await renderMineralList(currentPage);
}

//**Handle Next & Previous navigation**
document.querySelector("#next-page").addEventListener("click", () => {
  if (nextPageUrl) {
    updateMineralPage(currentPage + 1);
  }
});

document.querySelector("#prev-page").addEventListener("click", () => {
  if (previousPageUrl) {
    updateMineralPage(currentPage - 1);
  }
});

//**Handle Manual Page Selection**
document.querySelector("#go-to-page").addEventListener("click", () => {
  const pageInput = document.querySelector("#page-input").value;
  const pageNumber = parseInt(pageInput, 10);

  if (!isNaN(pageNumber) && pageNumber > 0) {
    updateMineralPage(pageNumber);
  } else {
    showNotification("Please enter a valid page number!", "error"); // Replace alert
  }
});
