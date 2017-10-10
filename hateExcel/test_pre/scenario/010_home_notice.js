// @flow
// テストツール
const assert = require('power-assert');
const t = require('selenium-webdriver/testing');

// selenium
const webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

// 各種Pageオブジェクト
const LoginPage = require('../pages/Login').Login;
const Navigation = require('../pages/Navigation').Navigation;
const Home = require('../pages/Home').Home;

var driver;

t.describe('HOME_お知らせ画面', () => {

  //ブラウザ起動が完了したかどうか
  var read = false;
  var l,n,h;

  //全テストの実行前に行う処理
  t.before( () => {

    driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    driver.get('http://localhost:8080').then( () => {
      read = true;
    });

    // ログイン
    l = new LoginPage(driver, By, until );
    return l.enter('aka', 'aka')
    .then( () => {
      n = new Navigation(driver, By, until );
    });

  });

  //全テスト完了後に行う処理
  t.after( () => {
    driver.quit();
  });

  t.it('もっと見るをクリックすると、お知らせ表示内容が追加される', () => {
    n.move('HOME');
    // TODO:　n.move()の返り値として初期化クラスを渡せばよいのだ。
    h = new Home( driver, By, until );

    h.moreMsg()
    .then( () => {
      return h.getMsgNumber();
    })
    .then((r) => {
      assert( r === 21 );
    });

  });

  t.describe('お知らせの絞りこみ', () => {

    t.it('新規を選択すると、新規のお知らせだけが表示される', () => {
      h.filter('新規')
      .then((r) => {
        assert( r === 0 );
      });
    });

    t.it('更新を選択すると、更新のお知らせだけが表示される', () => {
      h.filter('更新')
      .then((r) => {
        assert( r === 21 );
      });
    });

    t.it('削除を選択すると、削除のお知らせだけが表示される', () => {
      h.filter('削除')
      .then((r) => {
        assert( r === 0 );
      });
    });

    t.it('追加を選択すると、追加のお知らせだけが表示される', () => {
      h.filter('追加')
      .then((r) => {
        assert( r === 0 );
      });
    });

    t.it('全てを選択すると、全てのお知らせが表示される', () => {
      h.filter('全て')
      .then((r) => {
        assert( r === 21 );
      });
    });

  });

  t.it('お知らせの内容をクリックすると、ユーザー詳細画面に遷移する');

});