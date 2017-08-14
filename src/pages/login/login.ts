import { DashboardPage } from '../dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
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
    this.navCtrl.push( SignupPage, {
      username: this.login.username,
      password: this.login.password
    } )
  }

  logIn() {
    this.UserService.authenticate( this.login.username, this.login.password ).subscribe( 
      isAuthenticated => {

        // if authenticated
        if ( isAuthenticated ) {

          this.navCtrl.push( DashboardPage );
          
        } else {

          this.alertCtrl.create({
            title: "Whoooooops!",
            subTitle: "You have had a type! Please try again! ",
            buttons: ["Sure!"]
          }).present();

        }
      
      }, error => {

        this.alertCtrl.create({
          title: "Whoooooops!",
          subTitle: "Something went wrong with our servers. We are trying to fix it right now. Please try again later ",
          buttons: ["No worries!"]
        }).present();

    }, () => {
      // console.log('finished');
    } )
      ;
  }

}
