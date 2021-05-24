import {Component, ViewChild} from "@angular/core";
import {UserData} from "../../providers/user-data";
import {ActivatedRoute, Router} from "@angular/router";
import {AppData} from "../../providers/app-data.service";
import * as moment from 'moment';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'page-post-profile',
  templateUrl: 'post-profile.html',
  styleUrls: ['./post-profile.scss']
})
export class PostProfilePage {
  constructor(public user: UserData,
              public appData: AppData,
              public toastCtrl: ToastController,
              public router: Router,
              public route: ActivatedRoute) {
  }

  from: string;

  ionViewWillEnter() {
    this.from = this.route.snapshot.queryParamMap.get('from');
  }

  goBack() {
    if (this.from == 'newsfeed') {
      this.router.navigateByUrl("/app/tabs/discover?where=newsfeed", {replaceUrl: true});
    }

    if (this.from == 'saved') {
      this.router.navigateByUrl("/app/tabs/discover?where=saved", {replaceUrl: true});
    }
  }

  async onFollow() {
    const toast = await this.toastCtrl.create({
      message: `You are now following Greta Thunberg.`,
      duration: 3000
    });
    toast.present();
  }




}
