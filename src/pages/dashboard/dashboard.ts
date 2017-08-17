import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  userCredit: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
    this.events.subscribe( "auth:gotUserDetail", this.loggedinHandler);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    console.log(this.userProvider.userDetail);
  }

  private loggedinHandler = (userDetail) => {
    this.userCredit = userDetail.credit;
  }

}
