import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {MyListingsListPage} from "./my-listings-list";
import {MyListingsListRoutingModule} from "./my-listings-list-routing.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MyListingsListRoutingModule
  ],
  declarations: [MyListingsListPage],
})
export class MyListingsListModule {}
