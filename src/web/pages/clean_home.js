// Use xhook for non-firefox browsers
import xhook from "xhook";
import { clean_home_sorts } from "../../modules/common"

xhook.after(function (request, response) {
  if (
    request.url == "https://apis.roblox.com/discovery-api/omni-recommendation"
  ) {
    var decoded = JSON.parse(response.data);

    decoded.sorts = clean_home_sorts(decoded.sorts);
    var encoded = JSON.stringify(decoded);

    response.text = encoded;
  }
});
console.log("Rofreshed: Clean Home: xhook started!");





















