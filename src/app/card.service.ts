import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase-plugin';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private database: any;
  private bingoCardData: any;

  constructor() { 
    this.database = new Couchbase("data");
    this.bingoCardData = this.getBingoCardData();

    if(!this.bingoCardData) {
        this.bingoCardData = {
          id: 'bingoCardData',
          playForBlackout: false,
          tileSets: [
            {
              name: 'MESSED UP COMMENTS',
              tiles: [
                {
                  text: 'racist comment',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'sexist comment',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'homophobic comment',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'politically inappropriate comment',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'inappropriate comments about money',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'inappropriate joke',
                  active: false,
                  inPlay: true
                },
                {
                  text: "disparaging comment about a group I'm a member of",
                  active: false,
                  inPlay: true
                },
                {
                  text: 'comment undermining my achievements',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'the F-bomb',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'a comment about my clothing',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'a comment about my weight',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'TMI (too much information)',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'mansplaining',
                  active: false,
                  inPlay: true
                }
              ]
            },
            {
              name: 'MESSED UP QUESTIONS',
              tiles: [
                {
                  text: 'When are you having kids?',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'When are you two getting married?',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'Are you pregnant / when is your due date?',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'Are you really going to eat that?',
                  active: false,
                  inPlay: true
                },
                {
                  text: "Why aren't you finishing that?",
                  active: false,
                  inPlay: true
                }              
              ]  
            },
            {
              name: 'MESSED UP BEHAVIORS',
              tiles: [
                {
                  text: 'drinking too much',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'being rude to restaurant staff',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'twisting around a previous comment',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'victim blaming',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'all or nothing thinking',
                  active: false,
                  inPlay: true
                },
                {
                  text: 'pets jumping on me',
                  active: false,
                  inPlay: true
                },
                {
                  text: "pets peeing / pooping / puking",
                  active: false,
                  inPlay: true
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
          tilesInPlay: [{
            active: false,
            inPlay: true,
            text: 'free'
          }]
        };

        this.initializeDatabase();
    }
  }

  private initializeDatabase() {
    this.database.createDocument(this.bingoCardData, this.bingoCardData.id);
  }

  public saveBingoCardData(bingoCardData: any) {
    if (this.database.getDocument(bingoCardData.id)) {
      this.database.updateDocument(bingoCardData.id, bingoCardData);
    }
  }

  public saveBingoGameData(bingoCardTilesInPlay: Array<object>): void {
    this.bingoCardData.tilesInPlay = bingoCardTilesInPlay;
    this.saveBingoCardData(this.bingoCardData);
  }

  public getBingoCardData() {
    return this.database.getDocument('bingoCardData');
  }

  public getBingoCardTilesInPlay() {
    return this.bingoCardData.tilesInPlay;
  }
  
  public getPlayForBlackout() {
    return this.bingoCardData.playForBlackout;
  }

  public savePlayForBlackout(playForBlackout: boolean) {
    this.bingoCardData.playForBlackout = playForBlackout;
    this.saveBingoCardData(this.bingoCardData);
  }

  public shuffleBingoCardTilesInPlay(tilesInPlay) {
    return new Promise((resolve, reject) => {
      this.shuffleArray(tilesInPlay);
      this.saveBingoGameData(tilesInPlay);
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
