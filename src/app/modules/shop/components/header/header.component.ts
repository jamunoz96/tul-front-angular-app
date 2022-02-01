import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSignouts } from '@tul/modules/auth/store/actions/auth.actions';
import { CartState } from '../../store/reducer/cart.reducer';
import { getCart } from '../../store/selector/cart.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartNumber: number = 0;
  constructor(private appStore: Store<CartState>) {
     this.appStore.select(getCart).subscribe((p) => {
      this.cartNumber = 0;
      p.forEach((a) => {
        this.cartNumber += a.quantity
      });
     });
  }

  ngOnInit(): void {}

  logout() {
    this.appStore.dispatch(loadSignouts());
  }


}
