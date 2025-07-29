import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private readonly httpClient:HttpClient) { }
  forgetPassword(data:any):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/forgotPasswords`,data)
  }
  verifyResetCode(data:any):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/auth/verifyResetCode`,data)
  }

  resetPassword(data:any):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}api/v1/auth/resetPassword`,data)
  }
}
