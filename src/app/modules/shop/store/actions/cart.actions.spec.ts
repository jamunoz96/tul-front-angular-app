import * as fromCart from './cart.actions';

describe('addToCart', () => {
  it('should return an action', () => {
    expect(fromCart.addToCart({data: []}).type).toBe('[Cart] Add Cart');
  });
});
