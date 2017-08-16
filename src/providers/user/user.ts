import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class UserProvider {
  private _APILocation = "http://localhost";  // do not add trailing slash
  public isAuthenticated: Boolean = false;
  private authStatusSubject= new Subject <any>();

  constructor( private http: Http ) {
  }
  
  authenticate (username: String, password: String): Observable<Boolean> {

    return this.http.post( `${ this._APILocation }/api/admin/authenticate`, {
      username: username,
      password: password
    }).map( response => {
      if ( response.ok ) {
        // user is authenticated
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }

      this.publishAuthStatus();
      return this.isAuthenticated;
    });
  }


  signup (username: String, password: String, email: String): Observable<Object> {

    return this.http.post( `${ this._APILocation }/api/admin/signup`, {
      username: username,
      password: password,
      email: email
    }).map( response => response);

  }
  
  private publishAuthStatus() {
    // announce to subscribers that isAuthenticated has changed
    this.authStatusSubject.next( { isAuthenticated: this.isAuthenticated } );
  }
  getAuthStatus(): Observable<any> {
    return this.authStatusSubject.asObservable();
  }
  /**
   * Error handler
   * @private
   * @param error 
   */
  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
