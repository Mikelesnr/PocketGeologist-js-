import { renderHeader } from "./components/header.mjs";
import { renderNav } from "./components/nav.mjs";
import { renderFooter } from "./components/footer.mjs";
import { setupAuthHandlers } from "./auth.js"; // Import authentication logic

// Render header, navigation, and footer
document.body.prepend(renderHeader());
document.body.appendChild(renderNav());

const authSection = document.createElement("section");
authSection.classList.add("auth-container");

authSection.innerHTML = `
    <h2>Register</h2>
    <input type="text" id="register-username" placeholder="Username">
    <input type="password" id="register-password" placeholder="Password">
    <button id="register-btn">Register</button>

    <h2>Login</h2>
    <input type="text" id="login-username" placeholder="Username">
    <input type="password" id="login-password" placeholder="Password">
    <button id="login-btn">Login</button>
`;

document.body.appendChild(authSection);
document.body.appendChild(renderFooter());

// Attach event listeners from auth.js
setupAuthHandlers();
