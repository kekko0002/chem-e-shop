import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Product[] = [];

  constructor() { }

  // Push an item in to cart array
  addToCart(product): void{
    this.cart.push(product);
  }

  // get the cart array
  getItems(): Product[] {
    return this.cart;
  }

  // Clear the cart array
  clearCart(): Product[]{
    this.cart = [];
    return this.cart;
  }

  // Get lenght of the cart array
  getLenght(): number{
    return this.cart.length;
  }

}
