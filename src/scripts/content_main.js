// This script will execute while the DOM is still loading. document_start

import { storage_get } from "../modules/storage";
import { inject_js, inject_css } from "../modules/inject";

if (typeof browser == "undefined") {
  alert("Rofreshed will not work on this browser.");
  window.location.href = chrome.runtime.getURL("web/notsupported.html");
}

if ((await storage_get("enabled", false)) == false) {
  console.log("Rofreshed Disabled");
} else {
  console.log("%cRofreshed", "color:#2b81ff; font-size: 3.4em;");
  console.log("%cRefreshing Roblox", "font-size: 1.6em;");
  // Inject the scripts

  // Home Page
  let clean_home = await storage_get("clean_home");
  if (clean_home) {
    browser.runtime.sendMessage({ subject: "clean_home_run"});
  } else {
    browser.runtime.sendMessage({ subject: "clean_home_stop"});
  }

  // Game Page
  let clean_game = await storage_get("clean_game");
  if (clean_game) {
    browser.runtime.sendMessage({ subject: "clean_game_run"});
  } else {
    browser.runtime.sendMessage({ subject: "clean_game_stop"});
  }

  // Styles
  let style = (await storage_get("theme")) || "default";
  inject_css(`web/themes/${style}/index.css`);
}
