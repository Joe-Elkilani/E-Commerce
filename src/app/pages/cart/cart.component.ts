import { Cart } from './../../shared/interfaces/cart/cart';
import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  carts: Cart = {} as Cart;

  ngOnInit(): void {
    this.getAllCart();
  }

  getAllCart() {
    this.cartService.getCarts().subscribe({
      next: (res) => {
        this.carts = res.data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  removespecificcartItem(id:string) {
    this.cartService.removespecificcartItem(id).subscribe({
      next: (res) => {
        this.carts = res.data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  clearUserCart(id:string) {
    this.cartService.clearUserCart(id).subscribe({
      next: (res) => {
        this.carts = res.data;
        this.carts = {} as Cart;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  updateCartProductQuantity(id:string,quantity:any){
    this.cartService.updateCartProductQuantity(id,quantity).subscribe({
      next: (res) => {
        this.carts = res.data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
