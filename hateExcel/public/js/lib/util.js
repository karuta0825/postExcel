( function ($) {

  var util = {};


  util.addOption = function ( list_option, selectbox, has_all ) {

    var option;

    $(selectbox).find('option').remove();

    if ( !has_all ) {
      $(selectbox).append( $('<option>', { 'value' : 'all', 'text' : '全て' }) );
    }

    _.each( list_option, function (val, key) {
      option = $('<option>', { 'value' : val.name, 'text' : val.name });
      $(selectbox).append(option);
    });

    return selectbox;

  };

  util.addServerOption = function ( list_option, selectbox ) {

    var option;

    $(selectbox).find('option').remove();

    _.each( list_option, function (val, key) {
      option = $('<option>', { 'value' : val.name, 'text' : val.name + ' ( ' + val.ip + ' ) ' });
      $(selectbox).append(option);
    });

    return selectbox;

  };

  /**
   * 文字列をUnicode配列に変換
   * @param  {String} str  - 文字列
   * @return {Array}  list - 文字配列
   */
  var convertStr2UnicodeList = function ( str ) {
    var list = [];
    for( var i = 0; i < str.length; i ++ ) {
      list.push( str.charCodeAt( i ) );
    }
    return list;
  };

  /**
   * [convertUnicode2Sjis description]
   * @param  {String} str - 文字列
   * @return {Array}      - SJIS変換した文字配列
   */
  var convertUnicode2Sjis = function ( str ) {

    var list_unicode, list_sjis;

    list_unicode = convertStr2UnicodeList(str);

    list_sjis = Encoding.convert(
      list_unicode, // 文字列を直接渡すのではない点に注意
      'SJIS',   // to
      'UNICODE' // from
    );

    return [ new Uint8Array( list_sjis ) ];

  };

  /**
   * jsonを受け取って、csvファイル用のblobオブジェクトを返す
   * @param  {String} mapList    - オブジェクト配列
   * @param  {String} str_header - csvのヘッダー要素となる文字列（カンマ区切り）
   * @return {Blob}
   * @example
   * _makeBlobFromMapList( mapList, )
   */
  util.convertMap2Blob = function ( mapList, str_header ) {

    var
      bom    = new Uint8Array([0xEF, 0xBB, 0xBF])
    , output = _.map( mapList, function ( val, key ) {
        return _.values(val).join(',') + '\r\n'
      })
    ;

    // CSVのとき
    if ( str_header ) {
      output.unshift( str_header + '\r\n');
    }

    // output.unshift( bom );

    // Uunicode -> SJIS変換
    output = convertUnicode2Sjis( output.join('') );

    return new Blob( output, { 'type' : 'text/plain' } );

  };

  util.makeMapList2Txt = function ( mapList ) {

    var output = _.map( mapList, function ( v, k ) {
      return k + '' + v + '\r\n';
    });

    output = convertUnicode2Sjis( output.join('') );

    return new Blob( output, {'type' : 'text/plain'} );

  };

  /**
   * TODO: CSV,json,txtなど一元管理する
   * @param  {DOM}    element
   * @param  {Blob}   Blob
   * @param  {String} filename
   */
  util.downloadFile = function ( element, Blob, filename ) {
    $(element).attr('download', filename );
    $(element).attr('href', window.URL.createObjectURL(Blob) );
  };

  /**
   * アラートダイアログ作成
   * @param  {[type]} map_option
   * @return {[type]}
   */
  util.alert = function ( map_option ) {

    // 入力チェック
    if ( !_.isObject( map_option ) ) {
      throw new Error("can't make dialog because argument is not object.");
    }

    if ( !map_option.hasOwnProperty('selector') ) {
      throw new Error("can't make dialog because the argument don't have selector key.");
    }

    var
      dialog  = $('<dialog>', { 'class' : 'mdl-dialog', 'id' : map_option['id'] } )
    , title   = $('<h6>', { 'class' : 'mdl-dialog__title', 'text' : 'アラート' })
    , content = $('<p>',  { 'class' : 'mdl-dialog__content', 'text' : map_option['msg']})
    , action  = $('<div>', { 'class' : 'mdl-dialog__actions'} )
    , btnYes  = $('<button>', { 'type' : 'button', 'class' : 'btn modal-btn--yes mdl-button', 'text' : 'OK' })
    ;

    action.append(btnYes);

    dialog
      .append( title )
      .append( content )
      .append( action )
      ;

    btnYes.on('click', function () {
      if( typeof map_option.yes === 'function' ) {
        map_option.yes(this);
      }
      dialog.get(0).close();
    });

    $(map_option['selector']).append(dialog);

  };

  /**
   * [dialog description]
   * @param  {Object} map_option
   * @param  {String}  map_option.selector
   * @param  {String}  map_option.id
   * @param  {String}  map_option.title
   * @param  {String}  map_option.msg
   */
  util.confirm = function ( map_option ) {

    // 入力チェック
    if ( !_.isObject( map_option ) ) {
      throw new Error("can't make dialog because argument is not object.");
    }

    if ( !map_option.hasOwnProperty('selector') ) {
      throw new Error("can't make dialog because the argument don't have selector key.");
    }

    var
      dialog  = $('<dialog>', { 'class' : 'mdl-dialog', 'id' : map_option['id'] } )
    , title   = $('<h6>', { 'class' : 'mdl-dialog__title', 'text' : '確認' })
    , content = $('<p>',  { 'class' : 'mdl-dialog__content', 'text' : map_option['msg']})
    , action  = $('<div>', { 'class' : 'mdl-dialog__actions'} )
    , btnYes  = $('<button>', { 'type' : 'button', 'class' : 'btn modal-btn--yes mdl-button', 'text' : 'OK' })
    , btnNo   = $('<button>', { 'type' : 'button', 'class' : 'btn modal-btn--no mdl-button', 'text' : 'キャンセル' })
    ;

    action
      .append(btnYes)
      .append(btnNo)
      ;

    dialog
      .append( title )
      .append( content )
      .append( action )
      ;

    btnYes.on('click', function () {
      if( typeof map_option.yes === 'function' ) {
        map_option.yes(this);
      }
      dialog.get(0).close();
    });

    btnNo.on('click', function () {
      if( typeof map_option.no === 'function' ) {
        map_option.no(this);
      }
      dialog.get(0).close();
    });

    $(map_option['selector']).append(dialog);

  };

  util.confirmYesNo = function ( map_option ) {

    // 入力チェック
    if ( !_.isObject( map_option ) ) {
      throw new Error("can't make dialog because argument is not object.");
    }

    if ( !map_option.hasOwnProperty('selector') ) {
      throw new Error("can't make dialog because the argument don't have selector key.");
    }

    var
      dialog  = $('<dialog>', { 'class' : 'mdl-dialog', 'id' : map_option['id'] } )
    , title   = $('<h6>', { 'class' : 'mdl-dialog__title', 'text' : '確認' })
    , content = $('<p>',  { 'class' : 'mdl-dialog__content', 'text' : map_option['msg']})
    , action  = $('<div>', { 'class' : 'mdl-dialog__actions'} )
    , btnYes  = $('<button>', { 'type' : 'button', 'class' : 'btn modal-btn--yes mdl-button', 'text' : 'はい' })
    , btnNo   = $('<button>', { 'type' : 'button', 'class' : 'btn modal-btn--no mdl-button', 'text' : 'いいえ' })
    ;

    action
      .append(btnYes)
      .append(btnNo)
      ;

    dialog
      .append( title )
      .append( content )
      .append( action )
      ;

    btnYes.on('click', function () {
      if( typeof map_option.yes === 'function' ) {
        map_option.yes(this);
      }
      dialog.get(0).close();
    });

    btnNo.on('click', function () {
      if( typeof map_option.no === 'function' ) {
        map_option.no(this);
      }
      dialog.get(0).close();
    });

    $(map_option['selector']).append(dialog);

  };


  /**
   * [Validate description]
   * input check Class
   * @param {Object} config
   */
  util.Validate = function ( config ) {

    if ( ! (this instanceof util.Validate) ) {
      return new util.Validate ( config );
    }
    this.config = config;
    this.messages = [];

  };

  var ValidateProto = util.Validate.prototype;

  // 入力チェック項目の設定
  // validateエラー時に、falseを返す
  ValidateProto.types = {
    noCheck : {
      validate : function () {
        return true;
      },
      instructions : '存在のみチェック通過'
    },
    isEmpty : {
      validate : function ( value ) {
        return !_.isEmpty(value);
      },
      instructions : '空文字はあかんで'
    },
    isNumber : {
      validate : function ( value ) {
        if ( value === '' ) { return true }
        return _.isNumber(value);
      },
      instructions : '数値しかあかんで'
    },
    isId : {
      validate : function ( value ) {
        if ( value === '' ) { return true }
        return (value.match(/^[0-9]+$/)) ? true : false;
      },
      instructions : 'idのみや'
    },
    isNatural : {
      validate : function ( value ) {
        if ( ! value ) { return false; }
        var v = Number(value);
        return v > 0;
      },
      instructions : '自然数だけやで'
    },
    isOverZero : {
      validate : function ( value ) {
        if ( ! value ) { return false; }
        var v = Number(value);
        return v >= 0;
      },
      instructions : '0以上の正数だけや'
    },
    isConmmaAlpa : {
      validate : function ( value ) {
        return _.chain( value.split(','))
        .map( function (v,i) {
          return v !== '' && !(!/[^a-uw-zA-UW-Z]+/).test(v);
        })
        .every( function (v,i) {
          return v === true;
        })
        .value();
      },
      instructions : 'カンマ区切りでV以外のアルファベットを入力してくれ'
    },
    isConmmaOverZero : {
      validate : function ( value ) {
        return _.chain( value.split(',') )
        .map( function (v,i) {
          return Number(v) > 0;
        })
        .every( function (v,i) {
          return v === true;
        })
        .value();
      },
      instructions : 'カンマ区切りで数値を入力してくれ'
    },
    isAlpha : {
      validate : function ( value ) {
        if ( value === '' ) { return true; }
        return (value.match(/^[a-zA-Z]+$/)) ? true : false;
      },
      instructions : 'アルファベットだけや'
    },
    isAlphaNum : {
      validate : function ( value ) {
        if ( value === '' ) { return true; }
        return (value.match(/^[0-9a-zA-Z]+$/)) ? true : false;
      },
      instructions : 'アルファベットと数値だけでんがな'
    },
    isMailAddress : {
      validate : function ( value ) {
        if ( value === '' ) { return true; }
        return ( value.match(/^[0-9a-zA-Z-_@\.]+$/) ) ? true : false;
      },
      instructions : 'メールアドレスの入力やで'
    },
    isBoolean : {
      validate : function ( value ) {
        if ( value === '' ) { return true; }
        return _.isBoolean(value);
      },
      instructions : '論理値だけやで'
    },
    isIp      : {
      validate : function ( value ) {
        if ( value === '' ) { return true; }
        return value.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
      },
      instructions : 'IPアドレスをいれるんやで'
    },
    // 入力強制
    isIp_f      : {
      validate : function ( value ) {
        return value.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
      },
      instructions : 'IPアドレスをいれるんやで'
    },
    isTEL      : {
      validate : function ( value ) {
        if ( value === '' ) { return true; }
        return (value.match(/^[0-9-]+$/)) ? true : false;
      },
      instructions : 'IPアドレスをいれるんやで'
    }
  };

  ValidateProto.validate = function ( data ) {
    var
      i,
      type,
      checker,
      result_ok,
      msg
      ;

    ESC:
    for ( i in data ) {
      if( data.hasOwnProperty(i) ){
        type = this.config[i];
        checker = ValidateProto.types[type];

        // 入力チェック対象外の時
        if( !type ){
          this.messages.push(i);
          continue ESC;
        }
        // 入力チェック関数が存在しないとき
        if( !checker ){
          throw {
            name : 'ValidationError',
            message : '以下の入力チェックメソッドがありません' + type
          };
        }
        // 入力チェック
        result_ok = checker.validate(data[i]);

        // 入力エラーが見つかった場合
        if( !result_ok ){
          this.messages.push(i);
          // this.messages.push({ i : checker.instructions });
        }
      }
    }
    return this.getErrors();
  };

  // エラー時true
  ValidateProto.getErrors = function(){
    var result = this.messages;
    this.messages = [];
    return result;
  };

  // 公開
  this.util = util;

}(jQuery ));