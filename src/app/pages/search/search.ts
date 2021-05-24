import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { SearchFilterPage } from '../search-filter/search-filter';
import { AppData } from '../../providers/app-data.service';
import { UserData } from '../../providers/user-data';
import * as moment from "moment";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  styleUrls: ['./search.scss'],
})
export class SearchPage {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  excludeListings: any = [];
  shownSessions: any = [];
  groups: any = [];
  listings: any = [];
  filter =  {category: 'All', condition: 'All', distance: 200}
  confDate: string;
  showSearchbar: boolean;
  favourites = [];
  chats = [];
  sortValue = 'newest';

  constructor(
    public alertCtrl: AlertController,
    public appData: AppData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config
  ) { }

  ionViewDidEnter() {
    this.user.isLoggedIn().then(l => {
      if(l) {
        this.updateListings();
      } else{
        this.router.navigateByUrl("/login", {replaceUrl: true});
      }
    });

    this.ios = this.config.get('mode') === 'ios';
  }

  loadChats() {
    this.appData.getChats().subscribe((data: any) => {
      this.chats = data;
      this.user.getUserMessages().then((userChats) => {
        this.chats = [...this.chats, ...userChats];
        this.chats = this.chats.map((chat) => {
          chat.messages = chat.messages.map((m) => {
            return {...m, friendlyTime: moment(m.time).fromNow()}
          });
          return chat;
        });


        this.listings = this.listings.map((l) => {
          let shouldHide = false;
          if (this.chats.find(c => c.listingId == l.id)) {
             shouldHide = true;
          }
          return {...l, hideForChat: shouldHide};
        })
      });
    });
  }

  sortByNewest() {
    this.listings = this.listings.sort((a, b) => {
      return moment(b.postedOn).unix() - moment(a.postedOn).unix();
    })
  }

  sortByOldest() {
    this.listings = this.listings.sort((a, b) => {
      return moment(a.postedOn).unix() - moment(b.postedOn).unix();
    })
  }

  sortByPopularity() {
    this.listings = this.listings.sort((a, b) => {
      return b.views - a.views;
    })
  }


  updateListings() {

    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.appData.getListings(this.queryText, this.excludeListings).subscribe((data: any) => {
      this.listings = data;
      this.user.getUserListings().then((l => {
        if(l) {
          this.listings = [...this.listings, ...l.map(listing =>{ return {...listing, hide: false}})]
          this.user.getFavouritedListings().then(favourites => {
            this.favourites = this.listings.filter((l) => favourites.indexOf(l.id) != -1).map(l => l.id);

          });
        } else {
          // No user added listings
          this.user.getFavouritedListings().then(favourites => {
            this.favourites = this.listings.filter((l) => favourites.indexOf(l.id) != -1).map(l => l.id);

          });
        }

        this.sortByNewest();

        this.loadChats();
      }))
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { listings: this.listings, filters: this.filter }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeListings = data.excludeListings;
      this.filter = data.filters;
      this.updateListings();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }

  }


  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateListings();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

  isAllHidden(): boolean {
    for (let i = 0; i < this.listings.length; i++) {
      if (this.listings[i].hide == false) {
        return false;
      }
    }

    return true;
  }

  onAddToFavourites(listing) {
    this.user.addToFavourites(listing).then(async () => {
      const toast = await this.toastCtrl.create({
        message: `Successfully saved "${listing.title}" to favourites .`,
        duration: 2000
      });
      toast.present();
      this.updateListings();
    });
  }

  isFavourited(listingId) {
    return this.favourites.indexOf(listingId) != -1;
  }

  onChatWithOwner(listingId) {
    this.user.createUserChat(listingId).then((chatId) => {
      this.router.navigateByUrl("/app/tabs/messages/chat/" + chatId)
    });

  }

  onSort() {
    if (this.sortValue == 'newest') {
      this.sortByNewest();
    }
    if (this.sortValue == 'oldest') {
      this.sortByOldest();
    }

    if (this.sortValue == 'popular') {
      this.sortByPopularity();
    }
  }

}
