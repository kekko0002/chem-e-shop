import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cart: CartService) { }

  // get items added in the cart by the user
  getItems(): Product[]{
    return this.cart.getItems();
  }

  // Clear the user cart
  clearCart(): void{
    this.cart.clearCart();
  }

  // Sum the prices of items in the cart to get total
  getTotal(): number{
    let total = 0;
    for (const prod of this.cart.cart) {
      total = total + prod.price;
      console.log(total);
    }
    return total;
  }

  ngOnInit(): void {
  }

}
