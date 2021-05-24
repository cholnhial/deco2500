import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListingDetailsPage} from "./listing-details";

const routes: Routes = [
  {
    path: '',
    component: ListingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingDetailsRoutingModule { }
