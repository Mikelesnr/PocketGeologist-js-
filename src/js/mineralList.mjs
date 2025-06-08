import { buildHTML, renderElement, getAllMinerals } from "./utils.mjs";

export async function renderMineralList(page = 1, append = false) {
  const mineralsContainer = document.querySelector("#minerals-container");

  if (!append) {
    mineralsContainer.innerHTML = ""; // Clear only if loading a new full page
  }

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
      "div",
      { class: "mineral-card" },
      `
                ${imgElement.outerHTML}
                <div class="card-content">
                    <h3>${mineral.name}</h3>
                    <p>Formula: ${mineral.ima_formula || "Unknown"}</p>
                    <p>Discovered: ${mineral.discovery_year || "N/A"}</p>
                    <p>${
                      mineral.description_short || "No description available."
                    }</p>
                </div>
            `
    );

    fragment.appendChild(mineralCard);
  });

  renderElement("#minerals-container", fragment);

  return { nextPage, previousPage };
}
