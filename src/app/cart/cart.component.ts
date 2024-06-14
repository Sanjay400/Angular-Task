import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.total = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  removeProduct(item: any): void {
    this.cartService.removeFromCart(item.id);
    this.cart = this.cartService.getCart();
    this.calculateTotalPrice();
  }

  decrementQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.saveCart(this.cart);
      this.calculateTotalPrice();
    }
  }

  incrementQuantity(item: any): void {
    item.quantity++;
    this.cartService.saveCart(this.cart);
    this.calculateTotalPrice();
  }

  placeOrder(): void {
    this.router.navigate(['/shipping']);
  }

  logout(): void {
    // Clear user data, session, etc.
    this.router.navigate(['/login']);
  }
}
