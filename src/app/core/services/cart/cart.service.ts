import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly httpClient: HttpClient) { }

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  getCarts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/v1/cart`, {
      headers: { token: this.token }
    });
  }

  addProdToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/cart`, {
      productId: id
    }, {
      headers: { token: this.token }
    });
  }
  removespecificcartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/v1/cart/${id}`,{
      headers: { token: this.token }
    });
  }
  clearUserCart(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/v1/cart`,{
      headers: { token: this.token }
    });
  }
  updateCartProductQuantity(quantity:any,id:string): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}api/v1/cart/${id}`,{
    "count": quantity
    },{
      headers: { token: this.token }
    });
  }
}
