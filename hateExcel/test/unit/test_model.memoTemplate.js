import assert from 'power-assert';
import sinon from 'sinon';
import _ from 'underscore';
import FakeServer from '../fixtures/server/MemoTemplate';
import DATA from '../fixtures/data/memo.template';


describe('model.memoTemplateモジュール', () => {

  describe('fetch', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
    });

    afterEach( () => {
      fs.destroy();
    });

    it('fetch', () => {

      return customer.model.memoTemplate.fetch()
      .then( (r) => {
        assert.deepEqual( r, [{}]);
      });

    });

  });

  describe('getCache', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
    });

    afterEach( () => {
      fs.destroy();
    });

    it('test', () => {

      fs
      .when('/select', { table : 'kid' })
      .returns({result:'success'});
      ;

      fs
      .when('/url')
      .returns([]);
      ;

      assert( customer.db.post('/select', {table : 'kid'}) === { result : 'success'} );
      assert( customer.db.post('/url') === [] );

    });


  });

  describe('find', () => {

    var fs;

    // メモテンプレート一覧をクライアント側で読み込む
    beforeEach( () => {
      fs = sinon.stub( customer.db, 'post');
      fs
      .withArgs('/select', {
        condition : [null],
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

  describe('insert', () => {

    var fs;

    beforeEach( () => {
      fs = sinon.stub( customer.db, 'post');
      fs
      .withArgs()
      .returns( Promise.resolve( DATA.fetch.out ) );
      return customer.model.memoTemplate.fetch();
    });

    afterEach( () => {
      fs.restore();
    });

    it('title,messageをプロパティにもつオブジェクトを渡すと、サーバにデータが送られる');

    it('title,messageをプロパティにもつオブジェクトを渡すと、成功時のコールバック関数が呼び出される');

    it('空白のtitleを渡すと、失敗時のコールバック関数が呼び出される');

    it('空白のmessageを渡すと、失敗時のコールバック関数が呼び出される');

  });

  describe('update', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
    });

    afterEach( () => {
      fs.destroy();
    });


  });

  describe('update', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
    });

    afterEach( () => {
      fs.destroy();
    });

  });

  describe('set & get SelectedItem', () => {

    it('id=1をsetしてgetすると、id=1を受け取る', () => {

      customer.model.memoTemplate.setSelectedItem(1);

      assert( customer.model.memoTemplate.getSelectedItem() === 1);

    })


  });


});