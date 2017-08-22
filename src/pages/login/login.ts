import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login = { username: "", password: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, private UserService: UserProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * Goes to signup page and passes the username and password to SIgnupPage
   */
  signUp() {
    this.navCtrl.setRoot( SignupPage, {
      username: this.login.username,
      password: this.login.password
    } )
  }

  logIn() {
    // validate form input
    this.UserService.authenticate( this.login.username, this.login.password ).subscribe( 
      isAuthenticated => {
        this.navCtrl.setRoot( DashboardPage );
      }, error => {
        if ( error.status === 400 || error.status === 401 ) {
          // unauthorized
          this.alertCtrl.create({
            title: "Whoooooops!",
            subTitle: "You have had a typo! Please try again! ",
            buttons: ["Sure!"]
          }).present();
        }
        else {
          // genuin server error
          this.alertCtrl.create({
            title: "Whoooooops!",
            subTitle: "Something went wrong with our servers. We are trying to fix it right now. Please try again later ",
            buttons: ["No worries!"]
          }).present();
        }
    });
    
  }

}
