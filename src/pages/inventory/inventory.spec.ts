import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { TestData } from '../../test-data';

import { InventoryPage } from './inventory';
import { Actions } from '../../constants';
import { ItemPage } from '../item/item';
import { InventoryFilterPage } from '../inventory-filter/inventory-filter';
import { PlatformMockIsCore, PlatformMockIsCordova } from '../../mocks';
import { Observable } from 'rxjs/Observable';

let fixture: ComponentFixture<InventoryPage> = null;
let instance: any = null;

describe('Inventory Page', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([InventoryPage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('is created', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toBeTruthy();
  });

  it('initializes with a segment of all', () => {
    expect(instance.segment).toEqual(-1);
  });

  it('gets brands, models, categories and items', () => {
    spyOn(instance.brandsActions, 'fetchBrands');
    spyOn(instance.modelsActions, 'fetchModels');
    spyOn(instance.categoriesActions, 'fetchCategories');
    instance.ngOnInit();
    expect(instance.brandsActions.fetchBrands).toHaveBeenCalled();
    expect(instance.modelsActions.fetchModels).toHaveBeenCalled();
    expect(instance.categoriesActions.fetchCategories).toHaveBeenCalled();
  });

  it('loads items on filterItems()', () => {
    instance.items = Observable.of({ filters: TestData.itemFilters });
    spyOn(instance, 'loadItems');
    spyOn(instance.itemsActions, 'resetItems');
    instance.onFilterItems();
    expect(instance.loadItems).toHaveBeenCalled();
    expect(instance.itemsActions.resetItems).toHaveBeenCalled();
  });

  it('searches items', fakeAsync(() => {
    instance.ngOnInit();
    instance.ionViewDidLoad();
    spyOn(instance, 'loadItems');
    instance.searchControl.setValue(TestData.queryText);
    tick(150);
    expect(instance.loadItems).toHaveBeenCalled();
  }));

  it('fetches items on loadItems()', () => {
    spyOn(instance.itemsActions, 'fetchItems');
    instance.loadItems();
    expect(instance.itemsActions.fetchItems).toHaveBeenCalled();
  });

  it('pushes ItemPage on nav on viewItem()', () => {
    spyOn(instance.navCtrl, 'push');
    instance.onViewItem(TestData.item.barcode);
    expect(instance.navCtrl.push).toHaveBeenCalledWith(ItemPage, {
      action: Actions.edit,
      barcode: TestData.item.barcode
    });
  });

  it('calls startCreate with barcode onAdd() if cordova is available', fakeAsync(() => {
    instance.platform = new PlatformMockIsCordova();
    spyOn(instance.barcodeScanner, 'scan').and.callThrough();
    spyOn(instance.itemsActions, 'startCreate');
    instance.onAdd();
    tick();
    expect(instance.barcodeScanner.scan).toHaveBeenCalled();
    expect(instance.itemsActions.startCreate).toHaveBeenCalledWith(TestData.barcodeData.text);
  }));

  it('creates an alert onAdd() if cordova is not available', () => {
    instance.platform = new PlatformMockIsCore();
    spyOn(instance.alertCtrl, 'create').and.callThrough();
    instance.onAdd();
    expect(instance.alertCtrl.create).toHaveBeenCalled();
  });

  it('shows message if error in onAdd() during scan', fakeAsync(() => {
    instance.platform = new PlatformMockIsCordova();
    instance.barcodeScanner.resolve = false;
    spyOn(instance.notifications, 'showMessage');
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    tick();
    expect(instance.notifications.showMessage).toHaveBeenCalledWith(TestData.error);
    expect(instance.navCtrl.push).not.toHaveBeenCalled();
  }));

  it('does nothing if scan is cancelled', fakeAsync(() => {
    instance.platform = new PlatformMockIsCordova();
    instance.barcodeScanner.cancel = true;
    spyOn(instance.notifications, 'showMessage');
    spyOn(instance.navCtrl, 'push');
    instance.onAdd();
    tick();
    expect(instance.notifications.showMessage).not.toHaveBeenCalled();
    expect(instance.navCtrl.push).not.toHaveBeenCalled();
  }));

  it('creates a modal onOpenFilters()', () => {
    spyOn(instance.modalCtrl, 'create').and.callThrough();
    instance.onOpenFilters();
    expect(instance.modalCtrl.create).toHaveBeenCalledWith(InventoryFilterPage);
  });
});
