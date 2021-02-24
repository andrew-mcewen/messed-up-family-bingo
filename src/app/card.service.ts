import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase-plugin';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private couchbase: any;
  private bingoCardData: any;

  constructor() { 
    this.couchbase = new Couchbase("data");
    this.bingoCardData = this.getBingoCardData();

    if(this.bingoCardData && this.bingoCardData.id != 'bingoCardData') {
        this.initializeCouchbase();
    } else {
      console.log(`\nCouchbase initialized - ID: ${this.bingoCardData.id} TILES IN PLAY: ${this.bingoCardData.tilesInPlay.length}`)
    }
  }

  private initializeCouchbase() {
    console.log('Initializing couchbase...');

    const bingoCardData = {
      id: 'bingoCardData',
      playForBlackout: false,
      tileSets: [
        {
          name: 'MESSED UP COMMENTS',
          tiles: [
            {
              text: 'racist comment',
              active: false,
              inPlay: false
            },
            {
              text: 'sexist comment',
              active: false,
              inPlay: false
            },
            {
              text: 'homophobic comment',
              active: false,
              inPlay: false
            },
            {
              text: 'politically inappropriate comment',
              active: false,
              inPlay: false
            },
            {
              text: 'inappropriate comments about money',
              active: false,
              inPlay: false
            },
            {
              text: 'inappropriate joke',
              active: false,
              inPlay: false
            },
            {
              text: "disparaging comment about a group I'm a member of",
              active: false,
              inPlay: false
            },
            {
              text: 'comment undermining my achievements',
              active: false,
              inPlay: false
            },
            {
              text: 'the F-bomb',
              active: false,
              inPlay: false
            },
            {
              text: 'a comment about my clothing',
              active: false,
              inPlay: false
            },
            {
              text: 'a comment about my weight',
              active: false,
              inPlay: false
            },
            {
              text: 'TMI (too much information)',
              active: false,
              inPlay: false
            },
            {
              text: 'mansplaining',
              active: false,
              inPlay: false
            }
          ]
        },
        {
          name: 'MESSED UP QUESTIONS',
          tiles: [
            {
              text: 'When are you having kids?',
              active: false,
              inPlay: false
            },
            {
              text: 'When are you two getting married?',
              active: false,
              inPlay: false
            },
            {
              text: 'Are you pregnant / when is your due date?',
              active: false,
              inPlay: false
            },
            {
              text: 'Are you really going to eat that?',
              active: false,
              inPlay: false
            },
            {
              text: "Why aren't you finishing that?",
              active: false,
              inPlay: false
            }              
          ]  
        },
        {
          name: 'MESSED UP BEHAVIORS',
          tiles: [
            {
              text: 'drinking too much',
              active: false,
              inPlay: false
            },
            {
              text: 'being rude to restaurant staff',
              active: false,
              inPlay: false
            },
            {
              text: 'twisting around a previous comment',
              active: false,
              inPlay: false
            },
            {
              text: 'victim blaming',
              active: false,
              inPlay: false
            },
            {
              text: 'all or nothing thinking',
              active: false,
              inPlay: false
            },
            {
              text: 'pets jumping on me',
              active: false,
              inPlay: false
            },
            {
              text: "pets peeing / pooping / puking",
              active: false,
              inPlay: false
            },
            {
              text: 'children peeing / pooping / puking',
              active: false,
              inPlay: false
            },
            {
              text: 'drunk adults peeing / pooping / puking',
              active: false,
              inPlay: false
            },
            {
              text: 'telling the same story over and over again',
              active: false,
              inPlay: false
            },
            {
              text: 'spilling food / drinking excessively',
              active: false,
              inPlay: false
            },
            {
              text: 'an argument gets out of hand',
              active: false,
              inPlay: false
            },
            {
              text: 'excessive PDA (public displays of affection)',
              active: false,
              inPlay: false
            },
            {
              text: 'excessive texting or phone-checking',
              active: false,
              inPlay: false
            },
            {
              text: 'sharing naked baby pictures',
              active: false,
              inPlay: false
            },
            {
              text: 'comparing you to your sibling',
              active: false,
              inPlay: false
            },
            {
              text: 'excessive lateness / no-show',
              active: false,
              inPlay: false
            },
            {
              text: 'unwanted hug',
              active: false,
              inPlay: false
            },
            {
              text: 'hug that lasts too long',
              active: false,
              inPlay: false
            },
            {
              text: 'storming out',
              active: false,
              inPlay: false
            },
            {
              text: 'slamming a door',
              active: false,
              inPlay: false
            },
            {
              text: 'pounding a table for emphasis',
              active: false,
              inPlay: false
            }
          ]  
        },
        {
          name: 'UNSOLICITED ADVICE',
          tiles: [
            {
              text: 'unsolicited parenting advice',
              active: false,
              inPlay: false
            },
            {
              text: 'unsolicited career advice',
              active: false,
              inPlay: false
            },
            {
              text: 'unsolicited fashion advice',
              active: false,
              inPlay: false
            },
            {
              text: 'unsolicited diet / fitness advice',
              active: false,
              inPlay: false
            },
            {
              text: 'unsolicited dating advice',
              active: false,
              inPlay: false
            },
            {
              text: 'unsolicited advice of any kind',
              active: false,
              inPlay: false
            }                
          ]  
        },
        {
          name: 'MESSED UP SITUATIONS',
          tiles: [
            {
              text: 'no one wants to clean up',
              active: false,
              inPlay: false
            },
            {
              text: 'awkward silence',
              active: false,
              inPlay: false
            },
            {
              text: 'uncomfortable tension',
              active: false,
              inPlay: false
            },
            {
              text: 'talking about the kids while they are right there',
              active: false,
              inPlay: false
            },
            {
              text: "overhearing things you weren't meant to overhear",
              active: false,
              inPlay: false
            },
            {
              text: 'taking a joke too far',
              active: false,
              inPlay: false
            },
            {
              text: 'not being able to take a joke',
              active: false,
              inPlay: false
            },
            {
              text: 'making someone cry',
              active: false,
              inPlay: false
            },
            {
              text: 'sneaking out to smoke / drink',
              active: false,
              inPlay: false
            },
            {
              text: 'making up an excuse to leave early',
              active: false,
              inPlay: false
            },
            {
              text: 'clearly avoiding the elephant in the room',
              active: false,
              inPlay: false
            }                              
          ]  
        },
        {
          name: 'MESSED UP THINKING',
          tiles: [
            {
              text: 'inability to apologize',
              active: false,
              inPlay: false
            },
            {
              text: "inability to take another person's perspective",
              active: false,
              inPlay: false
            },
            {
              text: 'talking down to me in my area of expertise',
              active: false,
              inPlay: false
            },
            {
              text: 'unhealthy diet culture',
              active: false,
              inPlay: false
            },
            {
              text: 'espousing a conspiracy theory',
              active: false,
              inPlay: false
            },
            {
              text: 'fishing for compliments',
              active: false,
              inPlay: false
            },
            {
              text: 'taking something too personally',
              active: false,
              inPlay: false
            }                 
          ]  
        }
      ],
      tilesInPlay: []
    };

    this.couchbase.createDocument(bingoCardData, bingoCardData.id);
  }

  public saveBingoCardData(bingoCardData: any) {
    return new Promise((resolve, reject) => {
      if (this.couchbase.getDocument(bingoCardData.id)) {
        this.couchbase.updateDocument(bingoCardData.id, bingoCardData);
        resolve(bingoCardData);
      }
    })
  }

  public saveBingoGameData(bingoCardTilesInPlay: Array<object>): Promise<any> {
    return new Promise(async (resolve, reject) => {      
      try {
        const bingoCardData = this.getBingoCardData();      
        bingoCardData.tilesInPlay = bingoCardTilesInPlay;
        const savedBingoGameData = await this.saveBingoCardData(bingoCardData);
        resolve(savedBingoGameData);
      } catch (err) {
        reject('Error saving bingo game data: ' + err.message || err);
      }
    });
  }

  public getBingoCardData() {
    const bingoCardData = this.couchbase.getDocument('bingoCardData');
    if (bingoCardData){
      return bingoCardData;
    } else {
      console.log('Error getting bingo card data: ', bingoCardData);
      return null;
    }
  }

  public getBingoCardTilesInPlay() {
    const bingoCardTilesInPlay = this.couchbase.getDocument('bingoCardData').tilesInPlay;
    if (Array.isArray(bingoCardTilesInPlay)){
      return bingoCardTilesInPlay;
    } else {
      console.log('Error getting bingo card tiles in play: ', bingoCardTilesInPlay);
      return null;
    }
  }
  
  public getPlayForBlackout() {
    return this.bingoCardData.playForBlackout;
  }

  public savePlayForBlackout(playForBlackout: boolean) {
    return new Promise((resolve, reject) => {
      const bingoCardData = this.getBingoCardData();
      bingoCardData.playForBlackout = playForBlackout;
      this.saveBingoCardData(bingoCardData);
      resolve();
    });
  }

  public shuffleBingoCardTilesInPlay(tilesInPlay): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const freeTileIndex = tilesInPlay.findIndex(tile => {
        return tile.text == 'free';
      });
      const freeTile = tilesInPlay.splice(freeTileIndex, 1);
      tilesInPlay = this.shuffleArray(tilesInPlay);
      tilesInPlay.splice(12, 0, freeTile[0]);
      await this.saveBingoGameData(tilesInPlay);
      resolve(tilesInPlay);
    });
  }

  private shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

}
