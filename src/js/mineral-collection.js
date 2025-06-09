import { getUserCollection, paginateCollection } from "./mineralCollection.mjs";
import { createMineralCard } from "./utils.mjs";
import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";
import { showNotification } from "./components/alert.mjs"; // ✅ Import notification system

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
  const loggedInUser = localStorage.getItem("loggedInUser");

  // ✅ Show error if user is not logged in
  if (!loggedInUser) {
    showNotification(
      "You need to be logged in to see your collection!",
      "error"
    );
    return;
  }

  const collection = getUserCollection();
  const { items, totalPages } = paginateCollection(
    collection,
    currentPage,
    itemsPerPage
  );

  // ✅ Show warning if collection is empty
  if (collection.length === 0) {
    showNotification(
      "Your collection is empty. Please add minerals!",
      "warning"
    );
  }

  // Set collection owner title
  document.querySelector("h1").textContent = loggedInUser
    ? `${loggedInUser}'s Mineral Collection`
    : "Your Mineral Collection";

  // Clear previous content
  collectionContainer.innerHTML = "";
  paginationContainer.innerHTML = ""; // Ensure pagination is injected separately

  // Use `createMineralCard()` for rendering
  items.forEach((mineral) => {
    const mineralCard = createMineralCard(mineral);
    collectionContainer.appendChild(mineralCard);
  });

  // Inject Pagination Separately
  paginationContainer.innerHTML = `
    <button id="prev-page" class="btn" ${
      currentPage === 1 ? "disabled" : ""
    }>Prev</button>
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
