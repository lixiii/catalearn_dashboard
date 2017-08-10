import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signup = {
    username: "",
    password: "",
    email: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.signup.username = navParams.get("username");
    this.signup.password = navParams.get("password");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp() {

  }

}
