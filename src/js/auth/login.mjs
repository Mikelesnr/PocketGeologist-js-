export function renderLoginPopup() {
  return `
    <div class="popup-content">
      <h2>Login</h2>
      <input type="text" id="login-username" placeholder="Username" required>
      <input type="password" id="login-password" placeholder="Password" required>
      <button id="login-submit">Login</button>
    </div>
  `;
}
