/* Content script that runs when page loads */

// Call init on the background script
chrome.extension.sendRequest({action: "init"});

