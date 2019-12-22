import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { MakeCardComponent } from "./make-card.component";

const routes: Routes = [
    { path: "", component: MakeCardComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MakeCardRoutingModule { }
