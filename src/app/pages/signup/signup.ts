import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import {MenuController, ToastController} from "@ionic/angular";



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { email: '', password: '', fullName: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public toastCtrl: ToastController,
    public menu: MenuController,
  ) {}

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  async onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.email);
      this.menu.enable(true);
      const toast = await this.toastCtrl.create({
        message: `Your account has been successfully created.`,
        duration: 3000
      });
      toast.present();
      this.router.navigateByUrl('/app/tabs/search');
    }
  }
}
