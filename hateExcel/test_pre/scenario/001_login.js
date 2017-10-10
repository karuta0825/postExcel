// テストツール
const assert = require('power-assert');
const t = require('selenium-webdriver/testing');

// selenium
const webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until;

// 各種Pageオブジェクト
const LoginPage = require('../pages/Login').Login;

var driver;

t.describe('認証画面', function () {

  //ブラウザ起動が完了したかどうか
  var read = false;

  //全テストの実行前に行う処理
  t.before(function() {

    driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    driver.get('http://localhost:8080').then(function(){
      read = true;
    });

  });

  //全テスト完了後に行う処理
  t.after(function() {
    driver.quit();
  });

  t.describe('ログイン', () => {

    t.it('正しいidとpasswordを入力しログインすると、トップページに遷移する');

    t.it('誤った組み合わせのidとpasswordを入力しログインすると、現在の画面にリダイレクトする');

    t.it('空のidとpasswordを入力しログインすると、現在の画面にリダイレクトする');

  });

  t.describe('アカウント作成', () => {

    t.it('アカウント作成ボタンをクリックすると、入力項目が表示される');

    t.it('入力項目に値をいれて作成ボタンをクリックすると、完了画面が表示される');

    t.it('入力項目のidに不適切な値を入れると、エラー通知が表示されて完了画面には遷移しない')

  });

  t.describe('ログアウト', () => {

    t.it('ログイン後ログアウトをクリックすると、認証画面に戻る');

  });

});



