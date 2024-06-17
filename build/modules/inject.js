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

export { inject_css, inject_js };
