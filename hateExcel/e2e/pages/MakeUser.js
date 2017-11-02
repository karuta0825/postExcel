// @flow
const Page = require('./Page').Page;

const elements = {
  'btn' : {
    'ok'     : '.btn--ok'
  },
  'select' : {
    'system'  : '.select-system',
    'version' : '.select-version',
    'server'  : '.select-server',
    'kid'     : '.select-kid'
  },
  'options' : {
    'onpre' : '.select-system > option:nth-child(2)',
    'cloud' : '.select-system > option:nth-child(3)',
    'ES'    : '.select-version > option:nth-child(2)',
    'LM'    : '.select-version > option:nth-child(3)',
    'srv1'  : '.select-server > option:nth-child(1)',
  },
  'server-title' : '.select-name.server',
  'kid-title'    : '.select-name.kid',
  'dialog' : {
    'confirm'  : '#make-usr-confirm',
    'complete' : '#complete-make-user',
    'kid'      : '#complete-make-user .kid'
  }
};

class MakeUser extends Page {

  elements : any;

  constructor( driver: any, By: any, until: any ) {
    super( driver, By, until, '.main-contents--mk-usr');
    super.initElements(elements);
  }

  isActive (): Promise<Boolean> {
    return super.getEntryDom().getAttribute('class')
    .then( (r) => {
      return r.match(/is-active/) !== null;
    });
  }

  /**
   * システムの選択
   */
  selectSystem( system: String ): Promise<any> {

    var promise;

    switch ( system ) {
      case 'オンプレ' :
        promise = this.elements.options.onpre.click();
        break;
      case 'クラウド' :
        promise = this.elements.options.cloud.click();
        break;
      default :
        throw new Error('指定した引数は存在しません');
    }

    return promise;

  }

  /**
   * バージョン選択
   */
  selectVersion( version: String ): Promise<any> {

    var promise;

    switch ( version ) {
      case 'ES' :
        promise = this.elements.options.ES.click();
        break;
      case 'LM' :
        promise = this.elements.options.LM.click();
        break;
      default :
        throw new Error('指定した引数は存在しません');
    }

    return promise;

  }

  /**
   * サーバ選択
   * マスタ設定によりoption数が変更するので、
   * ここでははじめの２つを選択肢として利用する
   */
  selectServer( server: String ): Promise<any> {

    var promise;

    switch ( server ) {
      case 'ES' :
        promise = this.elements.options.ES.click();
        break;
      case 'LM' :
        promise = this.elements.options.LM.click();
        break;
      default :
        throw new Error('指定した引数は存在しません');
    }

    return promise;

  }

  /**
   * [specifyKid description]
   * @param  {[type]} kid: String
   */
  specifyKid( kid: String ) {
    this.elements.select.kid.sendKeys(kid);
  }

  /**
   * 作成ボタンをクリック
   */
  makeUser() {
    this.elements.btn.ok.click();
  }

}

exports.MakeUser = MakeUser;
