import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {PostProfileRoutingModule} from "./post-profile-routing.module";
import {PostProfilePage} from "./post-profile";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostProfileRoutingModule
  ],
  declarations: [
    PostProfilePage
  ]
})
export class PostProfileModule { }
