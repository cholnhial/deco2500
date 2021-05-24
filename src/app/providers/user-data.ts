import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Listing} from "../interfaces/listing";
import {Chat} from "../interfaces/chat";
import {Message} from "../interfaces/message";


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';



  constructor(
    public storage: Storage
  ) { }

  getRandomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

  saveListing(listing: Listing, isExisting: boolean = false): void {
    if(!isExisting) {
      let listingId = this.getRandomNumber(1000000, 7);
      this.storage.get('listings').then((listings: Array<Listing>) => {
        if(listings) {
          listing = {...listing, id: listingId};
          listings.push(listing);
          this.storage.set('listings', listings);
        } else {
          listing = {...listing, id: listingId};
          let listings = [listing];
          this.storage.set('listings', listings);
        }

      });
    } else {
      this.storage.get('listings').then((listings: Array<Listing>) => {
        let listingsExcludingModified = listings.filter((l) => l.id != listing.id);
        let listingIncludingNewModification = [...listingsExcludingModified, listing];
        this.storage.set("listings", listingIncludingNewModification);
      });
    }

  }

  async deleteListing(listingId) {
    return this.storage.get('listings').then((listings: Array<Listing>) => {
      listings = listings.filter(l => l.id != listingId);
      this.storage.set('listings', listings);
    });
  }

  async deleteFavourite(listingId) {
    return this.storage.get('favourites').then((favourites: Array<Number>) => {
      favourites = favourites.filter(f => f != listingId);
      this.storage.set('favourites', favourites);
    });
  }

  getUserListings() {
    return this.storage.get('listings');
  }

  async addToFavourites(listing) {
    return this.storage.get('favourites').then((favourites: Array<Number>) => {
      if(favourites) {
        favourites = [...favourites, listing.id];
        this.storage.set('favourites', favourites);
      } else {
        favourites = [listing.id];
        this.storage.set('favourites', favourites);
      }
    });
  }

  async getFavouritedListings() {
    return this.storage.get('favourites').then((favourites: Array<Number>) => {
      if(favourites) {
        return favourites;
      } else {
        return [];
      }
    });
  }

  async createUserChat(listingId) {
    let randomNames = [
      "Arminda Balis"  ,
      "Shanell Lytton" ,
      "Dakota Glasco"  ,
      "Gennie Stam"    ,
      "Kymberly Primme",
      "Lilly Mckinstry",
      "Chuck Kunz"     ,
      "Adria Prochaska",
      "Marilou Olmeda" ,
      "Josefa Flint"   ,
      "Diedra Boggs"   ,
      "Kenisha Edison" ,
      "Sacha Mccawley" ,
      "Teisha Spagnoli",
      "Debbi Jared"    ,
      "Wilhelmina Bugg",
      "Bruce Carlson"  ,
      "Sophia Koop"    ,
      "Isreal Aikens"  ,
      "Clay Whitlow"
    ];

    let chat: Chat  = {id: this.getRandomNumber(1000000, 8), listingId: listingId, messages: [],
      owner: randomNames[Math.floor((Math.random() * randomNames.length - 1) + 0)],
      ownerAvatar: "https://i.pravatar.cc/300"
    };

    return this.storage.get('chats').then((chats) => {
      if (chats) {
        chats = [...chats, chat];
        this.storage.set('chats', chats);
        return chat.id;
      } else {
        this.storage.set('chats', [chat])
        return chat.id;
      }
    });
  }

  async addUserChatMessage(chatId, sender, message) {

    return this.storage.get('chats').then((chats) => {
      if (chats) {
        let chat = chats.find(c => c.id == chatId);
        if(chat) {
          let newMessage:Message = {
            sender: sender,
            message: message,
            time: new Date().toISOString()};
          chat.messages = [...chat.messages, newMessage];
          let chatsWithoutModifiedChat = chats.filter(c => c.id != chat.id);
          chatsWithoutModifiedChat = [...chatsWithoutModifiedChat, chat];
          return this.storage.set('chats', chatsWithoutModifiedChat);
        }
      } else {
        return "NON_USER";
      }
    });
  }

  async addToDeleteChats(chatId) {
    return this.storage.get('deletedChats').then((deletedChats) => {
      if (deletedChats) {
        deletedChats = [...deletedChats, chatId];
        return this.storage.set('deletedChats', deletedChats);
      } else {
        deletedChats = [chatId];
        return this.storage.set('deletedChats', deletedChats);
      }
    });
  }

  async getDeletedChats() {
    return this.storage.get('deletedChats').then((deletedChats) => {
      if (deletedChats) {
        return deletedChats;
      } else {
        return [];
      }
    });
  }

  async getUserMessages() {
    return this.storage.get('chats').then((chats: Array<Chat>) => {
      if(chats) {
        return this.storage.get('deletedChats').then((deletedChats) => {
          if(deletedChats) {
            chats = chats.filter((c) => deletedChats.indexOf(c.id) == -1);
          }
          return chats;
        });
      } else {
        return [];
      }
    });
  }




}
