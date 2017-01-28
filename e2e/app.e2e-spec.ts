import { ParkingBookingSystemPage } from './app.po';

describe('parking-booking-system App', function() {
  let page: ParkingBookingSystemPage;

  beforeEach(() => {
    page = new ParkingBookingSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
