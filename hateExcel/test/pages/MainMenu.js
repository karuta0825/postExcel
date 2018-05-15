//
const Page = require('./Page').Page;

class MainMenu extends Page {
  constructor(driver, by, until, entryPoint) {
    super(driver, by, until, entryPoint);
  }

  isActive() {
    return super.getEntryDom().getAttribute('class')
      .then(r => r.match(/is-active/) !== null);
  }
}

exports.MainMenu = MainMenu;
