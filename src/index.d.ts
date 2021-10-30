export interface RecognitionListener {
    onPartialResult: (hyp: string) => void;
    onResult: (hyp: string) => void;
    onFinalResult: (hyp: string) => void;
    onError: () => void;
    onTimeout: () => void;
}
export declare class SpeechService {
    private onPermissionGranted;
    private onPermissionRejected;
    private speechService;
    constructor();
    available(): Promise<boolean>;
    requestPermission(): Promise<boolean>;
    startListening(model: org.vosk.Model, listener: RecognitionListener): Promise<boolean>;
    stop(): Promise<void>;
    cancel(): Promise<void>;
    shutdown(): Promise<void>;
    private wasPermissionGranted;
    private _requestPermission;
}
export declare function syncModel(): Promise<any>;
