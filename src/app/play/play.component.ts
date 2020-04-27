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

export class PlayComponent implements OnInit, AfterViewInit {    
    
    @ViewChild("playActionBar", { static: false }) playActionBarRef: ElementRef;
    @ViewChild("pageContent", { static: false }) pageContentRef: ElementRef;
    
    orientation: string;
    landscape: boolean;    
    actionBar: ActionBar;
    
    bingoBoardLoaded: boolean;
    bingoCardTilesInPlay: Array<BingoCardTile>;
    playForBlackout: boolean;

    constructor(private page: Page, private cardService: CardService) {
        this.bingoCardTilesInPlay = cardService.getBingoCardTilesInPlay();
        this.playForBlackout = cardService.getPlayForBlackout();

        console.dir(this.bingoCardTilesInPlay.length, {depth: null, colors: true});
    }
    
    ngAfterViewInit(): void { }

    ngOnInit(): void {
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

    toggleTile(tile: BingoCardTile): void {
        tile.active = !tile.active;
        this.cardService.saveBingoGameData(this.bingoCardTilesInPlay)
        this.checkForBingo();
    }

    checkForBingo(): void {
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
                }).then(result => {
                    console.log(result);
                    if(result) {
                        this.clearCard();
                    } else {
                        this.playForBlackout = true;
                        this.cardService.savePlayForBlackout(true);
                    }
                });
            }
        } else {
            if(this.bingoCardTilesInPlay.filter(tile => tile.active == true).length == 25) {
                dialogs.confirm({
                    title: "BLACKOUT!",
                    message: "Yikes. What a messed up family.",
                    okButtonText: "PLAY AGAIN",
                }).then(result => {
                    this.clearCard();
                    this.playForBlackout = false;
                    this.cardService.savePlayForBlackout(false);
                });
            }
        }
    }

    async shuffle(): Promise<any> {
        await this.cardService.shuffleBingoCardTilesInPlay(this.bingoCardTilesInPlay);

        this.bingoCardTilesInPlay = this.cardService.getBingoCardTilesInPlay();
        this.cardService.saveBingoGameData(this.bingoCardTilesInPlay);
    }

    clearCard(): void {
        for(let tile of this.bingoCardTilesInPlay){
            tile.active = false;
        }

        this.cardService.saveBingoGameData(this.bingoCardTilesInPlay);
        this.checkForBingo();
    }
}
