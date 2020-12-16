import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDocument: AngularFirestoreDocument<Product>;


  constructor(private afs: AngularFirestore) {
    // Declare the Firestore collection products
    this.productCollection = this.afs.collection('products');
  }

  // Assign to products the collection and add the id value to the objects.
  getCollection(collection: AngularFirestoreCollection<Product>): void{
    this. products = collection.snapshotChanges().pipe(
      map(
        changes => {
          return changes.map(
            a => {
              const data = a.payload.doc.data() as Product;
              data.id = a.payload.doc.id;
              return data;
            }
          );
        }
      )
    );
  }

  // Return an observable of Product array
  getProducts(): Observable<Product[]>{
    this.getCollection(this.productCollection);
    return this.products;
  }

  // Add a product to the collection
  addProduct(product: Product): void{
    this.productCollection.add(product);
  }

  // Remove a product from the collection
  deleteProduct(product: Product): void{
    this.productDocument = this.afs.doc(`products/${product.id}`);
    this.productDocument.delete();
  }

  // Edit an existing product in the collection
  updateItem(product: Product): void{
    this.productDocument = this.afs.doc(`products/${product.id}`);
    this.productDocument.update(product);
  }

}
