import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostProfilePage} from "./post-profile";


const routes: Routes = [
  {
    path: '',
    component: PostProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostProfileRoutingModule { }
