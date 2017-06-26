import { CriticismSystemPage } from './app.po';

describe('criticism-system App', () => {
  let page: CriticismSystemPage;

  beforeEach(() => {
    page = new CriticismSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
