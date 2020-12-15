import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { FirebaseService } from '../../services/firebase.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  productId;
  product: Product;
  allProducts: Product[];

  constructor(private route: ActivatedRoute,
              private service: FirebaseService,
              private cart: CartService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.getProductData();
  }

  getProductData(): void{
    this.service.getProducts().subscribe(
      data => {
        for (const prod of data) {
          if (prod.id === this.productId){
            this.product = prod;
            console.log(this.product);
            break;
          }
        }
      },
      err => {
        console.error(err);
      },

    );
  }

  addToCart(product): void {
    this.cart.addToCart(product);
    this.snackbar.open('Product added to cart!', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'});
  }

}
