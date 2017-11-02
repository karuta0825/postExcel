// @flow
const MainMenu = require('./MainMenu').MainMenu;
const entryPoint = '.main-contents--settings-services';
const elements: any = {};

class Services extends MainMenu {

  constructor ( driver: any, by: any, until: any ) {
    super(driver,by, until, entryPoint );
    super.initElements(elements);
  }

  // ここは特別のクラスを作ったほうがいいね
  isActive (): Promise<Boolean> {
    return super.getEntryDom().getAttribute('class')
    .then( (r) => {
      return r.match(/is-active/) !== null;
    });
  }

}

exports.Services = Services;