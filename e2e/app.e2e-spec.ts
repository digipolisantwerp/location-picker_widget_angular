import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display "Location Picker Demo"', () => {
    expect(page.getTitleText()).toContain('Location Picker Demo');
  });
});
