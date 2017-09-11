import sinon from 'sinon';
import DATA from '../data/kids';

export default class FakeServer {

  constructor () {
    this.server = sinon.stub( customer.db, 'post' );
  }

  setFetch () {

    // ユーザーデータ
    this.server
    .withArgs('/select', {
      condition : [null],
      table     : 'kids'
    })
    .returns( Promise.resolve( DATA.fetch.list.out ) )
    ;

  }

  setUpdate () {

  }

  destory () {
    this.server.restore();
  }


};