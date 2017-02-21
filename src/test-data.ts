export class TestData {
  public static item = {
    tag: 'banana',
    brand: 'Canon',
    model: 'T5i',
    category: 'Camera',
    status: 'Available'
  };

  public static items = [{
    tag: 'banana',
    brand: 'Canon',
    model: 'T5i',
    category: 'Camera',
    status: 'Available'
  },
  {
    tag: 'banana',
    brand: 'Canon',
    model: 'T5i',
    category: 'Camera',
    status: 'Available'
  }];

  public static details = {
    startDate: '01/01/2017',
    endDate: '01/02/2017'
  };

  public static brands = [
    { name: 'Canon', id: 5 },
    { name: 'Nikon', id: 6 },
    { name: 'Sennheiser', id: 7}
  ];

  public static models = [
    { name: 'T5i', id: 5 },
    { name: 'e609', id: 6 },
    { name: 'MKE 600', id: 7},
    { name: 'D5', id: 8}
  ];

  public static statuses = [
    { name: 'Available', id: 5 },
    { name: 'Rented', id: 6 },
    { name: 'Getting Fixed', id: 7}
  ];

  public static categories = [
    { name: 'Camera', id: 5 },
    { name: 'Mic', id: 6 },
    { name: 'Light', id: 7}
  ];

  public static credentials = {
    email: 'luke@rebellion.com',
    password: 'yodarocks'
  };

  public static loginResponse = {
    id: 1,
    token: '987234.sdf0982347234.hjgsdf89234',
    message: 'organization credentials are valid'
  };

  public static response = {
    message: 'Successful operation'
  };
}
