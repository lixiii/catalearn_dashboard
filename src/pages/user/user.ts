import { UserProvider } from '../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  isAuthenticated: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    this.isAuthenticated = this.userProvider.isAuthenticated;
  }

}
