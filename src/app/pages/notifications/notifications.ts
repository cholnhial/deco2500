import {Component, ViewChild} from "@angular/core";
import {UserData} from "../../providers/user-data";
import {ActivatedRoute, Router} from "@angular/router";
import {AppData} from "../../providers/app-data.service";
import * as moment from 'moment';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  styleUrls: ['./notifications.scss']
})
export class NotificationsPage {
  constructor(public user: UserData,
              public appData: AppData,
              public toastCtrl: ToastController,
              public router: Router,
              public route: ActivatedRoute) {
  }


}
