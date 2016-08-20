// Gets injected to the page on load

String.prototype.chunk = function(charMax) {
	// turn object into literal
	var str = this.toString();

	// break into word array
	var words = str.split(' ');

	// for each word, get the number of chars it plus the words
	// before it would total up to
	var charCount = [];
	for(i in words){
		var word = words[i];
		var prevCharCount = 0;
		if(i > 0){
			prevCharCount = charCount[i-1];
		}
		charCount.push(prevCharCount + word.length + 1);
	}

	// divide into chunks of a given max length
	var chunks = [];
	var chunkStart = 0;
	var chunksSoFar = 0;
	for(i in charCount){
		var sum = charCount[i];
		sum -= chunksSoFar * charMax;

		if(sum > charMax || i == charCount.length - 1){
			var end = null;
			if(i == charCount.length - 1){
				end = i+1;
			} else {
				end = i;
			}
			chunks.push(words.slice(chunkStart, end).join(' '));
			chunkStart = i;
			chunksSoFar++;
		}
	}

	return chunks;
};


function speak(message, done){
	if('speechSynthesis' in window && reading){

		var msg = new SpeechSynthesisUtterance(message);
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
			var chunks = $(self).text().chunk(200);
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
