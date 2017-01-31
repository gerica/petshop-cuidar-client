import { browser, element, by } from 'protractor';

export class PetshopCuidarClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('petshop-root h1')).getText();
  }
}
