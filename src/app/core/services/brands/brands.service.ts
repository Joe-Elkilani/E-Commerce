import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/v1/brands`)
  }
}
