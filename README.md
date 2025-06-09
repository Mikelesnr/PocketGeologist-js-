# Pocket Geologist

## Overview

Pocket Geologist is a personal project built as part of the **WDD330 - Frontend Development II** course.  
It allows users to browse and manage a collection of minerals using data from the **Mindat.org API**.

🚨 **Important Notice**  
This project adheres to **Mindat.org's** usage policy and **should not be used for commercial purposes**.

## Project Goals

- Build an intuitive **frontend for mineral collection management**.
- Use **Mindat.org's API** to fetch mineral data.
- Implement **user authentication** and **collection tracking**.
- Create a **responsive and modular UI** with reusable components.

## Technologies Used

| Technology        | Purpose                             |
| ----------------- | ----------------------------------- |
| JavaScript (ES6+) | Core language for application logic |
| Vite              | Fast frontend development framework |
| LocalStorage      | User data persistence               |
| Mindat API        | Source for mineral data             |
| CSS (Responsive)  | Styling and layout enhancements     |

## File Structure

```bash
tree -I node_modules (note tree must be installed on your machine)
.
├── package.json
├── package-lock.json
├── src
│   ├── css/
│   │   └── styles.css
│   ├── gallery/
│   │   └── index.html
│   ├── index.html
│   ├── js/
│   │   ├── auth/
│   │   │   ├── auth.mjs
│   │   │   ├── login.mjs
│   │   │   ├── register.mjs
│   │   ├── components/
│   │   │   ├── alert.mjs
│   │   │   ├── footer.mjs
│   │   │   ├── header.mjs
│   │   │   ├── nav.mjs
│   │   │   ├── popup.mjs
│   │   ├── mineralCollection.mjs
│   │   ├── mineralData.mjs
│   │   ├── mineralDetails.mjs
│   │   ├── mineralList.mjs
│   │   ├── utils.mjs
│   ├── public/images/minerals/
│   │   ├── Abelsonite.jpg
│   │   ├── Calcite.jpg
│   │   ├── Quartz.jpg
│   │   ├── Stibnite.jpg
│   └── style.css
└── vite.config.js
```

Key Features
🔹 Mineral Collection & Browsing
Fetch mineral data from Mindat.org API.

Display detailed mineral information with images.

Allow users to save minerals to a personal collection.

🔹 Authentication System
Users can sign up, log in, and manage collections.

Authentication is handled with localStorage.

🔹 Custom Alerts & Notifications
Replaces standard alerts with styled notifications.

Displays success, warning, and error messages dynamically.

Installation & Setup
🔧 Prerequisites
Ensure you have the following installed:

Node.js (v16 or higher)

Vite (for fast frontend development)

🛠️ Local Setup
Clone the Repository

bash
git clone https://github.com/Mikelesnr/PocketGeologist-js-
cd PocketGeologist-js-
Install Dependencies

bash
npm install
Run the Development Server

bash
npm run dev
Build for Production

bash
npm run build
Deployment
🌍 Live Version on Netlify: https://pkt-geologist.netlify.app/

📂 GitHub Repository: https://github.com/Mikelesnr/PocketGeologist-js-

Usage
🔍 Viewing Minerals
Navigate to the Mineral Listing page (/mineral_listing/index.html) to browse available minerals.

🏷️ Managing Collections
Add minerals to your collection (Only available when logged in).

View personal collections under /mineral_collection/index.html.

Pagination included for managing large collections.

Author
👨‍💻 Michael Mwanza

Contributions
This project is a personal educational project, but contributions are welcome!

Fork the repository.

Create a feature branch (git checkout -b feature-name).

Commit changes (git commit -m "Added feature X").

Push to your branch and submit a pull request.

License
🚫 Non-Commercial Use Only This project uses Mindat.org API, which must not be used for commercial purposes.
