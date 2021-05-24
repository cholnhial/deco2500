import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {ChatPage} from "./chat";
import {ChatRoutingModule} from "./chat-routing.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ChatRoutingModule
  ],
  declarations: [
    ChatPage
  ]
})
export class ChatModule { }
