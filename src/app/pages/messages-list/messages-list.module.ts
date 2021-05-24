import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MessagesListRoutingModule} from "./messages-list-routing.module";
import {MessagesListPage} from "./messages-list";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MessagesListRoutingModule
  ],
  declarations: [MessagesListPage]
})
export class MessagesListModule {}
