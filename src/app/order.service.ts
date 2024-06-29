import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  placeOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getOrderHistory(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }

  cancelProduct(orderId: number, productId: number): Observable<any> {
    const url = `${this.apiUrl}/${orderId}/products/${productId}`;
    return this.http.delete(url);
  }

  cancelOrder(orderId: number): Observable<any> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete(url);
  }
}
