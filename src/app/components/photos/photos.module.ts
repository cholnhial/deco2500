import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {PhotosComponent} from "./photos";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    PhotosComponent
  ],
  declarations: [
    PhotosComponent
  ]
})
export class PhotosModule { }
