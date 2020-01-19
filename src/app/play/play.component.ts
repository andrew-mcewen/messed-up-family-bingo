import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as dialogs from "tns-core-modules/ui/dialogs";
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
    freeTileActive: boolean;
    
    
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
        
        this.myCardValues = [];
        this.myCard = this.cardService.getMyCard();
        const self = this;

        //console.log('My tiles: ', JSON.stringify(this.myCard.tiles, null, 2));

        this.myCard.tileSets.forEach(function(tileSet){
            tileSet.tiles.forEach(function(tile){
                if(tile.inPlay == true){
                    self.myCardValues.push(tile);
                }
            })
        });
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
        this.checkForBingo();
    }

    toggleFreeTile(freeTile): void {
        freeTile.active = !freeTile.active;
        this.cardService.saveCard(this.myCard.id, this.myCard)
        this.checkForBingo();
    }

    checkForBingo(): void {
        let scoredBingo;

        //4 squares
        if(this.myCard.tiles[0].active
            && this.myCard.tiles[4].active 
            && this.myCard.tiles[19].active 
            && this.myCard.tiles[23].active) {
                scoredBingo = true;
        }

        //Diagonal
        if(this.myCard.tiles[0].active
            && this.myCard.tiles[6].active 
            && this.myCard.freeTile.active == true
            && this.myCard.tiles[17].active 
            && this.myCard.tiles[23].active) {
                scoredBingo = true;
        }

        //Diagonal
        if(this.myCard.tiles[4].active
            && this.myCard.tiles[8].active
            && this.myCard.freeTile.active == true
            && this.myCard.tiles[15].active 
            && this.myCard.tiles[19].active) {
                scoredBingo = true;
        }

        if(scoredBingo){
            dialogs.confirm({
                title: "BINGO",
                message: "Yikes. This family is messed up.",
                okButtonText: "HERE WE GO AGAIN",
            }).then(result => {
                this.clearCard();
            });
        }
    }

    clearCard(): void {
        for(let tile of this.myCard.tiles){
            tile.active = false;
        }
        this.myCard.freeTile.active = false;
        this.cardService.saveCard(this.myCard.id, this.myCard)
        this.checkForBingo();
    }
}
