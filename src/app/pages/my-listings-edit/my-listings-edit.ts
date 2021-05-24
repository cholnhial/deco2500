import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppData} from '../../providers/app-data.service';
import {ActionSheetController} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Listing} from "../../interfaces/listing";
import {NgForm} from "@angular/forms";
import {PhotosComponent} from "../../components/photos/photos";
import {UserData} from "../../providers/user-data";

@Component({
  selector: 'page-my-listings-edit',
  templateUrl: 'my-listings-edit.html',
  styleUrls: ['./my-listings-edit.scss'],
})
export class MyListingsEditPage {
  listing: Listing = { title: '', available: true, category: 'na', condition: 'na', description: '', location: '', images: []};
  submitted = false;
  userListingId;

  @ViewChild(PhotosComponent, {static: false})
  photos!: PhotosComponent;

  constructor(
    private dataProvider: AppData,
    private userData: UserData,
    private router: Router,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: AppData,
    public inAppBrowser: InAppBrowser,
  ) {}

  ionViewWillEnter() {
    this.userListingId = this.route.snapshot.paramMap.get('userListingId');

    if (this.userListingId != -1) {
      this.userData.getUserListings().then(l => {
        this.listing = l.find(listing => listing.id == this.userListingId);
        this.photos.setImages(this.listing.images);
      });
    }
  }

  onSave(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.userData.signup(this.signup.email);
      //this.menu.enable(true);
      //this.router.navigateByUrl('/app/tabs/search');
      let date = new Date();
      let distance = Math.floor((Math.random() * 100) + 1);

      if(this.userListingId == -1) {
        this.listing = {...this.listing,
          postedOn: date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate(),
          distance: distance.toString(),
          views: distance,
          available: true,
          images: this.photos.getImages()};
          this.userData.saveListing(this.listing, false);
      } else {
        this.userData.saveListing(this.listing, true);
      }

      this.router.navigateByUrl('/app/tabs/my-listings');
    }

  }
}
