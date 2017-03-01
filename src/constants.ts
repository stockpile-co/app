export class Actions {
  public static rent = 'Rent';
  public static return = 'Return';
  public static add = 'Add';
  public static edit = 'Edit';
};

export class Statuses {
  public static all = 'All';
  public static available = 'Available';
  public static rented = 'Rented';
}

export const ApiUrl = 'https://stockpile.adamvig.com/api';

export class Links {
  public static authenticate = '/auth';
  public static item = '/item';
  public static rental = '/rental';
  public static brand = '/brand';
  public static model = '/model';
  public static category = '/category';
  public static status = '/status';
}

export class Messages {
  private static baseSingular = 'Item successfully ';
  private static basePlural = 'Item(s) successfully ';
  public static itemAdded = Messages.baseSingular + 'added';
  public static itemEdited = Messages.baseSingular + 'edited';
  public static itemDeleted = Messages.baseSingular + 'deleted';
  public static itemsReturned = Messages.basePlural + 'returned';
  public static itemsRented = Messages.basePlural + 'rented';
}

export class ItemProperties {
  public static brand = 'Brand';
  public static model = 'Model';
  public static category = 'Category';
  public static status = 'Status';
}
