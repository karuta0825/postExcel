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

  });

  describe('find', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
    });

    afterEach( () => {
      fs.destroy();
    });

  });

  describe('insert', () => {

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

  describe('setSelectedItem', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
    });

    afterEach( () => {
      fs.destroy();
    });

  });

  describe('getSelectedItem', () => {

    var fs;

    beforeEach( () => {
      fs = new FakeServer( customer.db, 'post' );
      fs.setFetch();
    });

    afterEach( () => {
      fs.destroy();
    });

  });


});