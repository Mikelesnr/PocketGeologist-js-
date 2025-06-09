export function showNotification(message, type = "success") {
  const notification = document.getElementById("notification-container");
  if (!notification) {
    console.error("Notification container not found.");
    return;
  }

  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = "block";
  notification.style.opacity = "1";

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => (notification.style.display = "none"), 500);
  }, 3000);
}
