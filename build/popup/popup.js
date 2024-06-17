import { s as storage_get, a as storage_add } from '../storage-Xx6jusRl.js';

//import $ from "jquery";

const status_checkbox = document.getElementById("status");
const settings_button = document.getElementById("button_settings");

//$("#status").prop("checked", storage_get("enabled", false) || true);
var storage_enabled = await storage_get("enabled", false);
if (storage_enabled == null || storage_enabled == undefined) {
  storage_enabled = true;
}
document.getElementById("status").checked = storage_enabled;

settings_button.addEventListener("click", () => {
  browser.runtime.openOptionsPage();
}); 

status_checkbox.addEventListener("change", (event) => {
  let checked = event.currentTarget.checked;
  if (checked) {
    console.log("Checked");
  } else {
    console.log("Not Checked");
  }
  storage_add("enabled", checked, false);
});
