console.log("Rofreshed: Clean Home started!");

/**
 *
 * @param {Array} sorts The sort to clean.
 * @returns The cleaned array.
 */
function clean_sorts(sorts) {
  for (let [index, sort] of Object.entries(sorts)) {
    // 100000000 is the topicid for recommended
    // 400000000 is the topicid for sponsored
    // 100000008 is the topic id for today's picks
    if (
      sort["topicId"] == 100000000 ||
      sort["topicId"] == 400000000 ||
      sort["topicId"] == 100000008 ||
      sort["treatmentType"] == "SortlessGrid"
    ) {
      //sorts.splice(index, 1);
      delete sorts[index];
    }
  }
  sorts = sorts.filter((n) => n);
  return sorts;
}

function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  const data = [];
  filter.ondata = (event) => {
    data.push(event.data);
  };

  filter.onstop = (event) => {
    let response = "";

    // Thank you MDN examples i cannot understand this api
    if (data.length === 1) {
      response = decoder.decode(data[0]);
    } else {
      for (let i = 0; i < data.length; i++) {
        const stream = i !== data.length - 1;
        response += decoder.decode(data[i], { stream });
      }
    }

    let decoded = JSON.parse(response);
    decoded.sorts = clean_sorts(decoded.sorts);
    let encoded = JSON.stringify(decoded);
    filter.write(encoder.encode(encoded));
    filter.disconnect();
  };

  return {};
}

var has_ran = false;
var should_run = false;

function clean_game_init() {
  browser.webRequest.onBeforeRequest.addListener(
    listener,
    {
      urls: ["https://apis.roblox.com/discovery-api/omni-recommendation"],
      types: ["xmlhttprequest"],
    },
    ["blocking"]
  );
}

/* xhook.after(function (request, response) {
  if (
    request.url == "https://apis.roblox.com/discovery-api/omni-recommendation"
  ) {
    var decoded = JSON.parse(response.data);

    decoded.sorts = clean_sorts(decoded.sorts);
    var encoded = JSON.stringify(decoded);

    response.text = encoded;
  }
});
 */

browser.runtime.onMessage.addListener(function (message) {
  if (message.subject == "clean_home_run") {
    should_run = true;
    clean_game_init();
  } else if (message.subject == "clean_home_stop") {
    should_run = false;
    has_ran = false;
  }
});
