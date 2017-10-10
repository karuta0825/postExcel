import assert from 'power-assert';
import _ from 'underscore';
import sinon from 'sinon';
import FakeServer from '../fixtures/server/events';
import DATA from '../fixtures/data/events';


describe('model.home.eventsモジュール', () => {

  describe('fetchメソッド', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
      return customer.model.homeEvents.fetch('2017-09');
    });

    afterEach( () => {
      fs.destroy();
    });

    it('サーバーから201709のイベントデータを取得する', () => {
      assert.deepEqual( customer.model.homeEvents.getCache(), [{},{},{}] );
    });

  });

  describe('insertメソッド', () => {

    var
      fs
    , spy_success_cb = sinon.spy()
    , spy_fail_cb = sinon.spy()
    ;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
      fs.setInsert();
    });

    afterEach( () => {
      fs.destroy();
    });

    it('月とイベントオブジェクトを指定して、新しいイベントを作成する', () => {

      var data = DATA.insert.in;

      return customer.model.homeEvents.insert('2017-09', data, spy_success_cb, spy_fail_cb )
      .then( () => {
        assert( spy_success_cb.called === true );
        assert.deepEqual( spy_success_cb.getCall(0).args[0], DATA.fetch.out );
      });

    });

    it('イベントオブジェクトにエラーがある場合、失敗時のコールバックが呼び出される', () => {

      var data = DATA.insert_err.in;

      customer.model.homeEvents.insert('2017-09', data, spy_success_cb, spy_fail_cb );

      assert( spy_fail_cb.called === true );

    });

  });

  describe('updateメソッド', () => {

    var
      fs
    , spy_success_cb = sinon.spy()
    , spy_fail_cb = sinon.spy()
    ;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
      fs.setUpdate();
    });

    afterEach( () => {
      fs.destroy();
    });

    it('月とイベントオブジェクトを指定して、イベントの完了ステータスを更新する', () => {

      var data = DATA.update.in;

      return customer.model.homeEvents.update('2017-09', data, spy_success_cb, spy_fail_cb )
      .then( () => {
        assert( spy_success_cb.called === true );
        assert.deepEqual( spy_success_cb.getCall(0).args[0], DATA.fetch.out );
      });

    });

    it('イベントオブジェクトにエラーがある場合、失敗時のコールバックが呼び出される', () => {

      var data = DATA.update_err.in;

      customer.model.homeEvents.update('2017-09', data, spy_success_cb, spy_fail_cb );

      assert( spy_fail_cb.called === true );

    });

  });

  describe('deleteメソッド', () => {

    var
      fs
    , spy = sinon.spy()
    ;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
      fs.setRemove();
    });

    afterEach( () => {
      fs.destroy();
    });

    it('月とイベントオブジェクトを指定して、イベントの完了ステータスを更新する', () => {

      var id = DATA.delete.in.id;

      return customer.model.homeEvents.remove('2017-09', id, spy )
      .then( () => {
        assert( spy.called === true );
        assert.deepEqual( spy.getCall(0).args[0], DATA.fetch.out );
      });

    });

  });


});