/* Content script that runs when our Cyclops whiteboard page loads */

console.log("Cyclops is performing it's starting tasks");

// Call init on the background script
chrome.extension.sendRequest({action: "init"});

