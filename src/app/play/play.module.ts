import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PlayRoutingModule } from "./play-routing.module";
import { PlayComponent } from "./play.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PlayRoutingModule
    ],
    declarations: [
        PlayComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlayModule { }
