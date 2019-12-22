import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Page } from "tns-core-modules/ui/page";
import * as app from "tns-core-modules/application";

import { CardService } from '../card.service';
import { ActionBar } from "tns-core-modules/ui/action-bar/action-bar";
import { EventData } from "tns-core-modules/ui/core/bindable/bindable";

@Component({
    selector: "Play",
    templateUrl: "./play.component.html",
    styleUrls: ["./play.component.scss"]
})
export class PlayComponent implements OnInit, AfterViewInit {    
    
    @ViewChild("playActionBar", { static: false }) playActionBarRef: ElementRef;
    @ViewChild("pageContent", { static: false }) pageContentRef: ElementRef;
    
    orientation: string;
    landscape: boolean;
    actionBar: ActionBar;
    myCardValues: Array<object>;
    defaultCard: any;
    myCard: any;
    
    
    constructor(private page: Page, private cardService: CardService) {
        // Use the component constructor to inject providers.
    }
    
    ngAfterViewInit(): void {
    }

    ngOnInit(): void {        
        app.on(app.orientationChangedEvent, (args) => {
            this.orientation = args.newValue;
            console.log('New Orientation: ', args.newValue);            
            
            if(this.orientation == 'landscape'){
                console.log('Orientation is now landscape: ', this.orientation);
                this.landscape = true;
                this.page.actionBarHidden = true;
            } else {
                console.log('Orientation is no longer landscape: ', this.orientation);
                this.landscape = false;
                this.page.actionBarHidden = false;
            }
        });
        
        // Init your component properties here
        this.myCardValues = [];
        this.myCard = this.cardService.getMyCard();
        const self = this;

        console.log('My tiles: ', JSON.stringify(this.myCard.tiles, null, 2));

        //console.log('My tile sets: ', JSON.stringify(this.myCard.tileSets, null, 2));
        this.myCard.tileSets.forEach(function(tileSet){
            tileSet.tiles.forEach(function(tile){
                if(tile.inPlay == true){
                    self.myCardValues.push(tile);
                }
            })
        });

        console.log('myCard values: ', JSON.stringify(this.myCardValues, null, 2));
        console.log('myCard values count: ', this.myCardValues.length);
    }

    onActionBarLoaded(args: EventData): void {
        console.log('Action bar loaded!');
        this.actionBar = args.object as ActionBar;
        console.log('ActionBar: ', this.actionBar);        
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    toggleTile(tile): void {
        tile.active = !tile.active;
        this.cardService.saveCard(this.myCard.id, this.myCard)
    }
}
