import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProductModel } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly db: AngularFirestore) {}

  loadProducts(): Observable<ProductModel[]>{
       return this.db.collection<ProductModel>('tul_products').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const product = {...a.payload.doc.data(), quantity: 1, id: a.payload.doc.id};
          return product as ProductModel;
        }))
      );
  }

}
