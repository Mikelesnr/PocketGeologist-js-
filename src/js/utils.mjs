export function createMineralCard(mineral) {
  // Create anchor tag for navigation
  const link = document.createElement("a");
  link.href = `/mineral_page/index.html?name=${encodeURIComponent(
    mineral.name
  )}`;
  link.classList.add("mineral-link"); // Optional: Add a class for styling

  // Create card container
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

  // Append elements to card
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(formula);
  card.appendChild(discoveryYear);

  // Wrap card inside anchor tag
  link.appendChild(card);

  return link;
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
      for (const name of names) {
        const formattedName =
          name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const response = await fetch(
          `${baseUrl}&name=${encodeURIComponent(formattedName)}`
        );

        if (response.ok) {
          const data = await response.json();
          const mineral = data.results?.[0]; // Extract first result
          if (mineral) {
            results.push(mineral);
          } else {
            console.warn(`No data found for mineral: ${formattedName}`);
          }
        } else {
          console.warn(`Failed to fetch mineral: ${formattedName}`);
        }
      }
    }

    if (ids.length > 0) {
      for (const id of ids) {
        const response = await fetch(`${baseUrl}&id=${encodeURIComponent(id)}`);

        if (response.ok) {
          const data = await response.json();
          const mineral = data?.results?.find((m) => m.id == id); // ✅ Ensure correct ID match
          if (mineral) {
            results.push(mineral);
          } else {
            console.warn(`No data found for ID: ${id}`);
          }
        } else {
          console.warn(`Failed to fetch mineral with ID: ${id}`);
        }
      }
    }

    if (results.length === 0) {
      console.warn("No valid minerals found with provided names or IDs.");
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
