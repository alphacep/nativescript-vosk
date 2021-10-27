/// <reference path="android-declarations.d.ts"/>

declare module org {
	export module vosk {
		export class LogLevel {
			public static class: java.lang.Class<org.vosk.LogLevel>;
			public static WARNINGS: org.vosk.LogLevel;
			public static INFO: org.vosk.LogLevel;
			public static DEBUG: org.vosk.LogLevel;
			public getValue(): number;
			public static values(): androidNative.Array<org.vosk.LogLevel>;
			public static valueOf(param0: string): org.vosk.LogLevel;
		}
	}
}

declare module org {
	export module vosk {
		export class Model {
			public static class: java.lang.Class<org.vosk.Model>;
			public constructor();
			public close(): void;
			public constructor(param0: string);
		}
	}
}

declare module org {
	export module vosk {
		export class Recognizer {
			public static class: java.lang.Class<org.vosk.Recognizer>;
			public getResult(): string;
			public getFinalResult(): string;
			public constructor(param0: org.vosk.Model, param1: number);
			public acceptWaveForm(param0: androidNative.Array<number>, param1: number): boolean;
			public constructor(param0: org.vosk.Model, param1: number, param2: org.vosk.SpeakerModel);
			public getPartialResult(): string;
			public setSpeakerModel(param0: org.vosk.SpeakerModel): void;
			public reset(): void;
			public close(): void;
			public constructor(param0: org.vosk.Model, param1: number, param2: string);
			public setMaxAlternatives(param0: number): void;
			public setWords(param0: boolean): void;
		}
	}
}

declare module org {
	export module vosk {
		export class SpeakerModel {
			public static class: java.lang.Class<org.vosk.SpeakerModel>;
			public constructor();
			public close(): void;
			public constructor(param0: string);
		}
	}
}

declare module org {
	export module vosk {
		export module android {
			export class RecognitionListener {
				public static class: java.lang.Class<org.vosk.android.RecognitionListener>;
				/**
				 * Constructs a new instance of the org.vosk.android.RecognitionListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					onPartialResult(param0: string): void;
					onResult(param0: string): void;
					onFinalResult(param0: string): void;
					onError(param0: java.lang.Exception): void;
					onTimeout(): void;
				});
				public constructor();
				public onFinalResult(param0: string): void;
				public onResult(param0: string): void;
				public onPartialResult(param0: string): void;
				public onError(param0: java.lang.Exception): void;
				public onTimeout(): void;
			}
		}
	}
}

declare module org {
	export module vosk {
		export module android {
			export class SpeechService {
				public static class: java.lang.Class<org.vosk.android.SpeechService>;
				public constructor(param0: org.vosk.Recognizer, param1: number);
				public startListening(param0: org.vosk.android.RecognitionListener, param1: number): boolean;
				public stop(): boolean;
				public reset(): void;
				public shutdown(): void;
				public startListening(param0: org.vosk.android.RecognitionListener): boolean;
				public cancel(): boolean;
				public setPause(param0: boolean): void;
			}
		}
	}
}

declare module org {
	export module vosk {
		export module android {
			export class SpeechStreamService {
				public static class: java.lang.Class<org.vosk.android.SpeechStreamService>;
				public start(param0: org.vosk.android.RecognitionListener): boolean;
				public stop(): boolean;
				public constructor(param0: org.vosk.Recognizer, param1: java.io.InputStream, param2: number);
				public start(param0: org.vosk.android.RecognitionListener, param1: number): boolean;
			}
		}
	}
}

declare module org {
	export module vosk {
		export module android {
			export class StorageService {
				public static class: java.lang.Class<org.vosk.android.StorageService>;
				public static TAG: string;
				public static sync(param0: globalAndroid.content.Context, param1: string, param2: string): string;
				public static unpack(param0: globalAndroid.content.Context, param1: string, param2: string, param3: org.vosk.android.StorageService.Callback<org.vosk.Model>, param4: org.vosk.android.StorageService.Callback<java.io.IOException>): void;
				public constructor();
			}
			export module StorageService {
				export class Callback<R>  extends java.lang.Object {
					public static class: java.lang.Class<org.vosk.android.StorageService.Callback<any>>;
					/**
					 * Constructs a new instance of the org.vosk.android.StorageService$Callback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						onComplete(param0: R): void;
					});
					public constructor();
					public onComplete(param0: R): void;
				}
			}
		}
	}
}

//Generics information:
//org.vosk.android.StorageService.Callback:1

