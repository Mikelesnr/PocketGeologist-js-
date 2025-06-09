export function openPopup(id) {
  console.log(`Trying to open popup: ${id}`);
  const popup = document.getElementById(id);
  if (popup) {
    popup.classList.remove("hidden");
    popup.style.display = "block";
    console.log(`Popup ${id} opened successfully`);
  } else {
    console.error(`Popup with ID '${id}' not found.`);
  }
}

export function closePopup(id) {
  console.log(`Trying to close popup: ${id}`);
  const popup = document.getElementById(id);
  if (popup) {
    popup.classList.add("hidden");
    popup.style.display = "none";
    console.log(`Popup ${id} closed successfully`);
  } else {
    console.error(`Popup with ID '${id}' not found.`);
  }
}
