//      
const MainMenu = require('./MainMenu').MainMenu;
const entryPoint = '.main-contents--view-usr';
const elements      = {};

class Kids extends MainMenu {

  constructor ( driver     , by     , until      ) {
    super(driver,by, until, entryPoint );
    super.initElements(elements);
  }

  // ここは特別のクラスを作ったほうがいいね
  isActive ()                   {
    return super.getEntryDom().getAttribute('class')
    .then( (r) => {
      return r.match(/is-active/) !== null;
    });
  }

}

exports.Kids = Kids;