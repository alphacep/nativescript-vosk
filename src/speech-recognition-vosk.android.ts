import { AndroidApplication, Application, ApplicationEventData, Utils} from "@nativescript/core";

export interface RecognitionListener {

  /**
   * The callback function invoked when speech is recognized.
   * @param transcription
   */
  onPartialResult: (hyp: string) => void;

  /**
   * The callback function invoked when speech is recognized.
   * @param transcription
   */
  onResult: (hyp: string) => void;

  /**
   * The callback function invoked when speech is recognized.
   * @param transcription
   */
  onFinalResult: (hyp: string) => void;

  /**
   * Called when an error occurs.
   */
   onError: () => void;

  /**
   * Called after timeout expired
   */
   onTimeout: () => void;
}

declare let global: any;
const AppPackageName = global.androidx.core.app;
const ContentPackageName = global.androidx.core.content;

export class SpeechService {

  private onPermissionGranted: Function;
  private onPermissionRejected: Function;
  private speechService: org.vosk.android.SpeechService = null;

  constructor() {
    let self = this;
    Application.android.on(AndroidApplication.activityRequestPermissionsEvent, function (args: any) {
      for (let i = 0; i < args.permissions.length; i++) {
        if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_DENIED) {
          if (self.onPermissionRejected) {
            self.onPermissionRejected("Please allow access to the Microphone and try again.");
          } else {
            console.log("Please allow access to the Microphone and try again. (tip: pass in a reject to receive this message in your app)");
          }
          return;
        }
      }
      if (self.onPermissionGranted) {
        self.onPermissionGranted();
      }
    });

    Application.on(Application.suspendEvent, (args: ApplicationEventData) => {
      if (this.speechService !== null) {
        this.cancel();
        this.shutdown();
      }
    });
  }

  available(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(android.speech.SpeechRecognizer.isRecognitionAvailable(Utils.android.getApplicationContext()));
    });
  }

  requestPermission(): Promise<boolean> {
    console.log(">> requestPermission");
    return new Promise((resolve, reject) => {
      this._requestPermission(
          () => resolve(true),
          () => resolve(false));
    });
  }

  startListening(model: org.vosk.Model, listener: RecognitionListener): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let onPermissionGranted = () => {

        let loopHandler = new android.os.Handler(android.os.Looper.getMainLooper());
        loopHandler.post(new java.lang.Runnable({
          run: () => {

            let recognizer = new org.vosk.Recognizer(model, 16000.0);

            this.speechService = new org.vosk.android.SpeechService(recognizer, 16000.0);
            this.speechService.startListening(new org.vosk.android.RecognitionListener({

              onPartialResult(hyp: string) {
                listener.onPartialResult(hyp);
              },

              onResult(hyp: string) {
                listener.onResult(hyp);
              },

              onFinalResult(hyp: string) {
                listener.onFinalResult(hyp);
              },

              onTimeout() {
                listener.onTimeout();
              },

              onError(e: java.lang.Exception) {
                listener.onError();
              }
            }));
            resolve(true);
          }
        }));
      };

      if (!this.wasPermissionGranted()) {
        this._requestPermission(onPermissionGranted, reject);
        return;
      }

      onPermissionGranted();
    });
  }

  stop(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.speechService === null) {
        reject("Not running");
        return;
      }

      let loopHandler = new android.os.Handler(android.os.Looper.getMainLooper());
      loopHandler.post(new java.lang.Runnable({
        run: () => {
          this.speechService.stop();
          resolve();
        }
      }));
    });
  }

  cancel(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.speechService === null) {
        reject("Not running");
        return;
      }

      let loopHandler = new android.os.Handler(android.os.Looper.getMainLooper());
      loopHandler.post(new java.lang.Runnable({
        run: () => {
          this.speechService.cancel();
          resolve();
        }
      }));
    });
  }

  shutdown(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.speechService === null) {
        reject("Not running");
        return;
      }

      let loopHandler = new android.os.Handler(android.os.Looper.getMainLooper());
      loopHandler.post(new java.lang.Runnable({
        run: () => {
          this.speechService.shutdown();
          resolve();
        }
      }));
    });
  }

  private wasPermissionGranted(): boolean {
    let hasPermission = android.os.Build.VERSION.SDK_INT < 23; // Android M. (6.0)
    if (!hasPermission) {
      hasPermission = android.content.pm.PackageManager.PERMISSION_GRANTED ===
          ContentPackageName.ContextCompat.checkSelfPermission(
              Utils.android.getApplicationContext(),
              android.Manifest.permission.RECORD_AUDIO);
    }
    return hasPermission;
  }

  private _requestPermission(onPermissionGranted: Function, reject): void {
    this.onPermissionGranted = onPermissionGranted;
    this.onPermissionRejected = reject;
    AppPackageName.ActivityCompat.requestPermissions(
        Application.android.foregroundActivity || Application.android.startActivity, // TODO application.android.context
        [android.Manifest.permission.RECORD_AUDIO],
        444 // irrelevant since we simply invoke onPermissionGranted
    );
  }
}

export function syncModel() : Promise<any> {

  return new Promise<org.vosk.Model>((resolve, reject) => {
  let loopHandler = new android.os.Handler(android.os.Looper.getMainLooper());
    loopHandler.post(new java.lang.Runnable({
      run: () => {
        let outputPath = org.vosk.android.StorageService.sync(Utils.android.getApplicationContext(), "model-en-us", "model");
        let model = new org.vosk.Model(outputPath);
        resolve(model);
      }
    }));
  });
}
