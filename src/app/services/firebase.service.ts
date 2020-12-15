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

    this.productCollection = this.afs.collection('products');
  }

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

  getProducts(): Observable<Product[]>{
    this.getCollection(this.productCollection);
    return this.products;
  }

  addProduct(product: Product): void{
    this.productCollection.add(product);
  }

  deleteProduct(product: Product): void{
    this.productDocument = this.afs.doc(`products/${product.id}`);
    this.productDocument.delete();
  }

  updateItem(product: Product): void{
    this.productDocument = this.afs.doc(`products/${product.id}`);
    this.productDocument.update(product);
  }

}
