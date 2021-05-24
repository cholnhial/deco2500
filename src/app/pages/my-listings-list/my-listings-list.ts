import { Component } from '@angular/core';
import { AppData } from '../../providers/app-data.service';
import {UserData} from "../../providers/user-data";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'page-my-listings-list',
  templateUrl: 'my-listings-list.html',
  styleUrls: ['./my-listings-list.scss'],
})
export class MyListingsListPage {

  constructor(public confData: AppData, public userData: UserData, public alertController: AlertController) {}

  listings = [];

  loadListings() {
    this.userData.getUserListings().then((listing) => {
      this.listings = listing;
    });
  }
  ionViewDidEnter() {
   this.loadListings();
  }

  async onDeleteListing(listing) {
    await this.presentConfirmDelete(listing);
  }

  async presentConfirmDelete(listing) {
    const alert = await this.alertController.create({
      header: 'Delete?',
      message: `Are you sure you wish to delete "${listing.title}"?`,
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
            this.userData.deleteListing(listing.id).then(() => {
              this.loadListings();
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
