import { NavigatedData, Page } from "@nativescript/core";
import { VoskDemoModel } from "./main-view-model";

export function navigatingTo(args: NavigatedData) {
    // Get the event sender
    const page = <Page>args.object;
    page.bindingContext = new VoskDemoModel();
}
