import { environment } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient:HttpClient, private router:Router) { }
  private isLoggedIn = new BehaviorSubject<boolean>(typeof window !== 'undefined' && !!localStorage.getItem("token"));
  isLoggedIn$ = this.isLoggedIn.asObservable();
  userData:any;
  signUp(data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/signup`, data)
  }
    signIn(data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/signin`, data)
  }
  getUserToken(): void {
    let token: string | null = null;
    if (typeof window !== 'undefined' && localStorage) {
      token = localStorage.getItem('token');
    }
    if (token) {
      this.userData = jwtDecode(token);
      this.isLoggedIn.next(true);
    }
  }


  signOut(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
    }
    this.userData = null;
    this.isLoggedIn.next(false);
    this.router.navigate(["/login"]);
  }
}
