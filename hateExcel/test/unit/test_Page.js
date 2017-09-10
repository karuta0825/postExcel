import assert from 'power-assert';
import _ from 'underscore';
import sinon from 'sinon';

describe('Pageクラス', () => {

  var
    p
  , list = _.range(1,101)
  , item_per_page = 30
  ;

  beforeEach( () => {
    p = new Page( list, item_per_page );
  });

  describe('constructor',  () => {

    it('インスタンス作成',  () =>  {
      assert( p.stock === 3 );
    });

    it('第一引数がない場合は例外を投げる',  () => {

      assert.throws(() => {
        p = new Page();
      },
      (err) => {
        assert( err.message === 'first arugument needs Array' );
        return true;
      });

    });

    it('引数が配列でない場合例外を投げる',  () => {

      assert.throws( () => {
        p = new Page({});
      },
      (err) => {
        assert( err.message === 'first arugument needs Array' );
        return true;
      });

    });

    it('第二引数(1ページ表示件数)がない場合例外を投げる', () => {

      assert.throws( () => {
        p = new Page([1,2,3]);
      },
      (err) => {
        assert( err.message === 'two aruguments need.' );
        return true;
      });

    });

  });

  describe('initializeメソッド',  () => {

    it('idxが存在する', () => {
      assert( p.idx === 1 );
    });

    it('listが存在する', () => {
      assert.deepEqual( p.list, list );
    });

    it('lengthが存在する', () => {
      assert( p.length === list.length );
    });

    it('visible_item_numberが存在する', () => {
      assert( p.visible_item_number === item_per_page );
    });

    it('max_pageが存在する', () => {
      assert( p.max_page === Math.ceil( p.length / item_per_page ) );
    });

    it('表示する件数が0件のとき', () => {
      p = new Page([], 3);
      assert( p.max_page === 1 );
    });

  });

  describe('getメソッド', () => {

    it('2ページ目を取得',  () => {
      assert.deepEqual(p.get(2), _.range(31,61));
    });

    it('指定ページが最大ページ数より高い場合、例外を投げる', () => {
      assert.throws( () => {
        p.get(5);
      },
      (err) => {
        assert( err.message === 'インデックスエラー');
        return true;
      });
    });

    it('指定ページが1より小さい場合、例外を投げる', () => {
      assert.throws( () => {
        p.get(0);
      },
      (err) => {
        assert( err.message === 'インデックスエラー');
        return true;
      })
    });

    it('callbackを引数に取ったときに実行される', () => {

      var spy = sinon.spy();
      p.get( 3, spy );
      assert( spy.called === true );

    });

  });

  describe('nextメソッド', () =>  {

    it('次ページ表示内容を取得する', () => {
      assert.deepEqual( p.next(), _.range(31,61));
    });

    it('次ページが存在しない時nullを返す', () => {
      p.last();
      assert.deepEqual( p.next(), null );
    });

    it('callbackを指定すると実行する', () => {

      var spy = sinon.spy();
      p.next(spy);
      // 予備出されたかチェック
      assert( spy.called === true );
      // 引数チェック
      assert.deepEqual( spy.getCall(0).args[0], _.range(31,61));

    });

  });

  describe('prevメソッド', () =>  {

    it('現在ページが1のときはnullを返す', () => {
      assert( p.prev() === null );
    });

    it('現在ページが1以外のときは、現在ページの一つ前のページ件数を返す', () => {
      p.get(3);
      assert.deepEqual( p.prev(), p.get(2) );
    });

    it('引数にcallbackを指定したときに、前ページ件数を引数にしてcallbackを実行する', () => {
      var spy = sinon.spy();
      p.get(3);
      p.prev(spy);
      // 実行されたかどうかチェック
      assert( spy.called === true );
      // 引数チェック
      assert.deepEqual( spy.getCall(0).args[0], p.get(2) );

    });

  });

  describe('firstメソッド', () => {

    it('1ページ目を返す', () => {
      assert.deepEqual( p.first(), _.range(1,31) );
    });

  });

  describe('lastメソッド', () => {

    it('最終ページを返す', () => {
      assert.deepEqual( p.last(), _.range(91,101) );
    });

  });

  describe('currentメソッド', () => {

    it('現在のページ返す', () => {
      p.get(2);
      assert.deepEqual( p.current(), _.range(31,61) );
    });

  });

  describe('getIndexメソッド', () => {

    it('現在のページ番号を返す', () => {
      assert( p.getIndex() === 1 );
    });

  });

  describe('getMaxPageメソッド', () => {

    it('最後のページ番号を取得', () => {
      assert( p.getMaxPage() === 4 );
    });

  });

  describe('getPageListメソッド', () => {

    it('最大ページ数が表示可能ページ数より少ない時は、1から最大ページ数を返す', () => {
      assert.deepEqual( p.getPageList(), _.range(1,5) );
    });

    it('次のページを読み込む必要がない時は,1,2,3,4,"",Maxを返す', () => {
      p = new Page( _.range(1,401), 30 );
      p.get(2);
      assert.deepEqual( p.getPageList(), [1,2,3,4,'',p.getMaxPage()]);
    });

    it('次ページが存在しない時は1,"",max-3,max-2,max-1,maxを返す', () => {
      p = new Page( _.range(1,401), 30 );
      p.get(13);
      var max = p.getMaxPage();
      assert.deepEqual( p.getPageList(), [1,'',max-3, max-2, max-1, max] );
    });

    it('上記以外のときは、1,"",i-1,i,i+1,"",maxを返す', () => {
      p = new Page( _.range(1,401), 30 );
      p.get(5);
      var i = p.getIndex();
      var max = p.getMaxPage();
      assert.deepEqual( p.getPageList(), [1,'',i-1,i,i+1,'',max] );
    });

  });

});

