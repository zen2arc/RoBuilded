console.log("Rofreshed: Clean Game Page running!");

let pattern = "	https://games.roblox.com/v1/games/recommendations/game/*";


browser.webRequest.onBeforeRequest.addListener(
  function(requestDetails) {
    console.log(`Redirecting: ${requestDetails.url}`);
    if (requestDetails.url === targetUrl) {
      return;
    }
    return {
      cancel: true,
    };
  },
  { urls: [pattern], types: ["image"] },
  ["blocking"],
);
