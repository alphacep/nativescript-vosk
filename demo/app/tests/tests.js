var SpeechService = require("nativescript-vosk").SpeechService;
var speechService = new SpeechService();

describe("available", function() {
  it("exists", function() {
    expect(speechService.available).toBeDefined();
  });

  it("returns a promise", function() {
    expect(speechService.available()).toEqual(jasmine.any(Promise));
  });
});
