import assert from 'power-assert';
import _ from 'underscore';
import sinon from 'sinon';
import FakeServer from '../fixtures/server/kids';
import DATA from '../fixtures/data/kids';


describe('model.kidsモジュール', () => {


  describe('initModule & getHeader', () => {

    it('サーバーより取得したヘッダー情報を返す');

  });

  describe('fetch & getCache', () => {

    it('サーバーより取得した全ユーザーデータを返す', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        assert.deepEqual( customer.model.kids.getCache(), DATA.fetch.list.out );
        assert( spy.called === true );
      });

    });

  });

  describe('getData', () => {

    it('メモリキャッシュに保存した全ユーザーデータでページオブジェクトを初期化して、現在のページを返す', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        assert.deepEqual( customer.model.kids.getData(), DATA.fetch.list.out.slice( 0, 30 ) );
      });

    });

    it('メモリキャッシュに保存した全ユーザーデータでページオブジェクトを初期化して、現在のページを引数にコールバック関数を実行', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();
      var spy2 = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        customer.model.kids.getData( spy2 )
      })
      .then( () => {
        assert( spy2.called === true );
      })
      ;

    });

  });


  describe('find', () => {

    it('id=1で検索した結果を取得', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        assert.deepEqual( customer.model.kids.find({id:1})[0], DATA.fetch.list.out[0] )
      })
      ;

    });

    it('kid="KID55001"で検索した結果を返す', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        assert.deepEqual( customer.model.kids.find({kid:"KID55001"})[0], DATA.fetch.list.out[0] )
      })
      ;

    });

    it('server="AP1-1"で検索した結果を返す', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        assert.deepEqual( customer.model.kids.find({server:"AP1-1"})[0], DATA.fetch.list.out[0] )
      })
      ;

    });

  });

  describe('delete', () => {

    it('id=1のユーザーデータを削除する');

  });

  describe('getFilter', () => {

    it('初期状態のフィルター結果を返す');

    it('システム情報"cloud"でフィルター後、フィルター結果を返す');

  });

  describe('getCondition', () => {

    it('初期状態では全プロパティ=allで返す');

  });

  describe('setCondition', () => {

  });

  describe('sortByCol', () => {

    it('全ユーザー情報を"kid"で降順に並び替えた結果を返す');

    it('全ユーザー情報を"kid"で昇順に並び替えた結果を返す');

  });

  describe('update', () => {

    it('id=1のユーザーのserverをAP1-1に変更する');

  });


  describe('register', () => {

    it('初回時のユーザー情報登録');

  });

  describe('search', () => {

    it('KID55をキーワードに検索すると、KID55を含む検索結果一覧を返す', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        assert.deepEqual( customer.model.kids.search('KID55'),  DATA.fetch.list.out.slice( 0, 30 )) ;
      })
      ;

    });

    it('KID55をキーワードに検索して、コールバックをしているすると検索結果を引数にしてコールバックを実行する', () => {
      var fs = new FakeServer();
      var spy = sinon.spy();
      var spy2 = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        customer.model.kids.search('KID55', spy2 );
        assert( spy2.called === true );
        assert.deepEqual( spy2.getCall(0).args[0], DATA.fetch.list.out.slice( 0, 30 ) );
      })
      ;

    });

  });

  describe('getPageList', () => {

    it('ページ情報を取得 全データ33件よりページは2ページ存在', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        assert.deepEqual( customer.model.kids.getPageList(), [1,2] );
      })
      ;

    });

    it('引数にコールバックを指定した場合、ページ情報を引数にコールバック関数を実行する', () => {

      var fs = new FakeServer();
      var spy = sinon.spy();
      var spy2 = sinon.spy();

      fs.setFetch();

      return customer.model.kids.fetch( null, spy )
      .then( () => {
        fs.destory();
      })
      .then( () => {
        customer.model.kids.getPageList(spy2);
        // 呼ばれたかどうか
        assert( spy2.called === true );
        // 引数にページ一覧が指定されているか
        assert.deepEqual( spy2.getCall(0).args[0], [1,2] );
      })
      ;


    });

  });





});