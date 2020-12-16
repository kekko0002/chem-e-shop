import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { FirebaseService } from '../../services/firebase.service';
import { Product } from '../../models/product';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[];
  isLoading = false;
  submitted: boolean;
  reset = this.getData();


  constructor(private service: FirebaseService,
              private cart: CartService,
              private snackbar: MatSnackBar) { }

  /* Get data from the database to display the products stored.
     It also set isLoading to true before the subscribe start to show a spinner while the
     method takes datas */
  getData(): void {
    this.isLoading = true;
    this.service.getProducts().pipe(take(1), ).subscribe(
      data => {
        console.log(data);
        this.products = data;

      },
      err => {
        console.error(err);
      },
      () => {
        this.isLoading = false;
        this.submitted = false;
      }

    );
  }

  // It uses cart service to add a product into hte cart
  addToCart(product): void {
    this.cart.addToCart(product);
    this.snackbar.open('Product added to cart!', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'});
  }

  // Similar to getData but it use a for loop to check user input for search
  getSearch(value: string): void {
    const temp: Product[] = [];
    this.isLoading = true;
    this.service.getProducts().pipe(take(1), ).subscribe(
      data => {
        this.submitted = true;
        console.log(data);
        this.products = data;
        for ( const prod of this.products) {
          if (prod.name.toLowerCase().includes(value.toLowerCase())) {
            temp.push(prod);
          }
        }
        this.products = temp;

      },
      err => {
        console.error(err);
      },
      () => {
        this.isLoading = false;
      }

    );
  }

  ngOnInit(): void {
    this.getData();

  }

}
