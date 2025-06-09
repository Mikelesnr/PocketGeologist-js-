import { buildHTML, renderElement, getMineralsByNamesOrIds } from "./utils.mjs";

export async function initGallery() {
  const galleryContainer = document.querySelector(".gallery-container");
  galleryContainer.innerHTML = ""; // Clear previous content

  const homeGalleryMinerals = [
    "Quartz",
    "Muscovite",
    "Galena",
    "Pyrite",
    "Calcite",
    "Fluorite",
    "Microcline",
    "Stibnite",
  ];

  // Check localStorage first
  let minerals = JSON.parse(localStorage.getItem("cachedMinerals"));

  if (!minerals) {
    minerals = await getMineralsByNamesOrIds({ names: homeGalleryMinerals });

    // Cache the fetched minerals to improve home page performance after the first load
    localStorage.setItem("cachedMinerals", JSON.stringify(minerals));
  }

  if (!minerals || minerals.length === 0) {
    galleryContainer.innerHTML = "<p>No minerals found.</p>";
    return;
  }

  const fragment = document.createDocumentFragment();

  minerals.forEach((mineral) => {
    const mineralImagePath = `/images/minerals/${mineral.name}.jpg`;
    const defaultImagePath = "/images/minerals/default.jpg";

    const imgElement = document.createElement("img");
    imgElement.src = mineralImagePath;
    imgElement.alt = mineral.name;

    // Check if the image exists by catching load errors
    imgElement.onerror = function () {
      this.src = defaultImagePath;
    };

    //Wrap the mineral card inside a clickable `<a>` tag
    const mineralCard = buildHTML(
      "a",
      {
        class: "mineral-card",
        href: `/mineral_page/index.html?name=${encodeURIComponent(
          mineral.name
        )}`,
      },
      `
        ${imgElement.outerHTML} <!-- Dynamically inserted image -->
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

  renderElement(".gallery-container", fragment);

  console.log("Home gallery populated with clickable minerals.");
}
