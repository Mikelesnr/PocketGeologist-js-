import { renderMineralList } from "./mineralList.mjs";
import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";

renderHeader();
renderNav();
renderFooter();

let currentPage = 1;
let nextPageUrl = null;
let previousPageUrl = null;

async function updateMineralPage() {
  const pageNumberDisplay = document.querySelector("#page-number");
  const prevButton = document.querySelector("#prev-page");
  const nextButton = document.querySelector("#next-page");

  pageNumberDisplay.textContent = `Page ${currentPage}`;

  const { nextPage, previousPage } = await renderMineralList(currentPage);

  nextPageUrl = nextPage;
  previousPageUrl = previousPage;

  prevButton.disabled = !previousPageUrl;
  nextButton.disabled = !nextPageUrl;
}

// Pagination Handling
document.querySelector("#next-page").addEventListener("click", () => {
  if (nextPageUrl) {
    currentPage++;
    updateMineralPage();
  }
});

document.querySelector("#prev-page").addEventListener("click", () => {
  if (previousPageUrl) {
    currentPage--;
    updateMineralPage();
  }
});

// Initial Render
updateMineralPage();
