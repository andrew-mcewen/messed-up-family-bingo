import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/play", pathMatch: "full" },
    { path: "play", loadChildren: () => import("~/app/play/play.module").then(m => m.PlayModule) },
    { path: "make-card", loadChildren: () => import("~/app/make-card/make-card.module").then(m => m.MakeCardModule) },
    { path: "about", loadChildren: () => import("~/app/about/about.module").then(m => m.AboutModule) },
    { path: "terms", loadChildren: () => import("~/app/terms/terms.module").then(m => m.TermsModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
