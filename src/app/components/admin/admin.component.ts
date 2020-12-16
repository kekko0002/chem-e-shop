import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Product } from '../../models/product';
import { Category } from '../../models/categories';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // default image when no image is input
  defImg = 'https://firebasestorage.googleapis.com/v0/b/chem-e-shop.appspot.com/o/default.png?alt=media&token=add06e17-890a-4647-bda3-86482a04a6da';
  // default description when no description is input
  defDesc = 'There are no details given about this item';

  products: Product[];

  // clear Object of type products to initialize the add Component form
  product: Product = {
    name: '',
    description: '',
    image: '',
    category: '',
  };

  // categories for the select of MatDialog
  categories: Category[] = [
    {value: 'glassware for measuring', viewValue: 'glassware for measuring'},
    {value: 'separation equipment', viewValue: 'separation equipment'},
    {value: 'heat exchange equipment', viewValue: 'heat exchange equipment'},
    {value: 'tools', viewValue: 'tools'},
    {value: 'other', viewValue: 'other'},
  ];

  constructor(private service: FirebaseService, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  // check if required form fields are not blank, and then it add the product to local storage, clearing the fields
  addProduct(prod: Product): void{
    if (prod.name !== '' && prod.category !== '' && prod.price !== null){
      // set default image if field left blank
      if (prod.image === ''){
        prod.image = this.defImg;
      }
      // same for description
      if (prod.description === ''){
        prod.description = this.defDesc;
      }
      this.service.addProduct(prod);
      prod.name = '';
      prod.description = '';
      prod.image = '';
      prod.category = '';
      prod.price = null;
      // simple snackbar created using angular material
      this.snackbar.open('Product added correctly!', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'});
    }
  }

  // Similar to addProduct() but called for updating an existing product
  updateProduct(prod: Product): void{
    if (prod.image === ''){
      prod.image = this.defImg;
    }
    if (prod.description === ''){
      prod.description = this.defDesc;
    }
    this.service.updateItem(prod);
    this.snackbar.open('Product updated!', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'});
  }

  // Delete an existing product after asking for confirm in a simple dialog(dialog.component.html)
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

  // get data from database using firebase getProduct() method
  getData(): void {
    this.service.getProducts().pipe(take(1), ).subscribe(
      data => {
        console.log(data);
        this.products = data;

      },
      err => {
        console.error(err);
      },
      () => {
      }

    );
  }

  ngOnInit(): void {
    this.getData();
  }

}


/* Component for dialog. I put this in the same ts file of Admin component because it's only related to this component
   and it has very few specs */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./admin.component.css']
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
