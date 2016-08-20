// Gets injected to the page on load

if('speechSynthesis' in window){

	var msg = new SpeechSynthesisUtterance('');

}

function speak(message, done){
	if('speechSynthesis' in window && reading){

		msg.text = message;
		msg.voice = window.speechSynthesis.getVoices().filter(function(voice){ return voice.name == "Google US English"; })[0];
		// msg.rate = 1.5;
		msg.onend = function(){
			if(done){
				done();
			}
		};
		msg.onerror = function(event){
			if(done){
				done(event.error);
			}
		};
		window.speechSynthesis.speak(msg);
	} else {
		if(done){
			done();
		}
	}
}

// hack to get man voice out of system
$(document).ready(function(){
	setTimeout(function(){
		speak('');
		cancel();
	}, 100);
});

$('h1,h2,h3,h4,h5,h6,p,blockquote').mouseover(function(){
	$(this).addClass('yellow');
});

$('h1,h2,h3,h4,h5,h6,p,blockquote').mouseout(function(){
	$(this).removeClass('yellow');
});

var reading = false;
var chainDone = true;
var whenChainDone = null;

function finishChain() {
	chainDone = true;
	if(whenChainDone){
		whenChainDone();
		whenChainDone = null;
	}
}

function cancel() {
	reading = false;
	window.speechSynthesis.cancel();
}

$('h1,h2,h3,h4,h5,h6,p,blockquote').click(function(){
	var self = this;

	if ('speechSynthesis' in window) {
		// cancel speech
		cancel();

		function performSpeech(){
			// Turn text into chunks
			var chunks = $(self).text()
								.replace('?', '~')
								.replace('!', '~')
								.replace('.', '~')
								.replace(',', '~')
								.split('~');
			reading = true;
			chainDone = false;
			async.eachSeries(chunks, speak, function(err) {
				reading = false;
				finishChain();
			});
		}

		if(chainDone){
			performSpeech();
		} else {
			whenChainDone = performSpeech;
		}


	}
});
