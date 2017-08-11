import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

@Injectable()
export class UserProvider {
  private _APILocation = "http://localhost";  // do not add trailing slash
  public isAuthenticated: Boolean = false;

  constructor( public http: Http ) {
    console.log('Hello UserProvider Provider');
  }
  
  authenticate (username: String, password: String): Promise<Response> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    return this.http.post( `${ this._APILocation }/api/admin/authenticate`, {
      username: username,
      password: password
    }, {headers: headers})
    .toPromise()
    .then( response => response )
    .catch( this.handleError );
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
