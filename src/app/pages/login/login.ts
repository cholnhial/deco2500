import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import {MenuController} from "@ionic/angular";



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { email: 'Anonymous Person', password: 'password' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public menu: MenuController
  ) { }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.email);
      this.menu.enable(true);
      this.router.navigateByUrl('/app/tabs/search');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

}
