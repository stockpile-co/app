import { TestData } from '../../test-data';
import { createAction } from '../create-action';
import { StoreMock } from '../../mocks';
import { Actions } from '../../constants';

import { ItemsActions } from './items.actions';

let instance: ItemsActions = null;

describe('Items Actions', () => {

  beforeEach(() => {
    instance = new ItemsActions((<any> new StoreMock));
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
  });

  it('dispatches action FETCH', () => {
    spyOn(instance.store, 'dispatch');
    instance.fetchItems(
      TestData.apiItem.brandID,
      TestData.apiItem.modelID,
      TestData.apiItem.categoryID,
      TestData.apiItem.available
    );
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.FETCH, {
      brandID: TestData.apiItem.brandID,
      modelID: TestData.apiItem.modelID,
      categoryID: TestData.apiItem.categoryID,
      available: TestData.apiItem.available
    }));
  });

  it('dispatches action CREATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.createItem(TestData.item);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.CREATE, TestData.item));
  });

  it('dispatches action UPDATE', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateItem(TestData.item);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.UPDATE, TestData.item));
  });

  it('dispatches action DELETE', () => {
    spyOn(instance.store, 'dispatch');
    instance.deleteItem(TestData.apiItem.barcode);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.DELETE, TestData.apiItem.barcode));
  });

  it('dispatches action RESET', () => {
    spyOn(instance.store, 'dispatch');
    instance.resetItems();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.RESET));
  });

  it('dispatches action UPDATE_TEMP', () => {
    spyOn(instance.store, 'dispatch');
    instance.updateTempItem(TestData.item);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.UPDATE_TEMP, TestData.item));
  });

  it('dispatches action ADD_TO_RENTALS', () => {
    spyOn(instance.store, 'dispatch');
    instance.addToRentals(TestData.apiItem.barcode, Actions.rent);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.ADD_TO_RENTALS, {
      barcode: TestData.apiItem.barcode,
      action: Actions.rent
    }));
  });

  it('dispatches action RESET_RENTALS', () => {
    spyOn(instance.store, 'dispatch');
    instance.resetRentals();
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.RESET_RENTALS));
  });

  it('dispatches action START_RENTAL', () => {
    spyOn(instance.store, 'dispatch');
    instance.startRental(TestData.apiItem.barcode);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.START_RENTAL, TestData.apiItem.barcode));
  });

  it('dispatches action REMOVE_FROM_RENTALS', () => {
    spyOn(instance.store, 'dispatch');
    instance.removeFromRentals(TestData.apiItem.barcode);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.REMOVE_FROM_RENTALS, TestData.apiItem.barcode));
  });

  it('dispatches action RETURN', () => {
    spyOn(instance.store, 'dispatch');
    instance.returnItems(TestData.details.endDate);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.RETURN, TestData.details.endDate));
  });

  it('dispatches action RENT', () => {
    spyOn(instance.store, 'dispatch');
    instance.rentItems(TestData.details);
    expect(instance.store.dispatch).toHaveBeenCalledWith(createAction(ItemsActions.RENT, TestData.details));
  });
});
