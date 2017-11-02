// @flow
const Page = require('./Page').Page;

class MainMenu extends Page {

  constructor ( driver: any, by: any, until: any, entryPoint: string ) {
    super(driver,by, until, entryPoint );
  }

  isActive (): Promise<Boolean> {
    return super.getEntryDom().getAttribute('class')
    .then( (r) => {
      return r.match(/is-active/) !== null;
    });
  }

}

exports.MainMenu = MainMenu;