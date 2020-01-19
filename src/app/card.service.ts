import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase-plugin';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private database: any;
  private myCard: any;

  constructor() { 
    this.database = new Couchbase("data");
    this.myCard = this.getMyCard();

    if(!this.myCard) {
        this.myCard = {
          id: 'myCard',
          name: 'My Card',
          tiles: [
            { text: 'racist comment', active: false, inPlay: true},
            { text: 'inappropriate joke', active: false, inPlay: true},
            { text: "the F-bomb", active: false, inPlay: true},
            { text: 'mansplaining', active: false, inPlay: true},
            { text: 'TMI (too much information)', active: false, inPlay: true},
            { text: 'When are you two getting married?', active: false, inPlay: true},
            { text: 'inability to apologize', active: false, inPlay: true},
            { text: 'comment undermining my achievements', active: false, inPlay: true},
            { text: 'storming out', active: false, inPlay: true},
            { text: 'arguing about politics', active: false, inPlay: true},
            { text: 'clearly avoiding the elephant in the room', active: false, inPlay: true},
            { text: 'drunk adults peeing / pooping / puking', active: false, inPlay: true},
            { text: 'awkward silence', active: false, inPlay: true},
            { text: 'telling the same story over and over again', active: false, inPlay: true},
            { text: 'excessive PDA (public displays of affection)', active: false, inPlay: true},
            { text: 'unhealthy diet culture', active: false, inPlay: true},
            { text: 'unsolicited dating advice', active: false, inPlay: true},
            { text: 'sneaking out to smoke / drink', active: false, inPlay: true},
            { text: 'Are you really going to eat that?', active: false, inPlay: true},
            { text: 'being rude to restaurant staff', active: false, inPlay: true},
            { text: 'pounding a table for emphasis', active: false, inPlay: true},
            { text: 'unwanted hug', active: false, inPlay: true},
            { text: 'fishing for compliments', active: false, inPlay: true},
            { text: 'espousing a conspiracy theory', active: false, inPlay: true}
          ],
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
          freeTile: { 
            text: '', 
            active: false, 
            inPlay: true
          }
        }
        this.makeCard(this.myCard.id, this.myCard)
    }
  }

  private makeCard(cardId : string, cardData: any) {
    this.database.createDocument(cardData, cardId);
  }

  public saveCard(cardId: string, cardData: any) {
    let document = this.database.getDocument(cardId);
    if(document){
      this.database.updateDocument(cardId, cardData);
    }
  }

  public getMyCard() {
    return this.database.getDocument('myCard');
  }
}
