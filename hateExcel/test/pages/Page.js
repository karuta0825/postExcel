 //      
/**
 * Pageクラス
 * 全てのページの基本となるスーパークラス
 */

var _ = require('underscore');

class Page {

                   
                   
                   
                      
                   
                   

  constructor ( driver     , By     , until     , entryPoint         ) {
    this.driver     = driver;
    this.By         = By;
    this.until      = until;
    this.entryPoint = entryPoint;
    this.entryDom   = driver.findElement( By.css(entryPoint) );
  }

  // private method
  _deep ( obj      ) {

    if ( _.isObject(obj) ) {
      return _.mapObject( obj, function (v,k) {
        return this._deep(v);
      },this);
    }
    else {
      return this._findElementByCss( obj );
    }

  }

  _findElementByCss ( selector         )       {
    return this.driver.findElement(
      this.By.css( this.entryPoint + ' ' + selector )
    );
  }

  // public method
  initElements ( elements       ) {
    this.elements = this._deep(elements);
  }

  get( accesser         ) {

  }

  getEntryDom () {
    return this.entryDom;
  }


}

exports.Page = Page