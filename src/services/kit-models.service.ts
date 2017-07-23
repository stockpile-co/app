import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../models/app-state';
import { KitModel } from '../models/kit-models';

@Injectable()
export class KitModelsService {

  constructor(private store: Store<AppState>) {}

  getKitModels(kitID: number): Observable<Array<KitModel>> {
    return this.store.select(appState => appState.kitModels.results[kitID]);
  }
}