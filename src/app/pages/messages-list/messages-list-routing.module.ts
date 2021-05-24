import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MessagesListPage} from "./messages-list";

const routes: Routes = [
  {
    path: '',
    component: MessagesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesListRoutingModule {}
