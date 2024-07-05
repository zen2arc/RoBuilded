// Clean home for Firefox
import { clean_home_sorts } from "../modules/common";
var has_ran = false;
var should_run = false;

function listener(details) {
  if (!should_run) {
    return false;
  }
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
    decoded.sorts = clean_home_sorts(decoded.sorts);
    let encoded = JSON.stringify(decoded);
    filter.write(encoder.encode(encoded));
    filter.disconnect();
  };

  return {};
}

function clean_home_init() {
  if (has_ran) {
    return false;
  }
  has_ran = true;
  console.log("Rofreshed: Clean Home started!");

  browser.webRequest.onBeforeRequest.addListener(
    listener,
    {
      urls: ["https://apis.roblox.com/discovery-api/omni-recommendation"],
      types: ["xmlhttprequest"],
    },
    ["blocking"]
  );
}

browser.runtime.onMessage.addListener(function (message) {
  if (message.subject == "clean_home_run") {
    should_run = true;
    clean_home_init();
  } else if (
    message.subject == "clean_home_stop" ||
    message.subject == "disabled"
  ) {
    should_run = false;
    has_ran = false;
  }
});

export default clean_home_sorts;
