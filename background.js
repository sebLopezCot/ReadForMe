/* The background script running in chrome waiting to perform actions */

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
{   
    if(request.action)
    {
    	if(request.action == "init"){
            // Send back an array of frameIds that have google docs loaded inside
    		chrome.webNavigation.getAllFrames({tabId: sender.tab.id}, function(frames){
    			var frameIds = frames.map(function(frame){ return frame.frameId });
    			
    			// Inject scrollbar event handling mechanism into iframes
				frameIds.forEach(function(frameId){
					chrome.tabs.executeScript(sender.tab.id, {
						file: "injection.js",
						frameId: frameId
					});
				});
    		});
    	}
    }
});
