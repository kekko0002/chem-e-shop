import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Product } from '../../models/product';
import { Category } from '../../models/categories';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  defImg = 'https://firebasestorage.googleapis.com/v0/b/chem-e-shop.appspot.com/o/default.png?alt=media&token=add06e17-890a-4647-bda3-86482a04a6da';
  defDesc = 'There are no details given about this item';

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  products: Product[];

  product: Product = {
    name: '',
    description: '',
    image: '',
    category: '',
  };

  categories: Category[] = [
    {value: 'glassware for measuring', viewValue: 'glassware for measuring'},
    {value: 'separation equipment', viewValue: 'separation equipment'},
    {value: 'heat exchange equipment', viewValue: 'heat exchange equipment'},
    {value: 'tools', viewValue: 'tools'},
    {value: 'other', viewValue: 'other'},
  ];

  constructor(private service: FirebaseService, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  addProduct(prod: Product): void{
    if (prod.name !== '' && prod.category !== ''){
      if (prod.image === ''){
        prod.image = this.defImg;
      }
      if (prod.description === ''){
        prod.description = this.defDesc;
      }
      this.service.addProduct(prod);
      prod.name = '';
      prod.description = '';
      prod.image = '';
      prod.category = '';
      prod.price = null;
      this.snackbar.open('Product added correctly!', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'});
    }
  }

  updateProduct(prod: Product): void{
    if (prod.description === ''){
      prod.description = this.defDesc;
    }
    this.service.updateItem(prod);
    this.snackbar.open('Product updated!', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'});
  }

  deleteProduct(prod: Product): void{
    const dialog = this.dialog.open(DialogComponent, {
      data: () => { this.service.deleteProduct(prod);
                    this.snackbar.open('Product deleted!', '', {
                      duration: 1500,
                      horizontalPosition: 'center',
                      verticalPosition: 'bottom'});
      }
    });
  }

  getData(): void {
    this.isLoading$.next(true);
    this.service.getProducts().subscribe(
      data => {
        console.log(data);
        this.products = data;
        this.isLoading$.next(false);
      },
      err => {
        console.error(err);
      },

    );
  }

  ngOnInit(): void {
    this.getData();
  }

}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./admin.component.css']
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
