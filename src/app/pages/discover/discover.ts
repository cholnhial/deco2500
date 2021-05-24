import {Component} from "@angular/core";
import {Config, PopoverController, ToastController} from "@ionic/angular";

@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
  styleUrls: ['./discover.scss']
})
export class DiscoverPage {

  ios = false;
  segment = 'news-feed';
  postLikes = 20;
  constructor(public config: Config, public toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.ios = this.config.get('mode') === 'ios';
  }

  onLikePost() {
    this.postLikes++;
  }

  async onPostArticle() {
    const toast = await this.toastCtrl.create({
      message: `You've successfully posted a new article.`,
      duration: 2000
    });
    toast.present();
  }

  async onSavePost() {
    const toast = await this.toastCtrl.create({
      message: `The post has been successfully added to your saved posts.`,
      duration: 3000
    });
    toast.present();
  }

  async onPostVideo() {
    const toast = await this.toastCtrl.create({
      message: `You've successfully posted a new video.`,
      duration: 2000
    });
    toast.present();
  }

  async onPostPhoto() {
    const toast = await this.toastCtrl.create({
      message: `You've successfully posted a new photo.`,
      duration: 2000
    });
    toast.present();
  }

}
