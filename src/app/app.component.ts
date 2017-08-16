import { Component, OnDestroy, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  isAuthenticated: Boolean = false;
  subscription: Subscription;

  authPages = [
      { title: 'Log in', component: LoginPage, icon: "log-in" },
      { title: "Sign up", component: SignupPage, icon: "add-circle"}
    ];

  loggedInAuthPages = [
      { title: 'Profile', component: ProfilePage, icon: "contact" }
  ];

  loggedInPages = [
      { title: 'Dashboard', component: DashboardPage, icon: "cog" },
  ];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private userProvider: UserProvider) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.subscription = this.userProvider.getAuthStatus().subscribe( authStatus => {
        this.isAuthenticated = authStatus.isAuthenticated;
      } );
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
