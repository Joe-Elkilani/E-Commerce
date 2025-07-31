import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly httpClient: HttpClient) { }
  numberOfCart:BehaviorSubject<number> = new BehaviorSubject(0)

  getCarts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}api/v1/cart`,);
  }

  addProdToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}api/v1/cart`, {
      productId: id
    });
  }
  removespecificcartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/v1/cart/${id}`);
  }
  clearUserCart(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}api/v1/cart`);
  }
  updateCartProductQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}api/v1/cart/${productId}`, { count });
  }
}
