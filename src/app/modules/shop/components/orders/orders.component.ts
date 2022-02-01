import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartService } from '@tul/core/services/cart.service';
import { AuthState } from '@tul/modules/auth/store/reducer/auth.reducer';
import { getAuthUser } from '@tul/modules/auth/store/selector/auth.selectors';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  userId: string | null = null;
  constructor(private storeAuth$: Store<AuthState>, private cartService: CartService) {
    this.storeAuth$.select(getAuthUser).subscribe((user) => {
      this.userId = user ? user.id : null;
    })
    this.load();
  }

  load() {
    if (this.userId) {
      this.cartService.loadOrders(this.userId).subscribe((orders: any[]) => {
        orders.forEach((data: Observable<any>) => {
          data
            .subscribe((order: Observable<any>[]) => {
              order[0]
                .subscribe((info: Observable<any>) => {
                  console.log(info)
                  this.orders.push(JSON.parse(JSON.stringify(info)));
                })
            })
        })
      });
    }
  }

  ngOnInit(): void {
  }

}
