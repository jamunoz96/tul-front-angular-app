import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductModel } from '../models/product.model';
import { map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public orders: any[] = [];

  constructor(private readonly db: AngularFirestore, private auth: AngularFireAuth) { }

  async createOrder(products: ProductModel[]): Promise<any> {
    const user = this.auth.currentUser;
    return user.then((u) => {
      return this.db.collection('tul_carts')
        .add({ status: "complete", user_id: u?.uid }).then(result => {
          products.forEach(product => {
            this.db.collection('tul_product_carts')
              .add({ product_id: product.id, cart_id: result.id, quantity: product.quantity })
          })
        })
    })
  }

  loadOrders(user_id: string): Observable<any> {
      return this.db.collection<any>('tul_carts', ref1 => ref1.where("user_id", "==", user_id)).snapshotChanges().pipe(
        map(tul_cart => tul_cart.map(a => {
          const tul_carts : {order: any, products: any[]} = { order: {...a.payload.doc.data(), id: a.payload.doc.id}, products: [] };
          return this.db.collection<any>('tul_product_carts', ref2 => ref2.where("cart_id", "==", tul_carts.order.id)).snapshotChanges().pipe(
            map(tul_product_cart => tul_product_cart.map(b => {
              return this.db.collection<any>('tul_products', ref3 => ref3.where(firebase.default.firestore.FieldPath.documentId(), "==", b.payload.doc.data().product_id)).snapshotChanges().pipe(
                tap(tul_product => tul_product.forEach(c => {
                  tul_carts.products.push({...c.payload.doc.data(), quantity: b.payload.doc.data().quantity})
                })),
                map(() => tul_carts)
              )
            }))
          )
          
        }))
      )
  }

}
