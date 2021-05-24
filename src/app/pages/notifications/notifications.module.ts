import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';;
import {NotificationsRoutingModule} from "./notifications-routing.module";
import {NotificationsPage} from "./notifications";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsRoutingModule
  ],
  declarations: [
    NotificationsPage
  ]
})
export class NotificationsModule { }
