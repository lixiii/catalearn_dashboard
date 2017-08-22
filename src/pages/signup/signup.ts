import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  userInput = {
    username: "",
    password: "",
    email: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private alertCtrl: AlertController) {
    this.userInput.username = navParams.get("username");
    this.userInput.password = navParams.get("password");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp() {

    this.userProvider.signup( this.userInput.username, this.userInput.password, this.userInput.email ).subscribe( response => {
      this.navCtrl.setRoot( DashboardPage );      
    }, error => {
      this.alertCtrl.create({
        title: "Whoooooops!",
        subTitle: error.json().message,
        buttons: ["Try again!"]
      }).present();
    })
  }

}
