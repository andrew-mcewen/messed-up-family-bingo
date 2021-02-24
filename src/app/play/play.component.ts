import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import * as app from "tns-core-modules/application";

import { CardService } from '../card.service';
import { ActionBar } from "tns-core-modules/ui/action-bar/action-bar";
import { EventData } from "tns-core-modules/ui/core/bindable/bindable";

interface BingoCardTile {
    active: boolean,
    inPlay: boolean,
    text: string
}

@Component({
    selector: "Play",
    templateUrl: "./play.component.html",
    styleUrls: ["./play.component.scss"]
})

export class PlayComponent implements OnInit {    
    
    @ViewChild("playActionBar", { static: false }) playActionBarRef: ElementRef;
    @ViewChild("pageContent", { static: false }) pageContentRef: ElementRef;
    
    orientation: string;
    landscape: boolean;    
    
    actionBar: ActionBar;
    
    bingoCardTilesInPlay: Array<BingoCardTile>;
    playForBlackout: boolean;

    constructor(private page: Page, private cardService: CardService) {
        console.log('Constructor');
        this.bingoCardTilesInPlay = this.cardService.getBingoCardTilesInPlay();
        this.playForBlackout = this.cardService.getPlayForBlackout();
    }

    ngOnInit(): void {
        console.log('OnInit');

        app.on(app.orientationChangedEvent, (args) => {
            this.orientation = args.newValue;      
            
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
    }

    onActionBarLoaded(args: EventData): void {
        this.actionBar = args.object as ActionBar;    
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    async toggleTile(tile: BingoCardTile): Promise<any> {
        tile.active = !tile.active;
        await this.cardService.saveBingoGameData(this.bingoCardTilesInPlay);
        this.checkForBingo();
    }

    async checkForBingo(): Promise<any> {
        console.log('Checking for bingo...');
        console.log('Go for blackout: ', this.playForBlackout);
        let scoredBingo: boolean;

        if(!this.playForBlackout){
            //4 squares
            if(this.bingoCardTilesInPlay[0].active
                && this.bingoCardTilesInPlay[4].active 
                && this.bingoCardTilesInPlay[20].active 
                && this.bingoCardTilesInPlay[24].active) {
                    scoredBingo = true;
            }
    
            //Diagonal
            if(this.bingoCardTilesInPlay[0].active
                && this.bingoCardTilesInPlay[6].active
                && this.bingoCardTilesInPlay[12].active
                && this.bingoCardTilesInPlay[18].active
                && this.bingoCardTilesInPlay[24].active) {
                    scoredBingo = true;
            }
    
            //Diagonal
            if(this.bingoCardTilesInPlay[4].active
                && this.bingoCardTilesInPlay[8].active
                && this.bingoCardTilesInPlay[12].active
                && this.bingoCardTilesInPlay[16].active 
                && this.bingoCardTilesInPlay[20].active) {
                    scoredBingo = true;
            }
    
            if(scoredBingo){
                dialogs.confirm({
                    title: "BINGO!",
                    message: "Yikes. What a messed up family.",
                    okButtonText: "PLAY AGAIN",
                    cancelButtonText: "GO FOR BLACKOUT",
                }).then(async (result) => {
                    if(result) {
                        this.clearCard();
                    } else {
                        this.playForBlackout = true;
                        await this.cardService.savePlayForBlackout(true);
                    }
                });
            }
        } else {
            if(this.bingoCardTilesInPlay.filter(tile => tile.active == true).length == 25) {
                dialogs.confirm({
                    title: "BLACKOUT!",
                    message: "Yikes. What a messed up family.",
                    okButtonText: "PLAY AGAIN",
                }).then(async (result) => {
                    this.clearCard();
                    this.playForBlackout = false;
                    await this.cardService.savePlayForBlackout(false);
                });
            }
        }
    }

    async shuffle(): Promise<any> {
        this.bingoCardTilesInPlay = await this.cardService.shuffleBingoCardTilesInPlay(this.bingoCardTilesInPlay);
        console.log(`How many ${this.bingoCardTilesInPlay.length}`);
    }

    clearCard(): void {
        for(let tileIndex in this.bingoCardTilesInPlay){
            this.bingoCardTilesInPlay[tileIndex].active = false;
        }

        this.cardService.saveBingoGameData(this.bingoCardTilesInPlay);
        this.checkForBingo();
    }
}
