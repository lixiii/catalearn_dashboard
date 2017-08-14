import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserProvider {
  private _APILocation = "http://localhost";  // do not add trailing slash
  public isAuthenticated: Boolean = false;

  constructor( private http: Http ) {
    console.log('Hello UserProvider Provider');
  }
  
  authenticate (username: String, password: String): Observable<Boolean> {
    var headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/json');
    
    return this.http.post( `${ this._APILocation }/api/admin/authenticate`, {
      username: username,
      password: password
    })
    .map( response => {
      if ( response.ok ) {
        // user is authenticated
        this.isAuthenticated = true;
        return true;
      } else {
        this.isAuthenticated = false;
        return false;
      }
    });
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
