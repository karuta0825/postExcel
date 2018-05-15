//
const MainMenu = require('./MainMenu').MainMenu;

const entryPoint = '.main-contents--settings-services';
const elements = {};

class Services extends MainMenu {
  constructor(driver, by, until) {
    super(driver, by, until, entryPoint);
    super.initElements(elements);
  }

  // ここは特別のクラスを作ったほうがいいね
  isActive() {
    return super.getEntryDom().getAttribute('class')
      .then(r => r.match(/is-active/) !== null);
  }
}

exports.Services = Services;
