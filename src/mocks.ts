/* tslint:disable */
// This file contains all the mocks of ionic components required for testing

// IONIC:

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { TestData } from './test-data';

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return Promise.resolve();
  }

  public push(): any {
    return Promise.resolve();
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public popToRoot(): any {
    return Promise.resolve();
  }
}

export class PlatformMock {
  public ready(): Promise<{String}> {
    return Promise.resolve('READY');
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }
}

export class MenuMock {
  public close(): any {
    return Promise.resolve();
  }
}

export class NavParamsMock {
  param: string = '';

  public get(): any {
    return String(this.param);
  }
}

export class StorageMock {
  public get(): any {
    return Promise.resolve();
  }

  public set(): any {
    return Promise.resolve();
  }
}

export class NavigatorMock {
  hal = {};

  public get(): any {
    return Observable.fromPromise(Promise.resolve(this.hal));
  }
}

export class InventoryDataMock {
  item = TestData.item;
  brands = TestData.brands;
  models = TestData.models;
  categories = TestData.categories;
  statuses = TestData.statuses;
  resolve: boolean = true;

  public addItem(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve());
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getItem(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.item));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public editItem(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve());
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public deleteItem(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve());
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public rent(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve());
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public return(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve());
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getBrands(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.brands));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getModels(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.models));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getStatuses(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.statuses));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }

  public getCategories(): any {
    if (this.resolve) {
      return Observable.fromPromise(Promise.resolve(this.categories));
    } else {
      return Observable.fromPromise(Promise.reject(TestData.error));
    }
  }
}

export class StockpileDataMock {
  public initHal(): any {
    return Promise.resolve();
  }

  public getUrl(): any { }

  public showToast(): any { }
}

export class UserDataMock {
  resolve: boolean = true;
  loggedIn: boolean;

  public login(): any {
    if (this.resolve) {
      return Promise.resolve();
    } else {
      return Promise.reject(TestData.error);
    }
  }

  public logout(): any { }

  public isLoggedIn(): any {
    return Promise.resolve(this.loggedIn);
  }
}

/* tslint:enable */
