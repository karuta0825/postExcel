 // @flow
/**
 * Pageクラス
 * 全てのページの基本となるスーパークラス
 */

var _ = require('underscore');

class Page {

  driver     : any;
  By         : any;
  until      : any;
  entryPoint : string;
  entryDom   : any;
  elements   : any;

  constructor ( driver: any, By: any, until: any, entryPoint: string ) {
    this.driver     = driver;
    this.By         = By;
    this.until      = until;
    this.entryPoint = entryPoint;
    this.entryDom   = driver.findElement( By.css(entryPoint) );
  }

  // private method
  _deep ( obj: any ) {

    if ( _.isObject(obj) ) {
      return _.mapObject( obj, function (v,k) {
        return this._deep(v);
      },this);
    }
    else {
      return this._findElementByCss( obj );
    }

  }

  _findElementByCss ( selector: string ) : any {
    return this.driver.findElement(
      this.By.css( this.entryPoint + ' ' + selector )
    );
  }

  // public method
  initElements ( elements : any ) {
    this.elements = this._deep(elements);
  }

  get( accesser: string ) {

  }

  getEntryDom () {
    return this.entryDom;
  }


}

exports.Page = Page