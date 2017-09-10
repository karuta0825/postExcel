import assert from 'power-assert';
import _ from 'underscore';
import sinon from 'sinon';
import Fake from '../fixtures/server/memos';
import data from '../fixtures/data/memos';

describe('学習テスト', function () {

  beforeEach( () => {

  });

  describe('fixtureロードテスト', () => {

    it('html取得', function () {

      assert( __html__["public/html/home.html"] !== undefined );

    });

    it('index.ejsの取得は可能か？', function () {

      assert( __html__["views/index.ejs"] !== undefined );

    });

  });


  it('customer名前空間が存在する', function () {

    assert( customer.model !== undefined );

  });

  describe('fakeServer', () => {

    var server;

    beforeEach( () => {
     server = sinon.fakeServer.create();
    });

    afterEach( () => {
      server.restore();
    });

    it('GET', () => {

      server.respondWith("GET", "./resouces/test1.json",
        [200, {"Content-Type":"application/json"},
          '[{"id":12, "comment":"Hey there"}]']);

      var spy = sinon.spy();
      jQuery.getJSON("./resouces/test1.json", spy);
      server.respond();

      assert.deepEqual(spy.getCall(0).args[0],[{id:12, comment:"Hey there"}]);

    });

    it('POST', () => {

      // responseデータ
      var res = 200,
          head = {'Content-Type': 'application/json'},
          body = JSON.stringify({
            data: 'data'
          });

      // レスポンスの指定
      server.respondWith('POST', '/path/to/api', [
        res, head, body
      ]);

      $.post('/path/to/api', function(data, textStatus, jqXHR) {
        assert( data['data'] === 'data' ) ;
      });

      // 疑似サーバからレスポンスを返す
      server.respond();


    });

    it('Promise', () => {

      var stub = sinon.stub( customer.db, 'post');
      var result;

      stub
      .withArgs('/select',{table:'table'})
      .returns( Promise.resolve({'result' : 'ok'}) );

      stub
      .withArgs('/select',{table:'table2'})
      .returns( Promise.resolve({'result' : 'ok2'}) );

      // リクエスト
      return customer.db.post('/select', { table : 'table'} )
      .then(function(r) {
        assert( r.result === 'ok' );
        stub.restore();
      });

    });

    it('import fakeServer', () => {

      var fake = new Fake();
      fake.setFetch();

      return customer.model.userMemo.fetch(1)
      .then( function (r) {
        assert.deepEqual( r[0], data.fetch.out[0] );
        fake.destroy();
      });

    });

    it('fetch & find', () => {

      var fake = new Fake();
      fake.setFetch();

      return customer.model.userMemo.fetch(1)
      .then( function (r) {

        assert.deepEqual( customer.model.userMemo.find({id:1})[0], data.fetch.out[0] );
        fake.destroy();

      });


    });


  });


});