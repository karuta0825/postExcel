// @flow
const MainMenu = require('./MainMenu').MainMenu;
const entryPoint = '.main-contents--settings-login-info';
const elements: any = {};

class LoginInfo extends MainMenu {

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

exports.LoginInfo = LoginInfo;