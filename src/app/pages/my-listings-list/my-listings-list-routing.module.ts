import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MyListingsListPage} from "./my-listings-list";
const routes: Routes = [
  {
    path: '',
    component: MyListingsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyListingsListRoutingModule {}
