import assert from 'power-assert';
import _ from 'underscore';
import sinon from 'sinon';
import FakeServer from '../fixtures/server/serverTable';
import DATA from '../fixtures/data/home.server.table';

describe('model.home.serverTableモジュール', () => {

  describe('initModuleメソッド', () => {

    it('fetchしてgetCacheで確認する', () => {

      var fs = new FakeServer();

      fs.setFetch();

      customer.model.homeServerTable.initModule();

      assert.deepEqual( customer.model.homeServerTable.getCache(), DATA.fetch.out );

      fs.destory();

    });

  });


  describe('findメソッド', () => {

    it('全サーバー情報取得後、サーバー名"AP0-h1"で検索にヒットしたオブジェクトを取得する', () => {

      var fs = new FakeServer();

      fs.setFetch();

      customer.model.homeServerTable.fetch();

      assert.deepEqual( customer.model.homeServerTable.find({server:"AP0-h1"})[0], DATA.fetch.out[0] );

      fs.destory();

    });

  });


});