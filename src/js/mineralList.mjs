import { buildHTML, renderElement, getAllMinerals } from "./utils.mjs";

export async function renderMineralList(page = 1) {
  const mineralsContainer = document.querySelector("#minerals-container");
  mineralsContainer.innerHTML = ""; // Clear previous content

  const { minerals, nextPage, previousPage } = await getAllMinerals(page);

  if (!minerals || minerals.length === 0) {
    mineralsContainer.innerHTML = "<p>No minerals found.</p>";
    return;
  }

  const fragment = document.createDocumentFragment();

  minerals.forEach((mineral) => {
    const mineralImagePath = `/images/minerals/${mineral.name.replace(
      /\s+/g,
      "_"
    )}.jpg`;
    const defaultImagePath = "/images/minerals/default.jpg";

    const imgElement = document.createElement("img");
    imgElement.src = mineralImagePath;
    imgElement.alt = mineral.name;
    imgElement.onerror = function () {
      this.src = defaultImagePath;
    };

    const mineralCard = buildHTML(
      "a",
      {
        class: "mineral-card",
        href: `/mineral_page/index.html?name=${encodeURIComponent(
          mineral.name
        )}`,
      },
      `
                ${imgElement.outerHTML}
                <div class="card-content">
                    <h3>${mineral.name}</h3>
                    <p>Formula: ${mineral.ima_formula || "Unknown"}</p>
                    <p>Discovered: ${mineral.discovery_year || "N/A"}</p>
                    <!-- <p>${
                      mineral.description_short || "No description available."
                    }</p> -->
                </div>
            `
    );

    fragment.appendChild(mineralCard);
  });

  renderElement("#minerals-container", fragment);

  //Preserve Next & Previous functionality
  document.querySelector("#page-number").textContent = `Page ${page}`;
  document.querySelector("#prev-page").disabled = !previousPage;
  document.querySelector("#next-page").disabled = !nextPage;

  return { nextPage, previousPage };
}

//Page Selection Logic (Ensures It Works Without Breaking Pagination)
document.querySelector("#go-to-page").addEventListener("click", () => {
  const pageInput = document.querySelector("#page-input").value;
  let pageNumber = parseInt(pageInput, 10);

  if (!isNaN(pageNumber)) {
    //Ensure page is within valid range
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > 616) pageNumber = 616;

    updateMineralPage(pageNumber);
  } else {
    alert("Please enter a valid page number!");
  }
});

//Next & Previous Page Logic
document.querySelector("#next-page").addEventListener("click", () => {
  const currentPage = parseInt(
    document.querySelector("#page-number").textContent.replace("Page ", ""),
    10
  );
  renderMineralList(currentPage + 1);
});

document.querySelector("#prev-page").addEventListener("click", () => {
  const currentPage = parseInt(
    document.querySelector("#page-number").textContent.replace("Page ", ""),
    10
  );
  if (currentPage > 1) {
    renderMineralList(currentPage - 1);
  }
});
