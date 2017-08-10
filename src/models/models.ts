export interface Model {
  readonly modelID: number;
  readonly brandID: number;
  readonly name: string;
  readonly organizationID: number;
}

export interface Models {
  readonly results: { [modelID: number]: Model };
  readonly filtered: Array<Model>;
  readonly showAddNew: boolean;
}
