// Index.js will lanuch when styles are run.

function WaitForElement(selector) {
  // thx stackoverflow :)
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

// Only for darktheme
WaitForElement(
  ".dark-theme #game-details-carousel-container img"
).then((element) => {
  console.log("applying Modified Styles.");
  let modal_dialog = document.getElementById("modal-dialog");
  if (modal_dialog) {
    console.log("Found Modal Dialog!");
    modal_dialog.style.background = `url(${element.src})`;
  }
});

console.log("Rofreshed: Rofreshed theme index.js loaded!");
