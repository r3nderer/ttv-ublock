chrome.webRequest.onBeforeSendHeaders.addListener(
	({ requestHeaders }) => {
		for (const header of requestHeaders) {
			if (header.name.toLowerCase() === "origin")
				header.value = "https://player.twitch.tv";

			if (header.name.toLowerCase() === "referer")
				header.value = "https://player.twitch.tv/";
		}
		return { requestHeaders };
	},
	{ urls: ["*://*.hls.ttvnw.net/*"] },
	["blocking", "requestHeaders", "extraHeaders"]
);

chrome.webRequest.onBeforeRequest.addListener(
	() => {
		console.log("REPLACED");
		return { redirectUrl: chrome.runtime.getURL("core.js") };
	},
	{ urls: ["*://static.twitchcdn.net/assets/core-*.js"] },
	["blocking"]
);