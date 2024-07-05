// This script will execute while the DOM is still loading. document_start

import { storage_get } from "../modules/storage";
import { inject_css, inject_js } from "../modules/inject";

if ((await storage_get("enabled", false)) == false) {
  console.log("Rofreshed Disabled");
  browser.runtime.sendMessage({ subject: "disabled" });
} else {
  console.log("%cRofreshed", "color:#2b81ff; font-size: 3.4em;");
  console.log("%cRefreshing Roblox", "font-size: 1.6em;");

  // Load cleaning scripts
  // Use the background script for firefox
  // Use injected script (xhook) for others

  let clean_game = await storage_get("clean_game");
  let clean_home = await storage_get("clean_home");

  let is_firefox = navigator.userAgent.includes("Firefox"); // If you have a better way of detecting Firefox, please make a PR :D

  // Detect firefox to use different clean_home scripts
  if (is_firefox) {
    console.log("Rofrehsed: Running on Firefox")
    if (clean_home) {
      browser.runtime.sendMessage({ subject: "clean_home_run" });
    } else {
      browser.runtime.sendMessage({ subject: "clean_home_stop" });
    }

    // Game Page
    if (clean_game) {
      browser.runtime.sendMessage({ subject: "clean_game_run" });
    } else {
      browser.runtime.sendMessage({ subject: "clean_game_stop" });
    }
  } else {
    console.log("Rofrehsed: Using webextension-polyfill")
    if (clean_home) {
      inject_js(`web/pages/clean_home.js`)
    }
  }

  // Styles
  let style = (await storage_get("theme")) || "default";
  let nocache_token = Math.random() * 1000;
  // Prevent caching by using a nocache token
  inject_css(`web/themes/${style}/index.css?nocache=${nocache_token}`);
}
