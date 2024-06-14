// src/app/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor(private http: HttpClient) {}

  getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  saveCart(cart: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: any): void {
    this.cart = this.getCart();
    const index = this.cart.findIndex((item: any) => item.id === product.id);
    if (index !== -1) {
      this.cart[index].quantity++;
    } else {
      // Ensure the product is an object and has the correct properties
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart(this.cart);
  }

  removeFromCart(productId: number): void {
    this.cart = this.getCart();
    this.cart = this.cart.filter((item: any) => item.id !== productId);
    this.saveCart(this.cart);
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }

  placeOrder(order: any): Observable<any> {
    return this.http.post('http://localhost:3000/orders', order);
  }
}
