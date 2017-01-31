import { PetshopCuidarClientPage } from './app.po';

describe('petshop-cuidar-client App', function() {
  let page: PetshopCuidarClientPage;

  beforeEach(() => {
    page = new PetshopCuidarClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('petshop works!');
  });
});
