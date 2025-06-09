import { getMineralsByNamesOrIds } from "./utils.mjs";

export async function renderMineral() {
  const urlParams = new URLSearchParams(window.location.search);
  const mineralName = urlParams.get("name");

  if (!mineralName) {
    console.error("No mineral name provided in URL");
    document.querySelector("#mineral-container").innerHTML =
      "<p>Mineral not found.</p>";
    return;
  }

  try {
    const minerals = await getMineralsByNamesOrIds({ names: [mineralName] });

    if (minerals.length === 0) {
      console.warn("Mineral not found.");
      document.querySelector("#mineral-container").innerHTML =
        "<p>Mineral not found.</p>";
      return;
    }

    const mineral = minerals[0];
    const isLoggedIn = localStorage.getItem("loggedInUser"); // Check if user is logged in

    document.querySelector("#mineral-container").innerHTML = `
      <section class="mineral-detail">
        <h1>${mineral.name}</h1>
        <img src="/images/minerals/${mineral.name}.jpg" alt="${mineral.name}">
        <p><strong>IMA Formula:</strong> ${
          mineral.ima_formula || "Not Available"
        }</p>
        <p><strong>IMA Symbol:</strong> ${mineral.ima_symbol || "N/A"}</p>
        <p><strong>IMA Year:</strong> ${mineral.ima_year || "Unknown"}</p>
        <p><strong>Discovery Year:</strong> ${
          mineral.discovery_year || "Not Available"
        }</p>
        <p><strong>Status:</strong> ${
          mineral.ima_status?.join(", ") || "Not Available"
        }</p>
        <p><strong>Type Specimen Store:</strong> ${
          mineral.type_specimen_store || "Not Listed"
        }</p>
        <p><strong>Description:</strong> ${
          mineral.description_short || "No description provided."
        }</p>

        ${
          isLoggedIn
            ? `<button id="add-to-collection" class="collection-btn">Add to Collection</button>`
            : ""
        }
      </section>
    `;

    if (isLoggedIn) {
      document
        .getElementById("add-to-collection")
        .addEventListener("click", () => addToCollection(mineral));
    }
  } catch (error) {
    console.error("Error rendering mineral:", error);
    document.querySelector("#mineral-container").innerHTML =
      "<p>Error loading mineral data.</p>";
  }
}

// Function to Add Mineral to Collection
function addToCollection(mineral) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("You need to be logged in to add minerals!");
    return;
  }

  let allCollections =
    JSON.parse(localStorage.getItem("mineralCollections")) || {};
  let userCollection = allCollections[loggedInUser] || [];

  // ✅ Check for existing mineral and exit early
  if (userCollection.find((item) => item.id === mineral.id)) {
    alert(`${mineral.name} is already in your collection.`);
    return;
  }

  // ✅ Add mineral if it isn't already in collection
  userCollection.push(mineral);
  allCollections[loggedInUser] = userCollection;
  localStorage.setItem("mineralCollections", JSON.stringify(allCollections));
  alert(`${mineral.name} added to your collection!`);
}
