import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  products: Product[];
  total: number;
  deliveryDate?: string; // Optional, as we'll add this dynamically
}

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.email) {
      const email = currentUser.email;
      this.orderService.getOrderHistory(email).subscribe(
        (orders: Order[]) => {
          this.orders = orders.map(order => ({
            ...order,
            deliveryDate: this.calculateDeliveryDate(order.date)
          }));
        },
        (error) => {
          console.error('Error fetching order history:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  calculateDeliveryDate(orderDate: string): string {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5);
    return date.toISOString().split('T')[0];
  }

  cancelProduct(orderId: number, productId: number): void {
    this.orderService.cancelProduct(orderId, productId).subscribe(
      (updatedOrder) => {
        const index = this.orders.findIndex(o => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        } else {
          console.error('Order not found in local orders array.');
        }
      },
      (error) => {
        console.error('Error cancelling product:', error);
        // Handle error, show error message to user, etc.
      }
    );
  }

  cancelOrder(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe(
      () => {
        this.orders = this.orders.filter(order => order.id !== orderId);
      },
      (error) => {
        console.error('Error cancelling order:', error);
        // Handle error, show error message to user, etc.
      }
    );
  }

  logout(): void {
    this.authService.logout(); // Assuming logout logic is in AuthService
    this.router.navigate(['/login']);
  }
}