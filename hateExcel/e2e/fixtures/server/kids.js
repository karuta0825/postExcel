import sinon from 'sinon';
import DATA from '../data/kids';
import _ from 'underscore';

export default class FakeServer {

  constructor () {
    this.server = sinon.stub( customer.db, 'post' );
    this.update = sinon.stub( customer.db, 'update');
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

  setUpdate ( assertion ) {

    var stock;

    this.update
    .withArgs('/update')
    .callsFake( (url,data) => {
      assertion(data);
    })
    ;

  }

  destory () {
    this.server.restore();
    this.update.restore();
  }


};