(function () {
	'use strict';

	const importPath = /*@__PURE__*/ JSON.parse('"../scripts/content_main.js"');

	import(chrome.runtime.getURL(importPath));

})();
