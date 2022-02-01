import * as fromProduct from './products.actions';

describe('loadProducts', () => {
  it('should return an action', () => {
    expect(fromProduct.loadProducts().type).toBe('[Product] Load Products');
  });
});
