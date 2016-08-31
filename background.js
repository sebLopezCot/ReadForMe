/* The background script running in chrome waiting to perform actions */
var speakingEnabled = true;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) 
{   
    if(message)
    {
    	if(message == "init" && speakingEnabled){
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

    	} else if (message == "toggle") {
            speakingEnabled = !speakingEnabled;

            // might want to reload all tabs later
            chrome.tabs.getSelected(null, function(tab) {
              var code = 'window.location.reload();';
              chrome.tabs.executeScript(tab.id, {code: code});
            });

            sendResponse({speakingEnabled:speakingEnabled});
        }
    }
});
