import {Component} from "@angular/core";
import {UserData} from "../../providers/user-data";
import {ActivatedRoute, Router} from "@angular/router";
import {AppData} from "../../providers/app-data.service";
import {Gallery} from 'angular-gallery';
import * as moment from 'moment';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'page-listing-details',
  templateUrl: 'listing-details.html',
  styleUrls: ['./listing-details.scss']
})
export class ListingDetailsPage {
  constructor(public user: UserData,
              public appData: AppData,
              public toastCtrl: ToastController,
              public router: Router,
              public gallery: Gallery,
              public route: ActivatedRoute) {
  }

  listingId: number;
  listing: any;
  listings: any;
  hideChatButton = false;
  hideFavouriteButton = false;
  from: string;

  ionViewWillEnter() {
    this.listingId = Number.parseInt(this.route.snapshot.paramMap.get('listingId'));
    this.from = this.route.snapshot.queryParamMap.get('from');

    if (this.from === 'chat') {
      this.hideChatButton = true;
    }

    if (this.from === 'favourite') {
      this.hideFavouriteButton = true;
    }

    this.appData.getListings('', []).subscribe((data: any) => {
      this.listings = data;
      this.user.getUserListings().then((l => {
        if(l) {
          this.listings = [...this.listings, ...l.map(listing =>{ return {...listing, hide: false}})]
        } else {
          // do nothing
        }
        this.listing = this.listings.find(l => l.id == this.listingId);
        this.listing.friendlyPostedTime = moment(this.listing.postedOn).fromNow(true);
      }))

    });
  }

  showGallery(index: number) {
    let prop = {
      images: [...this.listing.images.map(i => {return {path: i}})],
      index
    };
    this.gallery.load(prop);
  }
  onChatWithOwner(listingId) {
    this.user.createUserChat(listingId).then((chatId) => {
      this.router.navigateByUrl("/app/tabs/messages/chat/" + chatId)
    });

  }

  onAddToFavourites(listing) {
    this.user.addToFavourites(listing).then(async () => {
      const toast = await this.toastCtrl.create({
        message: `Successfully saved "${listing.title}" to favourites .`,
        duration: 2000
      });
      toast.present();
      this.hideFavouriteButton = true;
    });
  }

  goBack() {
    if (this.from == 'chat') {
      this.router.navigateByUrl("/app/tabs/messages", {replaceUrl: true});
    }

    if (this.from == 'search') {
      this.router.navigateByUrl("/app/tabs/search", {replaceUrl: true});
    }

    if (this.from == 'favourite') {
      this.router.navigateByUrl("/app/tabs/favourites", {replaceUrl: true});
    }
  }
}
