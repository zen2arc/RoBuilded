import { storage_add, storage_get } from "../modules/storage";

const theme_selection = document.getElementById("theme_selection");
const home_clutter_selection = document.getElementById("clean_home_checkbox");
const game_recommended_selection = document.getElementById(
  "clean_game_checkbox"
);
const ublock_selection = document.getElementById("ublock_checkbox");

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
  document.querySelectorAll(".option").forEach(async function (option) {
    if (option.type == "checkbox") {
      storage_add(option.name, option.checked);
    } else {
      storage_add(option.name, option.value);
    }
  });
}

theme_selection.addEventListener("change", function () {
  update_storage();
});

game_recommended_selection.addEventListener("change", function () {
  update_storage();
});

home_clutter_selection.addEventListener("change", function () {
  update_storage();
});

ublock_selection.addEventListener("change", function () {
  ublock_selection.checked = false;
  window.open("https://github.com/gorhill/uBlock");
});

update_settings();
