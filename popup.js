
chrome.runtime.sendMessage(null, "toggle", null, function(response){
	var state = (response.speakingEnabled) ? 'SPEAKING ON' : 'SPEAKING OFF';
	document.getElementById('status').innerHTML = state;
});
