# RoBuilded
RoBuilded is a Manifest V2 extension for Firefox & others (with [webextension-polyfill](https://github.com/mozilla/webextension-polyfill)) to stylize the Roblox Website. Forked from PainfulColour's RoFreshed
## Features
- Remove buttons on the sidebar
- Remove clutter (such as "Today's Picks") from the home page
- Remove recommended games from the game page

| Themes |
| ------- |
| RoBuilded Theme (just started development)
| ![Rofreshed Theme](https://github.com/PainfulColour/RoFreshed/assets/52288545/9844b8e8-e76e-43df-b056-0f6b084fa42f) |
| Rofreshed: The Rofreshed default, very rounded theme. |
| ![Roblox Default](https://github.com/PainfulColour/RoFreshed/assets/52288545/2d09ff4a-48a6-4348-bab6-7a060d7e2156) |
| Roblox Default: The Roblox default theme. |
| RoBuilded Theme (just started development)

## Build
Rofreshed uses Rollup with the [rollup-plugin-chrome-extension](https://www.npmjs.com/package/rollup-plugin-chrome-extension) plugin, so ensure that you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) installed.

```shell
$ git clone https://github.com/PainfulColour/RoFreshed.git
$ cd RoFreshed
$ npm ci
$ npm run build
```

## License
Rofreshed is licensed under the MIT License. View LICENSE for the full text.
