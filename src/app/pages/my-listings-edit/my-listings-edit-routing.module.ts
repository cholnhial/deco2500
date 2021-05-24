import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyListingsEditPage} from "./my-listings-edit";

const routes: Routes = [
  {
    path: '',
    component: MyListingsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyListingsEditPageRoutingModule { }
