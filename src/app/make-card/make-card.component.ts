import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";

import * as app from "tns-core-modules/application";

import { CardService } from './../card.service';

import { registerElement } from 'nativescript-angular/element-registry';
registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);

import { Repeater } from "tns-core-modules/ui/repeater";

@Component({
    selector: "MakeCard",
    templateUrl: "./make-card.component.html",
    styleUrls: ["./make-card.component.scss"]
})
export class MakeCardComponent implements OnInit {

    bingoCardData: any;
    tileCount: number;

    @ViewChild('accordion', { static: false}) accordion: ElementRef;


    constructor(private cardService: CardService, private routerExtensions: RouterExtensions) {
        this.bingoCardData = this.cardService.getBingoCardData();
        //console.log('My card: ', JSON.stringify(this.bingoCardData.tilesInPlay.length, null, 2));
    }

    ngOnInit(): void {
        this.tileCount = 0;

        const self = this;
        this.bingoCardData.tileSets.forEach(function(tileSet){
            tileSet.tiles.forEach(function(tile){
                if(tile.inPlay == true){
                    self.tileCount++;
                }
            })
        });

        dialogs.confirm({
            title: "HOW TO MAKE YOUR CARD",
            message: "Tap to select 24 items from this messed up list.\n\n When you have enough messed up items, tap the play button.\n\nUm... Have fun?",
            okButtonText: "Okay",
        }).then(result => {
            
        });
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onItemTap(tile: any): void {
        if(tile.inPlay == true && this.tileCount != 0){
            tile.inPlay = false;
            this.tileCount--;
        } else if(tile.inPlay == false && this.tileCount != 24){
            tile.inPlay = true;
            this.tileCount++;
        } else if (tile.inPlay == false && this.tileCount == 24){
            dialogs.confirm({
                message: "You can only pick 24 messed up things.",
                okButtonText: "Okay",
            }).then(result => {
                
            });
        }
        
        this.cardService.saveBingoCardData(this.bingoCardData);
    }

    public async saveCard(): Promise<any> {
        let tilesInPlay = [];
        const freeTile = {active: false, inPlay: true, text: 'free'};

        this.bingoCardData.tileSets.forEach(function(tileSet){
            tileSet.tiles.forEach(function(tile: any){
                if(tile.inPlay){
                    tilesInPlay.push(tile);
                }
            });
        });

        tilesInPlay.splice(12, 0, freeTile);

        this.bingoCardData.tilesInPlay = tilesInPlay;
        this.bingoCardData = await this.cardService.saveBingoCardData(this.bingoCardData);
        
        this.routerExtensions.navigate(['/play'], {
            transition: {
                name: "fade"
            }
        });
        
    }

    public headerTemplateSelector = (item: any, index: number, items: any) => {
        return index % 2 === 0 ? 'header-odd' : 'header-even';
    }

    public itemHeaderTemplateSelector = (item: any, index: number, items: any) => {
        return index % 2 === 0 ? 'title-even' : 'title-odd';
    }

    public itemContentTemplateSelector = (item: any, index: number, items: any) => {
        return index % 2 === 0 ? 'content-even' : 'content-odd';
    }

    public footerTemplateSelector = (item: any, index: number, items: any) => {
        return index % 2 === 0 ? 'footer-even' : 'footer-odd';
    }    
}
