import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor(private http:  HttpClient) {
  }

  authenticateUser(data) {
    return this.http.post('http://localhost:3000/auth/v1/' , data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {

    let obsr : Observable<any> = this.http.post('http://localhost:3000/auth/v1/isAuthenticated',{},{
      headers : new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
    })
    return obsr.map(response => {
      return response['isAuthenticated']
    }).toPromise();
  }

}
