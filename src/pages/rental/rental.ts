import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { RentalDetailsPage } from '../rental-details/rental-details';
import { Actions, Messages } from '../../constants';
import { Notifications } from '../../providers/notifications';

import { ItemsActions } from '../../store/items/items.actions';
import { ItemsService } from '../../services/items.service';
import { Items } from '../../models/items';
import { Observable } from 'rxjs/Observable';

import { MapToIterablePipe } from '../../pipes/map-to-iterable.pipe';

@Component({
  selector: 'page-rental',
  templateUrl: 'rental.html'
})
export class RentalPage {
  actions = Actions;
  action: string = '';
  items: Observable<Items>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner,
    public platform: Platform,
    public notifications: Notifications,
    public alertCtrl: AlertController,
    public itemsService: ItemsService,
    public itemsActions: ItemsActions
  ) {}

  /**
   * Gets items and action (rent or return).
   */
  ngOnInit() {
    this.action = this.navParams.get('action');
    this.items = this.itemsService.getItems();
  }

  /**
   * Tries to add the item to the rentals.
   */
  onAdd(barcode: string) {
    let items;
    this.items.take(1).subscribe(i => items = i.rentals);

    if (items[barcode]) {
      this.notifications.showToast(Messages.itemAlreadyAdded);
    } else {
      this.itemsActions.addToRentals(barcode, this.action);
    }
  }

  /**
   * Pushes page on nav to allow users to finish renting the items.
   */
  onContinue() {
    this.navCtrl.push(RentalDetailsPage);
  }

  /**
   * Returns items by calling the api for each item in the list of items to
   * return. Pops the nav when done.
   */
  onReturn() {
    // Set return date to today in MySQL date format
    const returnDate = new Date().toISOString().substring(0, 10);
    this.itemsActions.returnItems(returnDate);
  }

  /**
   * Starts barcode scanner and process barcode if it is present (i.e. user didn't cancel)
   */
  onScanBarcode() {
    this.barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this.onAdd(barcodeData.text);
        }
      },
      err => this.notifications.showToast(err)
    );
  }

  /**
   * Creates alert for user to enter a barcode and process barcode.
   */
  onTypeBarcode() {
    let alert = this.alertCtrl.create({
      title: 'Type Barcode',
      inputs: [
        {
          name: 'barcode',
          placeholder: 'Barcode'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Next',
          handler: form => {
            this.onAdd(form.barcode);
          }
        }
      ]
    });

    alert.present();
  }

  /**
   * Removes item from rentals.
   */
  onRemoveItem(barcode) {
    this.itemsActions.removeFromRentals(barcode);
  }
}
