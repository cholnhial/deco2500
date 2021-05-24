import { Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

import { AppData } from '../../providers/app-data.service';


@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html',
  styleUrls: ['./search-filter.scss'],
})
export class SearchFilterPage {
  ios: boolean;
  filter =  {category: 'All', condition: 'All', distance: 200};

  listings: any;

  tracks: {name: string, icon: string, isChecked: boolean}[] = [];

  constructor(
    public confData: AppData,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {

  }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;

    this.listings = this.navParams.get('listings');
    this.filter = this.navParams.get('filters');

    /*this.appData.getTracks().subscribe((tracks: any[]) => {
      tracks.forEach(track => {
        this.tracks.push({
          name: track.name,
          icon: track.icon,
          isChecked: (excludedTrackNames.indexOf(track.name) === -1)
        });
      });
    });*/
  }

  resetFilter() {
    this.filter =  {category: 'All', condition: 'All', distance: 200};
  }

  applyFilters() {
    // Pass back a new array of listings ids to exclude
    const excludedListings = this.listings.filter((listing: any) => !this.shouldKeepListing(listing))
      .map((listing: any) => listing.id);

    console.log(excludedListings);
    this.dismiss(excludedListings);
  }

  shouldKeepListing(listing: any) {

    if (this.filter.category == 'All' && this.filter.condition == 'All' && this.filter.distance > listing.distance) {
      return true;
    }

    // Category ALL
    if (this.filter.category.toLowerCase() == 'All') {

      // Only condition has to match
      if (this.filter.condition.toLowerCase() == 'All') {
        // Only distance to check
        if(this.filter.distance > listing.distance) {
          console.log("Listing ID: " + listing.id);
          return true;
        }
      }
      // Check the listing condition
      else if(this.filter.condition.toLowerCase() == listing.condition.toLowerCase()) {
        // Check the distance
        if(this.filter.distance > listing.distance) {
          return true;
        }
      }

    }

    if (this.filter.category.toLowerCase() == listing.category.toLowerCase()) {
      // Condition all
      // Only condition has to match
      if (this.filter.condition == 'All') {
        // Only distance to check
        if(this.filter.distance > listing.distance) {
          return true;
        }
      }

      // Check the listing condition
      else if(this.filter.condition.toLowerCase() == listing.condition.toLowerCase()) {
        // Check the distance
        if(this.filter.distance > listing.distance) {
          return true;
        }
      }
    }

   return false;
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss({excludeListings: data, filters: this.filter});
  }
}
