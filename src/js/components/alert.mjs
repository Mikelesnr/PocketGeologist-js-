export function showNotification(message, type = "success") {
  let notification = document.getElementById("notification-container");

  // Ensure notification container exists
  if (!notification) {
    console.error(
      "Notification container not found. Make sure it's in your HTML."
    );
    return;
  }

  // Apply message and styling
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = "block";
  notification.style.opacity = "1";

  // Auto-hide after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => (notification.style.display = "none"), 500);
  }, 3000);
}
