import {Component, ViewChild} from "@angular/core";
import {UserData} from "../../providers/user-data";
import {ActivatedRoute, Router} from "@angular/router";
import {AppData} from "../../providers/app-data.service";
import * as moment from 'moment';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'page-comments',
  templateUrl: './comments.html',
  styleUrls: ['./comments.scss']
})
export class CommentsPage {
  constructor(public user: UserData,
              public appData: AppData,
              public toastCtrl: ToastController,
              public router: Router,
              public route: ActivatedRoute) {
  }

  from: string;
  comments = [];
  comment: string;
  @ViewChild('content', {static: false})
  private content: any;

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

  onComment() {
    this.comments.push({name: 'Anonymous Bob', message: this.comment, timePosted: 'Just now'});
  }

  async onDeleteComment(index) {
    this.comments.splice(index, 1);
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 250);
    const toast = await this.toastCtrl.create({
      message: `You've successfully deleted your comment.`,
      duration: 3000
    });
    toast.present();
  }




}
