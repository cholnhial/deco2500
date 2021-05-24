import {Component} from "@angular/core";
import {UserData} from "../../providers/user-data";
import {Listing} from "../../interfaces/listing";
import {AppData} from "../../providers/app-data.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";



@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
  styleUrls: ['./favourites.scss'],
})
export class FavouritesPage {

  listings: Array<Listing> = [];

  constructor(public userData: UserData,
              public router: Router,
              public alertController: AlertController,
              public listingData: AppData) {
  }

  loadListings() {
    this.listingData.getListings('', []).subscribe((data: any) => {
      this.listings = data;
      this.userData.getUserListings().then((l => {

        if(l) {
          this.listings = [...this.listings, ...l.map(listing =>{ return {...listing, hide: false}})]
        }
      }));
      this.filterFavourites();
    });
  }

  filterFavourites() {
    this.userData.getFavouritedListings().then(favourites => {
      this.listings = this.listings.filter((l) => favourites.indexOf(l.id) != -1);
    })
  }

  ionViewWillEnter() {
    this.loadListings();

  }

  async onDeleteFavourite(listing) {
    await this.presentConfirmDelete(listing);
  }

  async presentConfirmDelete(listing) {
    const alert = await this.alertController.create({
      header: 'Delete?',
      message: `Are you sure you wish to delete "${listing.title}" from your favourites?`,
      buttons: [
        {
          text: 'No, Keep it',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // Do nothing
          }
        }, {
          text: 'Yes, Delete',
          handler: () => {
            this.userData.deleteFavourite(listing.id).then(() => {
              this.loadListings();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  onChatWithOwner(listingId) {
    this.userData.createUserChat(listingId).then((chatId) => {
      this.router.navigateByUrl("/app/tabs/messages/chat/" + chatId)
    });
  }


}
