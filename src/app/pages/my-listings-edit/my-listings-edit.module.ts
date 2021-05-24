import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {MyListingsEditPage} from "./my-listings-edit";
import {MyListingsEditPageRoutingModule} from "./my-listings-edit-routing.module";
import {FormsModule} from "@angular/forms";
import {PhotosModule} from "../../components/photos/photos.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    MyListingsEditPageRoutingModule,
    PhotosModule
  ],
  declarations: [
    MyListingsEditPage,
  ]
})
export class MyListingsEditModule { }
