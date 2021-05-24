import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import { IonicModule } from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {PhotosModule} from "../../components/photos/photos.module";
import {ListingDetailsRoutingModule} from "./listing-details-routing.module";
import {ListingDetailsPage} from "./listing-details";
import {IvyGalleryModule} from "angular-gallery";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ListingDetailsRoutingModule,
    IvyGalleryModule
  ],
  declarations: [
    ListingDetailsPage
  ]
})
export class ListDetailsModule { }
