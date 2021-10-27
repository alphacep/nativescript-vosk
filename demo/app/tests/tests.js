var SpeechRecognition = require("nativescript-vosk").SpeechRecognition;
var speechRecognition = new SpeechRecognition();

describe("available", function() {
  it("exists", function() {
    expect(speechRecognition.available).toBeDefined();
  });

  it("returns a promise", function() {
    expect(speechRecognition.available()).toEqual(jasmine.any(Promise));
  });
});