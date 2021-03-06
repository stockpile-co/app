export interface KitModel {
  readonly kitID: number;
  readonly modelID: number;
  readonly model: string;
  readonly brandID: number;
  readonly brand: string;
  readonly quantity: number;
  readonly sortIndex: number;
}

export interface KitModels {
  readonly results: { [kitID: number]: Array<KitModel> };
  readonly tempKitModels: Array<KitModel>;
  readonly showLoadingSpinner: boolean;
}
