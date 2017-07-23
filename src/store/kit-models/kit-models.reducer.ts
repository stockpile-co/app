import { Action } from '@ngrx/store';

import { KitModelsActions } from './kit-models.actions';
import { KitModels } from '../../models/kit-models';

const initialState = {
  results: {}
};

export function kitModelsReducer(kitModels: KitModels = initialState, action: Action): KitModels {
  switch (action.type) {
    case KitModelsActions.FETCH_KIT_MODELS_SUCCESS:
      let results = Object.assign({}, kitModels.results);
      if (action.payload.results.length) {
        results[action.payload.results[0].kitID] = action.payload.results;
      }
      return { results };
    default:
      return kitModels;
  }
}