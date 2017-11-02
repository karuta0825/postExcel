// テストツール
const assert = require('power-assert');
const t = require('selenium-webdriver/testing');

// selenium
const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver');

// 各種Pageオブジェクト
const LoginPage = require('../pages/Login').Login;
const Navigation = require('../pages/Navigation').Navigation;
const Home = require('../pages/Home').Home;
const MakeUser = require('../pages/MakeUser').MakeUser;

var driver;

t.describe('メニュー変更', function () {

  //ブラウザ起動が完了したかどうか
  var read = false;
  var l,n;

  //全テストの実行前に行う処理
  t.before(function() {

    driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    driver.get('http://localhost:8080').then(function(){
      read = true;
    });

    l = new LoginPage(driver, By, until);
    return l.enter('aka','aka')
    .then(() => {
      n = new Navigation(driver, By, until );
    });

  });

  //全テスト完了後に行う処理
  t.after(function() {
    driver.quit();
  });

  t.it('HOME画面に遷移する', () => {

    n.move('HOME')
    .then( (page) => {
      page.isActive().then( (r) => {
        assert(r === true);
      });
    });

  });

  t.it('ユーザー作成画面に遷移する', () => {

    n.move('ユーザー作成')
    .then( (page) => {
      page.isActive().then( (r) => {
        assert( r === true );
      });
    });

  });

  t.it('ユーザー登録画面に遷移する', () => {
    n.move('ユーザー登録');
    var page;
    page.isActive().then( (r) => {
      assert( r === true );
    });
    assert( page === true );
  });

  t.it('ユーザー情報画面に遷移する', () => {
    n.move('ユーザー情報');
    var page;
    page.isActive().then( (r) => {
      assert( r === true );
    });
    assert( page === true );
  });

  t.it('サーバー情報画面に遷移する', () => {
    n.move('サーバー情報');
    var page;
    page.isActive().then( (r) => {
      assert( r === true );
    });
    assert( page === true );

  });

  t.it('サービス情報画面に遷移する', () => {
    n.move('サービス情報');
    var page;
    page.isActive().then( (r) => {
      assert( r === true );
    });
    assert( page === true );
  });

  t.it('テンプレート画面に遷移する', () => {
    n.move('テンプレート');
    var page;
    page.isActive().then( (r) => {
      assert( r === true );
    });
    assert( page === true );
  });

  t.it('ログイン画面に遷移する', () => {
    n.move('ログイン');
    var page;
    page.isActive().then( (r) => {
      assert( r === true );
    });
    assert( page === true );
  });

});



