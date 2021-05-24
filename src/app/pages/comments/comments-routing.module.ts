import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CommentsPage} from "./comments";

const routes: Routes = [
  {
    path: '',
    component: CommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
