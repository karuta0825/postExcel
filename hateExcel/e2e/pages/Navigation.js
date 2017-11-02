// @flow
const Page = require('./Page').Page;
const Home = require('./Home').Home;
const MakeUser = require('./MakeUser').MakeUser;

// CSSセレクタ
const elements = {
  menu       : '.mdl-layout__drawer-button',
  menu_obfus : '.mdl-layout__obfuscator',
  drawer     : '.mdl-layout__drawer',
  home       : 'a[href="#home"]',
  mkUsr      : 'a[href="#mk-usr"]',
  regUsr     : 'a[href="#reg-usr"]',
  usrList    : 'a[href="#view-usr"]',
  setting    : '.mdl-navigation__link.navi-upper-level',
  setting_ul : '.navi-lower-level',
  server     : 'li[href="#settings-servers"]',
  service    : 'li[href="#settings-services"]',
  template   : 'li[href="#settings-memo-template"]',
  login      : 'li[href="#settings-login-info"]'
};

// メニュー項目
type MenuItem = {
  el         : any,
  is_setting : boolean
};

class Navigation extends Page {

  elements : any;

  // コンストラクタ
  constructor ( driver: any, by: any, until: any ) {
    super(driver,by, until, '.mdl-layout' );
    super.initElements(elements);
  }

  /**
   * メニュー項目とそれがセッティング項目かどうかを返す
   * 該当しない入力を渡すと例外あつかい
   * @param  {String}   item  - メニュー項目名
   * @return {MenuItem} obj   - メニューのDOM要素に関するオブジェクト
   * @private
   */
  _getDest ( item : string ) : MenuItem {

    var obj = {};

    switch ( item )  {

      case 'HOME' :
        obj.el = this.elements.home;
        obj.is_setting = false;
        obj.page = Home;
        break;
      case 'ユーザー作成' :
        obj.el = this.elements.mkUsr;
        obj.is_setting = false;
        obj.page = MakeUser;
        break;
      case 'ユーザー登録' :
        obj.el = this.elements.regUsr;
        obj.is_setting = false;
        break;
      case 'ユーザー情報' :
        obj.el = this.elements.usrList;
        obj.is_setting = false;
        break;
      case 'サーバー情報' :
        obj.el = this.elements.server;
        obj.is_setting = true;
        break;
      case 'サービス情報' :
        obj.el = this.elements.service;
        obj.is_setting = true;
        break;
      case 'テンプレート' :
        obj.el = this.elements.template;
        obj.is_setting = true;
        break;
      case 'ログイン' :
        obj.el = this.elements.login;
        obj.is_setting = true;
        break;
      default :
        throw new Error(item　+ 'は存在しないメニューです。引数を確認してください');

    }

    return obj;

  }

  // メニュー画面を開く
  openMenu () {
    // メニューボタンが押せるまで待つ
    this.driver.wait(this.until.elementIsNotVisible(this.elements.menu_obfus, 10000));
    return this.elements.menu.click();

  }

  // メニュー画面を閉じる
  closeMenu() {

    return this.driver.wait(
      this.until.elementIsVisible(this.elements.menu_obfus, 10000)
    ).click();

  }

  /**
   * メニュー内の指定ページに画面遷移
   * @param  {String} menu_name - メニュー名
   */
  move ( menu_name: string ) {

    const target = this._getDest( menu_name );
    const context = this;

    return this.openMenu()
    .then( () => {

      // 設定詳細メニューを表示
      if ( target.is_setting ) {

        // 設定下位メニューが開かれているかどうか
        return context.elements.setting_ul.getCssValue('display')
        .then( (r) => {
          if ( r === 'none' ) {
            context.driver.sleep(50);
            context.elements.setting.click();
          }
        })
      }

    })
    .then(() => {
      return context.driver.wait(
        context.until.elementIsVisible( context.elements.drawer, 100000 )
      );
    })
    .then ( () => {
      context.driver.sleep(200);
      target.el.click();
    })
    .then( () => {
      context.closeMenu();
    })
    .then( () => {
      return new target.page(this.driver, this.By, this.until);
    })
    ;

  }

}

exports.Navigation = Navigation;