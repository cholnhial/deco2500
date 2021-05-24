import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {CommentsRoutingModule} from "./comments-routing.module";
import {CommentsPage} from "./comments";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsRoutingModule
  ],
  declarations: [
    CommentsPage
  ]
})
export class CommentsModule { }
