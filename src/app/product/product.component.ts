import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;
    this.filterProducts(category);
  }

  filterProducts(category: string): void {
    if (category === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

  buyNow(product: any) {
    const productToBuy = { ...product, quantity: 1 };
    this.router.navigate(['/shipping'], { state: { product: productToBuy } });
  }


  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }
  logout(): void {
    // Clear user data, session, etc.
    this.router.navigate(['/login']);
  }
}
