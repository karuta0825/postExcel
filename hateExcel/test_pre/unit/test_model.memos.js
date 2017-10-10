import assert from 'power-assert';
import _ from 'underscore';
import sinon from 'sinon';
import FakeServer from '../fixtures/server/memos';
import DATA from '../fixtures/data/memos';

describe('model.user.memosモジュール', () => {

  describe('fetchメソッド', () => {

    it('サーバーからメモデータを取得する', () => {

      var fs = new FakeServer();
      fs.setFetch();

      return customer.model.userMemo.fetch(1)
      .then( function (r) {
        assert.deepEqual( r , DATA.fetch.out );
        fs.destroy();
      });

    });

  });

  describe('findメソッド', () => {

    it('fetchしてからidが1のメモを取得する', () => {

      var fs = new FakeServer();
      fs.setFetch();

      return customer.model.userMemo.fetch(1)
      .then( function (r) {

        assert.deepEqual( customer.model.userMemo.find({id:1})[0], DATA.fetch.out[0] );
        fs.destroy();

      });

    });

  });

  describe('validateメソッド', () => {

    it('空データのidを渡すと、空の配列が返る', () => {

      var data = {
        'id'          : '',
        'kids_id'     : '',
        'priority_id' : '',
        'title'       : 'title',
        'message'     : 'msg'
      };

      assert.deepEqual( customer.model.userMemo.validate(data), [] );

    });

    it('空データのtitleキーを渡すと、titleを要素に含んだ配列が返る', () => {

      var data = {
        'id'          : '',
        'kids_id'     : '',
        'priority_id' : '',
        'title'       : '',
        'message'     : 'msg'
      };

      assert.deepEqual( customer.model.userMemo.validate(data), ['title'] );

    });

    it('空データのmessageをデータを渡すと、messageを要素に含んだ配列が返る', () => {

      var data = {
        'id'          : '',
        'kids_id'     : '',
        'priority_id' : '',
        'title'       : 'title',
        'message'     : ''
      };

      assert.deepEqual( customer.model.userMemo.validate(data), ['message'] );

    });

    it('空データをもつtitleとmessageを受けると、titleとmessageを要素に含んだ配列を返す', () => {

      var data = {
        'id'          : '',
        'kids_id'     : '',
        'priority_id' : '',
        'title'       : '',
        'message'     : ''
      };

      assert.deepEqual( customer.model.userMemo.validate(data), ['title', 'message'] );

    });

    it('入力データがチェック対象のプロパティを持たない場合、存在するプロパティでのみチェックされる', () => {

      var data = {
        'kids_id'     : '',
        'priority_id' : '',
        'title'       : 'title',
        'message'     : 'msg'
      };

      assert.deepEqual( customer.model.userMemo.validate(data), [] );

    });

    it('入力データがチェック対象外のプロパティを持つ場合、対象外のプロパティを要素にもつ配列を返す', () => {

      var data = {
        'no_exist_prop' : '',
        'kids_id'       : '',
        'priority_id'   : '',
        'title'         : 'title',
        'message'       : 'msg'
      };

      assert.deepEqual( customer.model.userMemo.validate(data), ['no_exist_prop'] );

    });


  });

  describe('updateメソッド', () => {

    it('id=1のメモのtitleとmessageを変更する', () => {

      var
        fs = new FakeServer()
      , data = {
          'id'      : 1,
          'kids_id' : 1,
          'title'   : 'タイトル１変更',
          'message' : 'メッセージ１変更'
        }
      , stubViewMemo
      , stubViewKids
      ;

      // スタブで置き換える
      stubViewMemo = sinon.stub( customer.view.editUsrs, 'makeMemos')
      .callsFake( function (r) {
        assert.deepEqual( r, DATA.update.refetch.out );
      });

      stubViewKids = sinon.stub( customer.view.kids, 'refresh' );

      fs.setUpdate();

      return customer.model.userMemo.update( data )
      .then( function () {
        fs.destroy();
        stubViewKids.restore();
        stubViewMemo.restore();
      });


    });

  });

  describe('removeメソッド', () => {

    it('id=1のメモを削除する', () => {

      var
        fs = new FakeServer()
      , stubViewMemo
      , stubViewKids
      , data = {}
      ;

      // スタブで置き換える
      stubViewMemo = sinon.stub( customer.view.editUsrs, 'makeMemos')
      .callsFake( (r) => {
        assert.deepEqual( r, DATA.remove.refetch.out );
      });

      stubViewKids = sinon.stub( customer.view.kids, 'refresh' );

      fs.setRemove();

      data['id'] = 1;
      data['kids_id'] = 1;

      return customer.model.userMemo.remove( data )
      .then( () => {
        fs.destroy();
        stubViewKids.restore();
        stubViewMemo.restore();
      });

    });

  });

  describe('makeMemoメソッド', () => {

    it('メモを新たに作成する', () => {

      var
        fs = new FakeServer()
      , stubViewKids
      , stubModelUserBaseInfo
      , spy = sinon.spy()
      , data = {}
      ;

      fs.setMakeMemo();
      stubViewKids = sinon.stub( customer.view.kids, 'refresh' );
      stubModelUserBaseInfo = sinon.stub( customer.model.userBaseInfo, 'getCache' )
      .callsFake( () => {
        return {
          id : 1
        };
      });

      data = {
        "title"        : "newタイトル",
        "priority_id"  : 1,
        "message"      : "newメッセージ"
      };

      return customer.model.userMemo.makeMemo( data, spy )
      .then( () => {
        assert( spy.called === true );
      });

      fs.destroy();
      stubViewKids.restore();
      stubModelUserBaseInfo.restore();
      spy.restore();

    });

  });


});