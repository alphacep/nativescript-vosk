import { Observable, isAndroid } from "@nativescript/core";
import { syncModel, SpeechService } from "nativescript-vosk";

export class VoskDemoModel extends Observable {

  private speechService : SpeechService;
  private model : any;

  public feedback: string = "Press 'Start' and say something";
  public listening: boolean = false;

  constructor() {
    super();
    syncModel().then((model : any) => {
         this.model = model;
         this.speechService = new SpeechService();
    })
  }

  public startListening(locale?: string): void {
    let that = this; // TODO remove 'that'

    this.speechService.available().then((avail: boolean) => {
      if (!avail) {
        that.set("feedback", "speech recognition not available");
        return;
      }
      that.speechService.startListening(
          that.model,
          {
            onResult: (hyp: string) => {
              that.set("feedback", hyp);
              that.set("listening", false);
              that.speechService.cancel();
            },
            onPartialResult: (hyp: string) => {
              that.set("feedback", hyp);
            },
            onFinalResult: (hyp: string) => {
              that.set("listening", false);
            },
            onError: () => {
              that.set("listening", false);
            },
            onTimeout: () => {
              that.set("listening", false);
            }
          }
      ).then((started: boolean) => {
        that.set("listening", true);
      }).catch((error: string | number) => {
        console.log(`Error while trying to start listening: ${error}`);
      });
    });
  }

  public stopListening(): void {
    let that = this;
    this.speechService.stop().then(() => {
      that.set("listening", false);
    }, (errorMessage: string) => {
      console.log(`Error while trying to stop listening: ${errorMessage}`);
    });
  }
}
