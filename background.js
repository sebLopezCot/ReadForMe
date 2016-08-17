/* The background script running in chrome waiting to perform actions */

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{   
    if(request.action)
    {
    	if(request.action == "init"){
            chrome.tabs.executeScript(sender.tab.id, {
                file: "injection.js"
            });
    	}
    }
});
