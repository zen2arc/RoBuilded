import { wait_for_element } from "../../../modules/common";

// Index.js will lanuch when styles are run.

// Only for darktheme
wait_for_element(
  ".dark-theme.graphic_theming #game-details-carousel-container img"
).then((element) => {
  console.log("applying Modified Styles.");
  let modal_dialog = document.getElementById("modal-dialog");
  if (modal_dialog) {
    console.log("Found Modal Dialog!");
    modal_dialog.style.background = `url(${element.src})`;
  }
});

document.addEventListener("scroll", function() {
  let has_scrolled = window.scrollY
  let header = document.getElementById("header");
  if (has_scrolled) {
    header.classList.add("header_has_scrolled");
  } else {
    header.classList.remove("header_has_scrolled");
  }
}); 

console.log("Rofreshed: Rofreshed theme index.js loaded!");
