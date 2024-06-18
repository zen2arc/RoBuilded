import { storage_add, storage_get } from "../modules/storage";

const theme_selection = document.getElementById("theme_selection");
const home_clutter_selection = document.getElementById("clean_home_checkbox");
const game_recommended_selection = document.getElementById(
  "clean_game_checkbox"
);
const ublock_selection = document.getElementById("ublock_checkbox");
const sidebar_selection_open_button = document.getElementById("clean_sidebar_button");
const sidebar_selection_close_button = document.getElementById("close_sidebar_buttons");

function update_settings() {
  document.querySelectorAll(".option").forEach(async function (option) {
    if (option.type == "checkbox") {
      option.checked = await storage_get(option.name);
    } else {
      option.value = await storage_get(option.name);
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


ublock_selection.addEventListener("change", function () {
  ublock_selection.checked = false;
  window.open("https://github.com/gorhill/uBlock");
});

update_settings();
