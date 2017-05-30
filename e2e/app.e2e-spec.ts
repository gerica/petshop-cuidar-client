import { PetshopCuidarClientV120Page } from './app.po';

describe('petshop-cuidar-client-v120 App', () => {
  let page: PetshopCuidarClientV120Page;

  beforeEach(() => {
    page = new PetshopCuidarClientV120Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
