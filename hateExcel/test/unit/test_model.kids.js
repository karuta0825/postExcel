import assert from 'power-assert';
import _ from 'underscore';
import sinon from 'sinon';
import FakeServer from '../fixtures/server/kids';
import FakeServerHeader from '../fixtures/server/kids.header';
import DATA from '../fixtures/data/kids';
import DATA_HEADER from '../fixtures/data/kids.header';


describe('model.kidsモジュール', () => {


  describe('initModule & getHeaderメソッド', () => {

    it('サーバーより取得したヘッダー情報を返す', () => {

      var fs = new FakeServerHeader( customer.db, 'selectAll' );
      fs.setFetch();

      customer.model.kids.initModule();

      assert.deepEqual( customer.model.kids.getHeader(), DATA_HEADER.fetch.out[0] );

      fs.destroy();

    });

  });

  describe('fetch & getCacheメソッド', () => {

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

  describe('getDataメソッド', () => {

    var fs, spy;

    beforeEach( () => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch( null, spy );
    });

    afterEach( () => {
      fs.destory();
    });

    it('メモリキャッシュに保存した全ユーザーデータでページオブジェクトを初期化して、現在のページを返す', () => {

      assert.deepEqual( customer.model.kids.getData(), DATA.fetch.list.out.slice( 0, 30 ) );

    });

    it('メモリキャッシュに保存した全ユーザーデータでページオブジェクトを初期化して、現在のページを引数にコールバック関数を実行', () => {

      var spy2 = sinon.spy();

      customer.model.kids.getData( spy2 );
      assert( spy2.called === true );

    });

  });


  describe('findメソッド', () => {

    var fs, spy;

    beforeEach( () => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch( null, spy );
    });

    afterEach( () => {
      fs.destory();
    });

    it('id=1で検索した結果を取得', () => {

      assert.deepEqual( customer.model.kids.find({id:1})[0], DATA.fetch.list.out[0] );

    });

    it('kid="KID55001"で検索した結果を返す', () => {

      assert.deepEqual( customer.model.kids.find({kid:"KID55001"})[0], DATA.fetch.list.out[0] )

    });

    it('server="AP1-1"で検索した結果を返す', () => {

      assert.deepEqual( customer.model.kids.find({server:"AP1-1"})[0], DATA.fetch.list.out[0] )

    });

  });

  describe('deleteメソッド', () => {

    it('id=1のユーザーデータを削除する');

  });

  describe('getFilterメソッド', () => {

    var fs, spy;

    // 前処理
    beforeEach(() => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch(null,spy);
    });

    // 後処理
    afterEach( () => {
      customer.model.kids.setCondition({system:'all'});
      fs.destory();
    });

    it('fetch直後は、全データを返す', () => {

      assert( customer.model.kids.getFilter().length === DATA.fetch.list.out.length );
      assert.deepEqual( customer.model.kids.getFilter(), DATA.fetch.list.out );

    });

    it('システム情報"cloud"でフィルター後、フィルター結果を返す', () => {

      customer.model.kids.setCondition({system:'cloud'});
      assert( customer.model.kids.getFilter().length === 23 );

    });

  });

  describe('getConditionメソッド', () => {

    var fs, spy;

    beforeEach( () => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch( null, spy );
    });

    afterEach( () => {

      fs.destory();
    });

    it('fetch直後は全データでページオブジェクトを初期化して１ページ目を返す', () => {

      assert( customer.model.kids.getCondition().length === 30 );
      assert.deepEqual( customer.model.kids.getCondition(), DATA.fetch.list.out.slice( 0, 30 ));

    });

    it('システム情報"cloud"でフィルター後、フィルタ結果でページオブジェクトを初期化して１ページ目を返す', () => {

      customer.model.kids.setCondition({system:'cloud'});
      assert( customer.model.kids.getCondition().length === 23 );

    });

    it('引数にコールバックを指定した場合、1ページ目を引数にコールバック関数を実行する', () => {

      var spy2 = sinon.spy();
      customer.model.kids.getCondition( spy2 );
      assert( spy2.called === true );

    });

  });

  describe('getConditionAllメソッド', () => {

    var fs, spy;

    before( () => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch( null, spy );
    });

    after( () => {
      customer.model.kids.setCondition({system:"all"});
      fs.destory();
    });

    it('システム情報"onpre"でフィルター後実行すると、フィルター結果を返す', () => {

      customer.model.kids.setCondition({system:"onpre"});

      assert( customer.model.kids.getConditionAll().length === 10 );

    });

  });

  describe('setConditionメソッド', () => {

    var fs, spy;

    beforeEach( () => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch( null, spy );
    });

    afterEach( () => {
      fs.destory();
    });

    it('引数にコールバックを指定した場合、1ページ目を引数にコールバック関数を実行する', () => {

      var spy2 = sinon.spy();

      customer.model.kids.setCondition({system:"cloud"}, spy2 );

      assert( spy2.called === true );

    });


  });


  describe('sortByCol', () => {

    var fs, spy;

    beforeEach( () => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch( null, spy );
    });

    afterEach( () => {
      fs.destory();
    });

    it('全ユーザー情報を"kid"で降順に並び替えた結果を返す', () => {

      customer.model.kids.sortByCol('id');
      customer.model.kids.sortByCol('id');

      assert( customer.model.kids.getCache()[0].id === 99 );


    });

    it('全ユーザー情報を"kid"で昇順に並び替えた結果を返す', () => {

      customer.model.kids.sortByCol('id');
      assert( customer.model.kids.getCache()[0].id === 1 );

    });


  });

  describe('update', () => {

    var
      fs
    , spy
    , kidsView
    , homeNoticeView
    , userHistoryView
    , historyFs
    ;

    beforeEach( () => {

      fs = new sinon.stub(customer.db, 'post');
      spy = sinon.spy();

      kidsView        = sinon.stub( customer.view.kids, 'refresh');
      homeNoticeView  = sinon.stub( customer.view.homeNotices, 'refresh');
      userHistoryView = sinon.stub( customer.view.userHistory, 'drawTable');
      historyFs       = sinon.stub( customer.db, 'insert');

      fs.withArgs('/select').returns( Promise.resolve() );

      fs.withArgs('/select', {
        condition : [null],
        table : 'kids'
      }).returns( Promise.resolve(DATA.fetch.list.out ) );

      return customer.model.kids.fetch(null, spy);

    });

    afterEach( () => {
      fs.restore();
      kidsView.restore();
      homeNoticeView.restore();
      userHistoryView.restore();
      historyFs.restore();
    });

    it('id=1のユーザーのserverをAP1-2に変更する', () => {

      var view_data = {'server' : 'AP1-2', 'id' : 1};

      fs.withArgs('/update').callsFake( (url,post) => {
        assert.deepEqual(post, {
          data : { server : 'AP1-2'},
          condition: { id : 1 },
          table : 'kids'
       });
        return Promise.resolve({"result" : "ok"});
      });

      customer.model.kids.update(view_data);

    });

    it('id=1のユーザーの事業者名を「change」に変更すると、サーバにexpectJSONオブジェクトが送られる', () => {

      const view_data = {'user_name' : 'change', 'id' : 1};
      const expect = {
        data : {'user_name' : 'change'},
        condition: { id : 1 },
        table : 'kids'
      };

      fs.withArgs('/update').callsFake( (url,post) => {
        assert.deepEqual(post, expect);
        return Promise.resolve({"result" : "ok"});
      });

      customer.model.kids.update(view_data);

    });

    it('id=1のユーザーの事業者名を「change」に変更すると、履歴作成オブジェクトがサーバーに送られる', () => {

      const view_data = {'user_name' : 'change', 'id' : 1};
      const expect = {
        data : {'user_name' : 'change'},
        condition: { id : 1 },
        table : 'kids'
      };

      fs.withArgs('/update').returns( Promise.resolve({'result' : 'ok'}));

      historyFs.callsFake( (url,data) => {
        assert( data.table === 'historys' );
        assert( data.data[0].kids_id === 1 );
        assert( data.data[0].type === '更新' );
        assert( data.data[0].content_name === '基本情報' );
        assert( data.data[0].item_name === '事業者名' );
        assert( data.data[0].before === 'ユーザー0001' );
        assert( data.data[0].after === 'change' );
      });

      customer.model.kids.update(view_data);

    });

  });

  describe('stub', () => {

    var st;

    beforeEach( () => {
      st = sinon.stub(customer.model.kids, 'fetch');
    });

    afterEach( () => {
      st.restore();
    });

    it('callsFakeのreturnにPromiseを使用できる', () => {


      st.returns( Promise.resolve('ok'));

      // returnが絶対に必要
      return customer.model.kids.fetch().then( (r) => {
        assert( r === 'ok2');
      });


    });

    // it('受け取った引数を返す', () => {

    //   st.returnsArg(0);

    //   assert( st(3) === 2 );

    // });

  });

  /**
   * update系のテストの書き方
   */
  describe('register', () => {

    var fs, spy;

    beforeEach( () => {

      fs = new sinon.stub(customer.db, 'post');
      spy = sinon.spy();

      fs.withArgs('/select', {
        condition : [null],
        table : 'kids'
      }).returns( Promise.resolve(DATA.fetch.list.out ) );

      return customer.model.kids.fetch(null, spy);

    });

    afterEach( () => {
      fs.restore();
    });

    it('初回時のユーザー情報登録', () => {

      fs.withArgs('/update').callsFake( (url,post) => {
        assert.deepEqual( post, {
          data : { kid : '55001' },
          condition : {'id' : 1 },
          table : 'kids'
        });
        return Promise.resolve({"result" : "ok"});
      });

      customer.model.kids.register({ kid : 'KID55001' });

    });

  });

  describe('search', () => {

    var fs, spy;

    beforeEach( () => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch( null, spy );
    });

    afterEach( () => {
      fs.destory();
    });

    it('KID55をキーワードに検索すると、valueにKID55を含む全オブジェクトを配列にして返す', () => {

      assert( customer.model.kids.search('KID55').length === 30);
      assert.deepEqual( customer.model.kids.search('KID55'),  DATA.fetch.list.out.slice( 0, 30 )) ;

    });

    it('KID55をキーワードに検索してコールバックを渡すと、検索結果を引数にしてコールバックを実行する', () => {

      var spy2 = sinon.spy();

      customer.model.kids.search('KID55', spy2 );
      assert( spy2.called === true );
      assert.deepEqual( spy2.getCall(0).args[0], DATA.fetch.list.out.slice( 0, 30 ) );

    });

  });

  describe('getPageList', () => {

    var fs, spy;

    beforeEach( () => {
      fs = new FakeServer();
      spy = sinon.spy();
      fs.setFetch();
      return customer.model.kids.fetch( null, spy );
    });

    afterEach( () => {
      fs.destory();
    });

    it('ページ情報を取得 全データ33件よりページは2ページ存在', () => {

      assert.deepEqual( customer.model.kids.getPageList(), [1,2] );

    });

    it('引数にコールバックを指定した場合、ページ情報を引数にコールバック関数を実行する', () => {

      var spy2 = sinon.spy();

      customer.model.kids.getPageList(spy2);

      assert( spy2.called === true );
      assert.deepEqual( spy2.getCall(0).args[0], [1,2] );


    });

  });





});