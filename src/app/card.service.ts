import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase-plugin';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private database: any;
  private myCard: any;
  private myTiles: any;

  constructor() { 
    this.database = new Couchbase("data");
    this.myCard = this.getMyCard();

    if(!this.myCard) {
        this.myCard = {
          id: 'myCard',
          name: 'My Card',
          tiles: [
            { text: 'someone drinks too much', active: false, inPlay: true},
            { text: 'someone says a racist comment', active: false, inPlay: true},
            { text: "someone doesn't show up", active: false, inPlay: true},
            { text: 'someone says a sexist comment', active: false, inPlay: true},
            { text: 'someone gets hit', active: false, inPlay: true},
            { text: 'the cops show up', active: false, inPlay: true},
            { text: 'someone watches tv the entire time', active: false, inPlay: true},
            { text: 'someone steals from someone else', active: false, inPlay: true},
            { text: 'someone brings a guest without asking', active: false, inPlay: true},
            { text: 'arguing about politics', active: false, inPlay: true},
            { text: 'arguing about religion', active: false, inPlay: true},
            { text: 'someone starts crying', active: false, inPlay: true},
            { text: 'someone is on drugs', active: false, inPlay: true},
            { text: 'someone falls asleep at the wrong time', active: false, inPlay: true},
            { text: 'someone gets hurt riding a scooter', active: false, inPlay: true},
            { text: 'someone talks too much', active: false, inPlay: true},
            { text: 'someone gets caught smoking', active: false, inPlay: true},
            { text: 'someone asks about your sex life', active: false, inPlay: true},
            { text: 'someone gossips about another family member', active: false, inPlay: true},
            { text: 'someone makes a comment about your weight', active: false, inPlay: true},
            { text: 'somone burns the dinner', active: false, inPlay: true},
            { text: 'a pet gets loose', active: false, inPlay: true},
            { text: 'someone breaks a thing', active: false, inPlay: true},
            { text: 'someone asks to borrow money', active: false, inPlay: true}
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
                  text: 'comment undermining my accomplishments',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'the F-bomb',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'commenting on my clothing',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'commenting on my weight',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'someone sharing TMI (too much information)',
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
                  text: 'When are you going to have kids?',
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
                  text: 'someone drinking too much',
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
                  text: 'someone telling the same story over and over again',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'spilling food / drink excessively',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'an argument that gets out of hand',
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
                  text: 'someone is excessively late or no-shows',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'unwelcomed hug',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'a hug that lasts too long',
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
                  text: 'awkward moment when no one wants to clean up',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'uncomfortable silence',
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
                  text: 'someone is brought to tears',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'someone sneaks out to smoke / drink',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'someone makes up an excuse to leave early',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'everyone clearly avoiding the elephant in the room',
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
                  text: 'someone espousing a conspiracy theory',
                  active: false,
                  inPlay: false
                },
                {
                  text: 'someone fishing for compliments',
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
          ]
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
