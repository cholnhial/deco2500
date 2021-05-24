import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {DiscoverRoutingModule} from "./discover-routing.module";
import {DiscoverPage} from "./discover";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverRoutingModule
  ],
  declarations: [
    DiscoverPage
  ]
})
export class DiscoverModule { }
