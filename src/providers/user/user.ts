import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { UserDetail } from '../../models/user.detail';

@Injectable()
export class UserProvider {
  private _APILocation = "http://localhost:8080";  // do not add trailing slash
  public isAuthenticated: Boolean = false;
  public userDetail: UserDetail;

  constructor( private http: Http, private events: Events ) {
    this.events.subscribe( "auth:loggedIn", this._getUserDetail );
  }
  
  authenticate (username: String, password: String): Observable<Boolean> {

    return this.http.post( `${ this._APILocation }/api/admin/authenticate`, {
      username: username,
      password: password
    }, {withCredentials: true}).map( response => {
      if ( response.ok ) {
        // user is authenticated
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }

      this.events.publish( "auth:loggedIn", this.isAuthenticated );
      return this.isAuthenticated;
    });
  }


  signup (username: String, password: String, email: String): Observable<Object> {

    return this.http.post( `${ this._APILocation }/api/admin/signup`, {
      username: username,
      password: password,
      email: email
    }, {withCredentials: true}).map( response => {
      if( response.ok ) {
        this.isAuthenticated = true;
        this.events.publish( "auth:loggedIn", this.isAuthenticated );
      }
      return response;
    } );

  }

  logout (): Observable<any> {
    return this.http.post( `${ this._APILocation }/api/admin/logout`, {}, {withCredentials: true}).map( res => res as any );
  }
  
  private _getUserDetail = () => {
    this.http.get( `${ this._APILocation }/api/admin/user`, {withCredentials: true}).map( res => res ).subscribe( ( res ) => {
      this.userDetail = res.json();
      this.events.publish("auth:gotUserDetail", this.userDetail);
    } );
  }

  getUserCredit(): Number {
    return this.userDetail !== undefined ? this.userDetail.credit: 0;
  }

  getUserHash(): String {
    return this.userDetail !== undefined && this.userDetail.hash !== undefined ? this.userDetail.hash: "none";
  }

  getUserDetail(): UserDetail | Boolean {
    return this.userDetail !== undefined ? this.userDetail: false;
  }

  refreshUserDetail(): void {
    this._getUserDetail();
  }

  /**
   * Error handler
   * @private
   * @param error 
   */
  // private handleError(error: any): Promise<any> {
  //   // console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
}
