import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.plugin.vosk',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  }
} as NativeScriptConfig;
