import { getUserCollection, paginateCollection } from "./mineralCollection.mjs";
import { createMineralCard } from "./utils.mjs";
import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderNav();
  renderFooter();
  renderMineralCollection();
});

let currentPage = 1;
const itemsPerPage = 10;

function renderMineralCollection() {
  const collectionContainer = document.getElementById("collection-container");
  const paginationContainer = document.getElementById("pagination-container");
  const collection = getUserCollection();
  const { items, totalPages } = paginateCollection(
    collection,
    currentPage,
    itemsPerPage
  );

  // Set collection owner title
  const loggedInUser = localStorage.getItem("loggedInUser");
  document.querySelector("h1").textContent = loggedInUser
    ? `${loggedInUser}'s Mineral Collection`
    : "Your Mineral Collection";

  // Clear previous content
  collectionContainer.innerHTML = "";
  paginationContainer.innerHTML = ""; //Ensure pagination is injected separately

  //Use `createMineralCard()` for rendering
  items.forEach((mineral) => {
    const mineralCard = createMineralCard(mineral);
    collectionContainer.appendChild(mineralCard);
  });

  //Inject Pagination Separately
  paginationContainer.innerHTML = `
    <button id="prev-page" class="btn" ${
      currentPage === 1 ? "disabled" : ""
    }>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button id="next-page" class="btn" ${
      currentPage === totalPages ? "disabled" : ""
    }>Next</button>
  `;

  // Pagination Event Handlers
  document.getElementById("prev-page")?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderMineralCollection();
    }
  });

  document.getElementById("next-page")?.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderMineralCollection();
    }
  });
}
