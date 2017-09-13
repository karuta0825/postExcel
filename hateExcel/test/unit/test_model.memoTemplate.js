import assert from 'power-assert';
import sinon from 'sinon';
import _ from 'underscore';
import DATA from '../fixtures/data/memo.template';


describe('■model.memoTemplateモジュール', () => {

  describe('fetchメソッド', () => {

    var fs;

    beforeEach( () => {
      fs = sinon.stub( customer.db, 'post');
      fs
      .withArgs('/select', {
        condition : [undefined],
        table : 'memo_templates'
      })
      .returns( Promise.resolve( DATA.fetch.out ) );
    });

    afterEach( () => {
      fs.restore();
    });

    it('サーバーから全テンプレートを取得する', () => {

      return customer.model.memoTemplate.fetch()
      .then( (r) => {
        assert.deepEqual( r, DATA.fetch.out );
      });

    });

  });

  describe('getCacheメソッド', () => {


    var fs;

    beforeEach( () => {
      fs = sinon.stub( customer.db, 'post');
      fs
      .withArgs('/select', {
        condition : [undefined],
        table : 'memo_templates'
      })
      .returns( Promise.resolve( DATA.fetch.out ) );
      return customer.model.memoTemplate.fetch();
    });

    afterEach( () => {
      fs.restore();
    });

    it('サーバーから取得しメモリ内に保存した全テンプレートを取得する', () => {

      assert.deepEqual( customer.model.memoTemplate.getCache(), DATA.fetch.out );

    });


  });

  describe('findメソッド', () => {

    var fs;

    // メモテンプレート一覧をクライアント側で読み込む
    beforeEach( () => {
      fs = sinon.stub( customer.db, 'post');
      fs
      .withArgs('/select', {
        condition : [undefined],
        table : 'memo_templates'
      })
      .returns( Promise.resolve( DATA.fetch.out ) );
      return customer.model.memoTemplate.fetch();
    });

    afterEach( () => {
      fs.restore();
    });

    it('id:1を引数にすると選択されたテンプレートがid:1となる', () => {

      customer.model.memoTemplate.find({id:1});

      assert( customer.model.memoTemplate.getSelectedItem() === 1 );

    });

    it('id:1を引数にするとid:1のテンプレートを返す', () => {

      assert.deepEqual( customer.model.memoTemplate.find({id:1})[0], DATA.fetch.out[0] );

    });

    it('id:1を引数にしてコールバック関数を渡すと、id:1のテンプレートを引数にコールバック関数が実行される', () => {

      var spy = sinon.spy();

      customer.model.memoTemplate.find({id:1}, spy );

      assert( spy.called === true );
      assert.deepEqual( spy.getCall(0).args[0][0], DATA.fetch.out[0] );

    });

  });

  describe('insertメソッド', () => {

    var fs;

    beforeEach( () => {
      fs = sinon.stub( customer.db, 'post');
    });

    afterEach( () => {
      fs.restore();
    });

    it('title,messageをプロパティにもつオブジェクトを渡すと、サーバにデータが送られる', () => {

      var data = { title : 'タイトル', msg : 'メッセージ'};

      fs
      .withArgs('/insert', { 'data' : [data], table : 'memo_templates'})
      .callsFake( (url, post) => {
        assert.deepEqual( post, { 'data' : [data], table : 'memo_templates'} );
        return Promise.resolve({"result" : "ok"});
      });

    });

    it('title,messageをプロパティにもつオブジェクトを渡すと、成功時のコールバック関数が呼び出される', () => {

      var
        data = { title : 'タイトル', msg : 'メッセージ'}
      , spy_success = sinon.spy()
      , spy_fail = sinon.spy()
      ;

      fs
      .withArgs('/insert', { 'data' : [data], table : 'memo_templates'})
      .returns( Promise.resolve({ "result" : "ok"}) );

      return customer.model.memoTemplate.insert( data, spy_success, spy_fail )
      .then( () => {
        assert( spy_success.called === true );
      });

    });

    it('空白のtitleを渡すと、失敗時のコールバック関数が呼び出され、コールバックの引数は["title"]である', () => {

      var
        data = { title : '', msg : 'メッセージ' }
      , spy_success = sinon.spy()
      , spy_fail = sinon.spy()
      ;

      fs
      .withArgs('/insert', { 'data' : [data], table : 'memo_templates'})
      .returns( Promise.resolve({ "result" : "ok"}) );

      customer.model.memoTemplate.insert( data, spy_success, spy_fail );

      assert( spy_fail.called === true );
      assert.deepEqual( spy_fail.getCall(0).args[0], ['title']);


    });

    it('空白のmessageを渡すと、失敗時のコールバック関数が呼び出され、コールバックの引数は["message"]である', () => {

      var
        data = { title : 'タイトル', msg : '' }
      , spy_success = sinon.spy()
      , spy_fail = sinon.spy()
      ;

      fs
      .withArgs('/insert', { 'data' : [data], table : 'memo_templates'})
      .returns( Promise.resolve({ "result" : "ok"}) );

      customer.model.memoTemplate.insert( data, spy_success, spy_fail );

      assert( spy_fail.called === true );
      assert.deepEqual( spy_fail.getCall(0).args[0], ['msg']);

    });

  });

  describe('updateメソッド', () => {

    var fs;

    beforeEach( () => {
      fs = sinon.stub( customer.db, 'post');
    });

    afterEach( () => {
      fs.restore();
    });

    it('id,title,messageをプロパティにもつオブジェクトを渡すと、サーバにデータが送られる');

    it('id,title,messageをプロパティにもつオブジェクトを渡すと、成功時のコールバック関数が呼び出される');

    it('空白のtitleを渡すと、失敗時のコールバック関数が呼び出され、コールバックの引数は["title"]である');

    it('空白のmessageを渡すと、失敗時のコールバック関数が呼び出され、コールバックの引数は["message"]である');



  });

  describe('removeメソッド', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      customer.model.memoTemplate.setSelectedItem(1);
    });

    afterEach( () => {
      fs.destroy();
    });

    it('setされたid:1のテンプレートを削除し、テンプレートを再取得し1つでも存在すれば0番目を選択テンプレートに設定する');

    it('コールバックを引数に指定して、削除後に再取得したテンプレートが１つでも存在すると、実行される');


  });

  describe('set & get SelectedItem', () => {

    it('id=1をsetしてgetすると、id=1を受け取る', () => {

      customer.model.memoTemplate.setSelectedItem(1);

      assert( customer.model.memoTemplate.getSelectedItem() === 1);

    });


  });


});