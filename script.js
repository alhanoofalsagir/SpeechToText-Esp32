var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();  
var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var notesList = $('ul#notes');
var noteContent = '';
recognition.continuous = true;
recognition.onresult = function(event) {

var current = event.resultIndex;

var transcript = event.results[current][0].transcript;
var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

if(!mobileRepeatBug) {
  noteContent += transcript;
  noteTextarea.val(noteContent);
}
};

recognition.onstart = function() {
instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
instructions.text('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
if(event.error == 'no-speech') {
  instructions.text('No speech was detected. Try again.');  
};
}


$('#start-record-btn').on('click', function(e) {
if (noteContent.length) {
  noteContent += ' ';
}
recognition.start();
recognition.lang='ar';
});


$('#pause-record-btn').on('click', function(e) {
recognition.stop();
instructions.text('Voice recognition paused.');
});  
 