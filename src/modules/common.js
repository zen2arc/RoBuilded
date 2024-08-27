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
 * @param {Array} sorts The sort to clean.
 * @returns The cleaned array.
 */
function clean_home_sorts(sorts) {
  for (let [index, sort] of Object.entries(sorts)) {
    // 100000000 is the topicid for recommended
    // 400000000 is the topicid for sponsored
    // 100000008 is the topic id for today's picks
    // 100000010 is the The Games event (and maybe more events)
    if (
      sort["topicId"] == 100000000 ||
      sort["topicId"] == 400000000 ||
      sort["topicId"] == 100000008 ||
      sort["topicId"] == 100000010 ||
      sort["treatmentType"] == "SortlessGrid"
    ) {
      //sorts.splice(index, 1);
      delete sorts[index];
    }
  }
  sorts = sorts.filter((n) => n);
  return sorts;
}

/**
 * The storage prefix to use.
 * @readonly
 * @private
 */
const storage_prefix = "rofreshed";

export { storage_prefix, wait_for_element, clean_home_sorts };