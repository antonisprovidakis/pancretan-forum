import { PancretanForumPage } from './app.po';

describe('pancretan-forum App', () => {
  let page: PancretanForumPage;

  beforeEach(() => {
    page = new PancretanForumPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
