// This script will execute after the DOM has finished loaded. document_end
import { storage_get } from "../modules/storage";
import { inject_js } from "../modules/inject";

// Implement the sidebar button removal feature.
// sidebar_removal_lists is the names of all the ids of the sidebar buttons.
if ((await storage_get("enabled", false)) == false) {
  console.log("Rofreshed Disabled");
} else {
  var sidebar_removal_lists = [
    "nav-profile",
    "nav-message",
    "nav-friends",
    "nav-inventory",
    "nav-trade",
    "nav-group",
    "nav-blog",
    "nav-shop",
    "nav-giftcards",
    "upgrade-now-button",
  ];

  console.log("Rofreshed: Running sidebar removal");

  // Get the parent of all the ids in sidebar removal lists, and remove it.
  for (const sidebar_entry of sidebar_removal_lists) {
    const async_run = async function () {
      const storage_value = await storage_get(sidebar_entry);
      if (storage_value) {
        let button = document.getElementById(sidebar_entry);
        if (button) {
          button.parentNode.remove();
        }
      }
    };
    async_run();
  }
}

// Load the style index.js
let style = (await storage_get("theme")) || "default";
inject_js(`web/themes/${style}/index.js`);

let performance_theming = (await storage_get("performance_theming")) || false
if (!performance_theming) {
  document.body.classList.add("graphic_theming")
}