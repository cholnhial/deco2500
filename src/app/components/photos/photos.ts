import {Component} from "@angular/core";


@Component({
  selector: 'component-photos',
  templateUrl: 'photos.html',
  styleUrls: ['./photos.scss'],
})
export class PhotosComponent {
  images = [];
  constructor() {
  }

  onRemoveImage(imageIndex) {
    this.images.splice(imageIndex, 1);
  }

  onAddImage() {
    this.images.push("https://source.unsplash.com/900x583/?nature,water&version=" + this.getRandomString(5));
  }

   getRandomString(length) {
    let result           = [];
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }

  getImages() {
    return this.images;
  }

  setImages(images) {
    this.images = images;
  }

}
