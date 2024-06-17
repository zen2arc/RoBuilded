var has_ran = false;
var should_run = false;

function clean_game_init() {
  if (has_ran) {return false;}
  has_ran = true;
  console.log("Rofreshed: Clean Game Page running!");

  let pattern = "https://games.roblox.com/v1/games/recommendations/game/*";

  browser.webRequest.onBeforeRequest.addListener(
    function (requestDetails) {
      if (!should_run) {
        return false;
      }
      console.log(`Redirecting: ${requestDetails.url}`);
      return {
        cancel: true,
      };
    },
    { urls: [pattern]},
    ["blocking"]
  );
}

browser.runtime.onMessage.addListener(function(message) {
  if (message.subject == "clean_game_run") {
    should_run = true;
    clean_game_init();
  } else if (message.subject == "clean_game_stop") {
    should_run = false;
    has_ran = false;
  } 
});
