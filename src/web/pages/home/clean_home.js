import xhook from "xhook";

console.log("Rofreshed: Clean Home running!");

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

xhook.after(function (request, response) {
  if (
    request.url == "https://apis.roblox.com/discovery-api/omni-recommendation"
  ) {
    var decoded = JSON.parse(response.data);

    decoded.sorts = clean_sorts(decoded.sorts);
    var encoded = JSON.stringify(decoded);

    response.text = encoded;
  }
});
