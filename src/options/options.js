import { storage_add, storage_get } from "../modules/storage";

const sidebar_selection_open_button = document.getElementById("clean_sidebar_button");
const sidebar_selection_close_button = document.getElementById("close_sidebar_buttons");

function update_settings() {
  document.querySelectorAll(".option").forEach(async function (option) {
    if (option.type == "checkbox") {
      option.checked = await storage_get(option.name);
    } else {
      option.value = await storage_get(option.name) || element.getAttribute("fallback");
    }
  });
}

function update_storage() {
  console.log("Updating Storage");
  document.querySelectorAll(".option").forEach(async function (option) {
    if (option.type == "checkbox") {
      storage_add(option.name, option.checked);
    } else {
      storage_add(option.name, option.value);
    }
  });
}

document.querySelectorAll(".option").forEach(function(option) {
  option.addEventListener("change", function () {
    update_storage();
  });
});

sidebar_selection_open_button.addEventListener("click", function() {
  document.getElementById("sidebar_buttons").style.display = 'block';
  document.getElementById("main_panel").style.display = 'none';
}); 

sidebar_selection_close_button.addEventListener("click", function() {
  document.getElementById("sidebar_buttons").style.display = 'none';
  document.getElementById("main_panel").style.display = 'block';
}); 

update_settings();
