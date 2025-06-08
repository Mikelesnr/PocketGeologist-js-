export function createMineralCard(mineral) {
  const card = document.createElement("div");
  card.classList.add("mineral-card");

  // Mineral image
  const img = document.createElement("img");
  img.src = `/images/minerals/${mineral.name.replace(/\s+/g, "_")}.jpg`;
  img.alt = mineral.name;
  img.classList.add("mineral-image");

  // Mineral name
  const title = document.createElement("h2");
  title.textContent = mineral.name;

  // Mineral formula
  const formula = document.createElement("p");
  formula.innerHTML = `Formula: ${mineral.ima_formula}`;

  // Discovery year
  const discoveryYear = document.createElement("p");
  discoveryYear.textContent = `Discovered: ${
    mineral.discovery_year || "Unknown"
  }`;

  // Short description
  const description = document.createElement("p");
  description.innerHTML =
    mineral.description_short || "No description available.";

  // Append elements
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(formula);
  card.appendChild(discoveryYear);
  card.appendChild(description);

  return card;
}

export async function getAllMinerals(page = 1) {
  const apiUrl = `https://api.mindat.org/v1/minerals-ima/?page=${page}&tokenAuth=${
    import.meta.env.VITE_API_TOKEN
  }`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    console.log("API Response:", data); // Debugging

    return {
      minerals: data.results || [],
      nextPage: data.next || null,
      previousPage: data.previous || null,
    };
  } catch (error) {
    console.error(`Error fetching minerals (Page ${page}):`, error);
    return { minerals: [], nextPage: null, previousPage: null };
  }
}

export async function getMineralsByNamesOrIds({ names = [], ids = [] }) {
  const baseUrl = `https://api.mindat.org/v1/minerals-ima/?tokenAuth=${
    import.meta.env.VITE_API_TOKEN
  }`;
  const results = [];

  try {
    if (names.length > 0) {
      // Fetch minerals by names
      for (const name of names) {
        const formattedName =
          name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const response = await fetch(
          `${baseUrl}&name=${encodeURIComponent(formattedName)}`
        );

        if (response.ok) {
          const data = await response.json();
          const mineral = data.results?.[0]; // Extract the first result
          if (mineral) {
            results.push(mineral);
          } else {
            console.warn(`No data found for mineral: ${formattedName}`);
          }
        } else {
          console.warn(`Failed to fetch mineral: ${formattedName}`);
        }
      }
    } else if (ids.length > 0) {
      // Fetch minerals by IDs
      for (const id of ids) {
        const response = await fetch(`${baseUrl}&id=${id}`);

        if (response.ok) {
          const data = await response.json();
          const mineral = data.results?.[0]; // Extract the first result
          if (mineral) {
            results.push(mineral);
          } else {
            console.warn(`No data found for ID: ${id}`);
          }
        } else {
          console.warn(`Failed to fetch mineral with ID: ${id}`);
        }
      }
    } else {
      throw new Error("Please provide either names or IDs.");
    }

    return results;
  } catch (error) {
    console.error("Error fetching minerals:", error);
    return [];
  }
}

// Function to build an HTML element dynamically
export function buildHTML(tag, attributes = {}, content = "") {
  const element = document.createElement(tag);

  // Set attributes dynamically
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );

  // Set inner content
  element.innerHTML = content;

  return element;
}

// Function to render an element inside a parent container
export function renderElement(parentSelector, element) {
  const parent = document.querySelector(parentSelector);
  if (parent) {
    parent.appendChild(element);
    console.log(`Successfully added element to ${parentSelector}`);
  } else {
    console.error(`Parent element "${parentSelector}" not found!`);
  }
}
