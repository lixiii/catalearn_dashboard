import { UserProvider } from '../../providers/user/user';
import { UserDetail } from './../models/user.detail';
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

  public userCredit: Number;
  public authorisedHash: String;
  public accountType: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, 
    private userProvider: UserProvider ) {
    this.events.subscribe( "auth:gotUserDetail", this.loggedinHandler);
  }

  ionViewDidLoad() {
    this.userCredit = this.userProvider.getUserCredit();
    this.authorisedHash = this.userProvider.gerUserAuthorisedHash();
    if ( this.userProvider.getUserDetail() ) {
      let userDetail = this.userProvider.getUserDetail() as UserDetail;
      this.accountType = userDetail.type;
    }
  }

  private loggedinHandler = (userDetail: UserDetail) => {
    this.userCredit = userDetail.credit;
    this.accountType = userDetail.type;
    if ( userDetail.authorisedHash !== undefined ) {
      this.authorisedHash = userDetail.authorisedHash;
    }
  }

}