import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
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

    private myCard: any;
    private myTiles: any;
    private tileCount: number;

    @ViewChild('accordion', { static: false}) accordion: ElementRef;


    constructor(private cardService: CardService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.tileCount = 0;
        this.myTiles = [];
        this.myCard = this.cardService.getMyCard();
        console.log('My card: , ', JSON.stringify(this.myCard, null, 2));

        const self = this;
        this.myCard.tileSets.forEach(function(tileSet){
            tileSet.tiles.forEach(function(tile){
                if(tile.inPlay == true){
                    self.tileCount++;
                }
            })
        });
        console.log('tileCount: ', this.tileCount);
    }

    public onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onItemTap(tile): void {
        if(tile.inPlay == true && this.tileCount != 0){
            tile.inPlay = false;
            this.tileCount--;
        } else if(tile.inPlay == false && this.tileCount != 25){
            tile.inPlay = true;
            this.tileCount++;
        }
        console.log(this.tileCount);
        this.cardService.saveCard(this.myCard.id, this.myCard);
    }

    public saveCard(): void {
        this.myCard.tiles = [];
        const self = this;
        this.myCard.tileSets.forEach(function(tileSet){
            tileSet.tiles.forEach(function(tile){
                if(tile.inPlay == true){
                    self.myCard.tiles.push(tile);
                }
            });
        });

        this.cardService.saveCard(this.myCard.id, this.myCard);
        console.log('Card saved!!!');
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
