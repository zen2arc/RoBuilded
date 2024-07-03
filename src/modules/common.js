/**
 * Common Variables module.
 * @module modules/common.js
 */

/**
 * Waits for a element
 * @param {String} selector CSS Selector for the element
 * @returns Element
 */

function wait_for_element(selector) {
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

/** 
 * The storage prefix to use. 
 * @readonly
 * @private
*/
const storage_prefix = 'rofreshed';

export {storage_prefix, wait_for_element}