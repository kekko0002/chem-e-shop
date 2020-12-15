import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Product[] = [];

  constructor() { }

  addToCart(product): void{
    this.cart.push(product);
  }

  getItems(): Product[] {
    return this.cart;
  }

  clearCart(): Product[]{
    this.cart = [];
    return this.cart;
  }

  getLenght(): number{
    return this.cart.length;
  }

}
