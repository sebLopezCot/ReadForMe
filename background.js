/* The background script running in chrome waiting to perform actions */

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{   
    if(request.action)
    {
    	if(request.action == "init"){
    		// Send back an array of frameIds that have google docs loaded inside
            chrome.tabs.executeScript(sender.tab.id, {
                file: "injection.js"
            });
    	}
    }
});