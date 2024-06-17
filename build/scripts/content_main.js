import { s as storage_get } from '../storage-Xx6jusRl.js';

/**
 * Module for script injection.
 * @module modules/inject.js
 */


/**
 * 
 * @param {String} source The source of the script.
 */

function inject_js(source) {
  var script = document.createElement("script");
  script.setAttribute("src", browser.runtime.getURL(source));
  script.type = "module";

  document.head.appendChild(script);
}

/**
 * 
 * @param {String} source The source of the stylesheet. 
 */

function inject_css(source) {
  var style = document.createElement("link");
  style.setAttribute("href", browser.runtime.getURL(source));
  style.setAttribute("rel", "stylesheet");

  document.head.appendChild(style);
}

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
    inject_js("web/pages/home/clean_home.js");
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
