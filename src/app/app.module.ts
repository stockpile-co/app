import { ErrorHandler, NgModule } from '@angular/core';
import { CloudSettings } from '@ionic/cloud-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudModule } from '@ionic/cloud-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StockpileApp } from './app.component';

import { AppActions } from '../store/app/app.actions';
import { AppEffects } from '../store/app/app.effects';
import { rootReducer } from '../store/root-reducer';
import { OrganizationActions } from '../store/organization/organization.actions';
import { OrganizationEffects } from '../store/organization/organization.effects';
import { OrganizationService } from '../services/organization.service';
import { UserActions } from '../store/user/user.actions';
import { UserEffects } from '../store/user/user.effects';
import { UserService } from '../services/user.service';
import { KitsActions } from '../store/kits/kits.actions';
import { KitsEffects } from '../store/kits/kits.effects';
import { KitsService } from '../services/kits.service';
import { KitModelsActions } from '../store/kit-models/kit-models.actions';
import { KitModelsEffects } from '../store/kit-models/kit-models.effects';
import { KitModelsService } from '../services/kit-models.service';
import { BrandsActions } from '../store/brands/brands.actions';
import { BrandsEffects } from '../store/brands/brands.effects';
import { BrandsService } from '../services/brands.service';
import { ModelsActions } from '../store/models/models.actions';
import { ModelsEffects } from '../store/models/models.effects';
import { ModelsService } from '../services/models.service';
import { CategoriesActions } from '../store/categories/categories.actions';
import { CategoriesEffects } from '../store/categories/categories.effects';
import { CategoriesService } from '../services/categories.service';
import { ItemsActions } from '../store/items/items.actions';
import { ItemsEffects } from '../store/items/items.effects';
import { ItemsService } from '../services/items.service';
import { LayoutActions } from '../store/layout/layout.actions';
import { LayoutService } from '../services/layout.service';
import { ExternalRentersActions } from '../store/external-renters/external-renters.actions';
import { ExternalRentersEffects } from '../store/external-renters/external-renters.effects';
import { ExternalRentersService } from '../services/external-renters.service';
import { CustomFieldsActions } from '../store/custom-fields/custom-fields.actions';
import { CustomFieldsEffects } from '../store/custom-fields/custom-fields.effects';
import { CustomFieldsService } from '../services/custom-fields.service';
import { CustomFieldCategoriesActions } from '../store/custom-field-categories/custom-field-categories.actions';
import { CustomFieldCategoriesEffects } from '../store/custom-field-categories/custom-field-categories.effects';
import { CustomFieldCategoriesService } from '../services/custom-field-categories.service';

import { AddKitModelPage } from '../pages/add-kit-model/add-kit-model';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { CustomFieldPage } from '../pages/custom-field/custom-field';
import { CustomFieldsPage } from '../pages/custom-fields/custom-fields';
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { ExternalRenterPage } from '../pages/external-renter/external-renter';
import { ExternalRentersPage } from '../pages/external-renters/external-renters';
import { FieldPage } from '../pages/field/field';
import { FieldsPage } from '../pages/fields/fields';
import { HomePage } from '../pages/home/home';
import { InventoryFilterPage } from '../pages/inventory-filter/inventory-filter';
import { InventoryPage } from '../pages/inventory/inventory';
import { ItemFilterPage } from '../pages/item-filter/item-filter';
import { ItemPage } from '../pages/item/item';
import { KitPage } from '../pages/kit/kit';
import { KitRentalPage } from '../pages/kit-rental/kit-rental';
import { KitsPage } from '../pages/kits/kits';
import { LoginPage } from '../pages/login/login';
import { RentalPage } from '../pages/rental/rental';
import { RentalDetailsPage } from '../pages/rental-details/rental-details';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewAccountPage } from '../pages/view-account/view-account';

import { MapToIterablePipe, SortPipe } from '../pipes';

import { Api } from '../providers/api';
import { ApiUrl } from '../providers/api-url';
import { ExternalRenterData } from '../providers/external-renter-data';
import { CustomFieldData } from '../providers/custom-field-data';
import { ItemData } from '../providers/item-data';
import { ItemPropertyData } from '../providers/item-property-data';
import { KitData } from '../providers/kit-data';
import { Notifications } from '../providers/notifications';
import { UserData } from '../providers/user-data';

import { RavenErrorHandler } from '../raven-error-handler';
import { ErrorInterceptor, HeadersInterceptor, TimeoutInterceptor } from '../interceptors';

export const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1437b8f0'
  }
};

@NgModule({
  declarations: [
    StockpileApp,
    AddKitModelPage,
    ChangePasswordPage,
    CustomFieldPage,
    CustomFieldsPage,
    EditAccountPage,
    ExternalRenterPage,
    ExternalRentersPage,
    FieldPage,
    FieldsPage,
    HomePage,
    InventoryFilterPage,
    InventoryPage,
    ItemPage,
    ItemFilterPage,
    KitPage,
    KitRentalPage,
    KitsPage,
    LoginPage,
    MapToIterablePipe,
    RentalPage,
    RentalDetailsPage,
    SortPipe,
    TabsPage,
    ViewAccountPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(StockpileApp, {
      tabsHideOnSubPages: true
    }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    StoreModule.provideStore(rootReducer),
    EffectsModule.run(AppEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(OrganizationEffects),
    EffectsModule.run(KitsEffects),
    EffectsModule.run(KitModelsEffects),
    EffectsModule.run(BrandsEffects),
    EffectsModule.run(ModelsEffects),
    EffectsModule.run(CategoriesEffects),
    EffectsModule.run(ItemsEffects),
    EffectsModule.run(ExternalRentersEffects),
    EffectsModule.run(CustomFieldsEffects),
    EffectsModule.run(CustomFieldCategoriesEffects),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    StockpileApp,
    AddKitModelPage,
    ChangePasswordPage,
    CustomFieldPage,
    CustomFieldsPage,
    EditAccountPage,
    ExternalRenterPage,
    ExternalRentersPage,
    FieldPage,
    FieldsPage,
    HomePage,
    InventoryFilterPage,
    InventoryPage,
    ItemFilterPage,
    ItemPage,
    KitPage,
    KitRentalPage,
    KitsPage,
    LoginPage,
    RentalPage,
    RentalDetailsPage,
    TabsPage,
    ViewAccountPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    Api,
    ApiUrl,
    AppActions,
    BarcodeScanner,
    BrandsActions,
    BrandsEffects,
    BrandsService,
    CategoriesActions,
    CategoriesEffects,
    CategoriesService,
    ExternalRentersActions,
    ExternalRenterData,
    ExternalRentersEffects,
    ExternalRentersService,
    CustomFieldCategoriesActions,
    CustomFieldCategoriesEffects,
    CustomFieldCategoriesService,
    CustomFieldData,
    CustomFieldsActions,
    CustomFieldsEffects,
    CustomFieldsService,
    InAppBrowser,
    ItemData,
    ItemPropertyData,
    ItemsActions,
    ItemsEffects,
    ItemsService,
    KitData,
    KitsActions,
    KitsEffects,
    KitsService,
    KitModelsActions,
    KitModelsEffects,
    KitModelsService,
    LayoutActions,
    LayoutService,
    MapToIterablePipe,
    ModelsActions,
    ModelsEffects,
    ModelsService,
    Notifications,
    OrganizationActions,
    OrganizationEffects,
    OrganizationService,
    SortPipe,
    SplashScreen,
    StatusBar,
    UserActions,
    UserEffects,
    UserData,
    UserService,
    Toast
  ]
})
export class AppModule {}
