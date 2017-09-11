import sinon from 'sinon';
import DATA from '../data/kids';
import _ from 'underscore';

export default class FakeServer {

  constructor () {
    this.server = sinon.stub( customer.db, 'post' );
  }

  setFetch () {

    // クローン化しないと、他のメソッドに影響与える
    var clone = _.map( DATA.fetch.list.out, _.clone );

    // ユーザーデータ
    this.server
    .withArgs('/select', {
      condition : [null],
      table     : 'kids'
    })
    .returns( Promise.resolve( clone ) )
    ;

  }

  setUpdate () {

  }

  destory () {
    this.server.restore();
  }


};