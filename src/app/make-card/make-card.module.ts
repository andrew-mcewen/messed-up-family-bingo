import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { MakeCardRoutingModule } from "./make-card-routing.module";
import { MakeCardComponent } from "./make-card.component";
import { AccordionModule } from 'nativescript-accordion/angular';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MakeCardRoutingModule,
        AccordionModule
    ],
    declarations: [
        MakeCardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MakeCardModule { }
