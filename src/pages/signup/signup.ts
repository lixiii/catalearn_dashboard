import { UserProvider } from '../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
      debugger;
    }, error => {
      this.alertCtrl.create({
        title: "Whoooooops!",
        subTitle: error.json().message,
        buttons: ["Try again!"]
      }).present();
    })
  }

}
