export function renderRegisterPopup() {
  return `
    <div class="popup-content">
      <h2>Sign Up</h2>
      <input type="text" id="register-username" placeholder="Username" required>
      <input type="password" id="register-password" placeholder="Password" required>
      <button id="register-submit">Register</button>      
    </div>
  `;
}
