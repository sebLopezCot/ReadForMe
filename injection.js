// Gets injected to the page on load

if('speechSynthesis' in window){
	var msg = new SpeechSynthesisUtterance('');
	msg.voice = window.speechSynthesis.getVoices().filter(function(voice){ return voice.name == "Google US English"; })[0];
	// msg.rate = 1.5;
	window.speechSynthesis.speak(msg);
}

$('p').mouseover(function(){
	$(this).addClass('yellow');
});

$('p').mouseout(function(){
	$(this).removeClass('yellow');
});

$('p').click(function(){
	if ('speechSynthesis' in window) {
		window.speechSynthesis.cancel();

		var msg = new SpeechSynthesisUtterance($(this).text());
		msg.voice = window.speechSynthesis.getVoices().filter(function(voice){ return voice.name == "Google US English"; })[0];
		// msg.rate = 1.5;
    	window.speechSynthesis.speak(msg);
	}
});
