import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public username: String;
  public email: String;
  
  constructor( public navCtrl: NavController, 
    public navParams: NavParams, 
    private userProvider: UserProvider
   ) {
    this.username = this.userProvider.userDetail.username;
    this.email = this.userProvider.userDetail.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
