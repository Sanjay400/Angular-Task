import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-shipping',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  address: string = '';
  email: string = '';
  phone: string = '';
  paymentMethod: string = 'gpay';
  cart: any[] = [];
  total: number = 0;
  product: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product = history.state.product;
    if (this.product) {
      this.cart = [this.product];
      
    } else {
      this.cart = this.cartService.getCart();
    }
    this.calculateTotalPrice();
  
  }

  calculateTotalPrice(): void {
    this.total = this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  placeOrder(): void {
    const order = {
      products: this.cart,
      total: this.total,
      email: this.authService.getCurrentUser().email,
      date: new Date().toISOString()
    };
    this.orderService.placeOrder(order).subscribe(
      () => {
        //this.cartService.clearCart();
        alert('Order placed successfully!');
        this.router.navigate(['/order-history']);
      },
      (error) => {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again later.');
      }
    );
  }
  logout(): void {
    // Clear user data, session, etc.
    this.router.navigate(['/login']);
  }
}
