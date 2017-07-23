import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ItemData } from '../../providers/item-data';
import { ItemPropertyData } from '../../providers/item-property-data';
import { Notifications } from '../../providers/notifications';
import { Actions } from '../../constants';
import { EditItemPage } from '../edit-item/edit-item';
import { InventoryFilterPage } from '../inventory-filter/inventory-filter';
import { ViewItemPage } from '../view-item/view-item';
import { Items } from '../../models/items';
import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { BrandsActions } from '../../store/brands/brands.actions';
import { ModelsActions } from '../../store/models/models.actions';
import { CategoriesActions } from '../../store/categories/categories.actions';
import { Observable } from 'rxjs/Observable';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  segment = -1;
  selectedBrandID = -1;
  selectedModelID = -1;
  selectedCategoryID = -1;
  items: Observable<Items>;
  loadMoreItems: Observable<boolean>;
  loading = false;
  showAddNew: Observable<boolean>;

  constructor(
    public navCtrl: NavController,
    public itemData: ItemData,
    public itemPropertyData: ItemPropertyData,
    public notifications: Notifications,
    public barcodeScanner: BarcodeScanner,
    public modalCtrl: ModalController,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions,
    public brandsActions: BrandsActions,
    public modelsActions: ModelsActions,
    public categoriesActions: CategoriesActions
  ) {}

  /**
   * Gets brands, models, categories and items.
   */
  ngOnInit() {
    this.items = this.itemsService.getItems();
    this.showAddNew = this.itemsService.getShouldShowAddNew();
    this.loadMoreItems = this.itemsService.getShouldLoadMoreItems();

    this.brandsActions.fetchBrands();
    this.modelsActions.fetchModels();
    this.categoriesActions.fetchCategories();

    // No filters set, so gets all items
    this.itemsActions.fetchItems();
  }

  /**
   * Apply current filters and load items.
   */
  onFilterItems() {
    if (Math.sign(this.selectedBrandID) < 0) {
      this.selectedModelID = -1;
    }

    this.itemsActions.resetItems();
    this.loadItems();
  }

 /**
  * Gets all items that match the filters.
  */
  loadItems() {
    this.itemsActions.fetchItems(
      this.selectedBrandID,
      this.selectedModelID,
      this.selectedCategoryID,
      this.segment
    );
  }

  /**
   * Pushes page with the item to view.
   */
  onViewItem(barcode) {
    this.navCtrl.push(ViewItemPage, { barcode });
  }

  /**
   * Starts barcode scanner and pushes page to edit item if barcode is present
   * (i.e. user didn't cancel)
   */
  onAdd() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.navCtrl.push(EditItemPage, {
            barcode: barcodeData.text,
            action: Actions.add
          });
        }
      },
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Creates a modal to allow the user to choose filters. When dismissed, saves
   * the filters and filters the items.
   */
  onOpenFilters(event) {
    let modal = this.modalCtrl.create(InventoryFilterPage, {
      selectedBrandID: this.selectedBrandID,
      selectedModelID: this.selectedModelID,
      selectedCategoryID: this.selectedCategoryID
    });

    modal.onDidDismiss((ids) => {
      if (ids) {
        this.selectedBrandID = ids.selectedBrandID;
        this.selectedModelID = ids.selectedModelID;
        this.selectedCategoryID = ids.selectedCategoryID;
        this.onFilterItems();
      }
   });

    modal.present({
      ev: event
    });
  }
}
