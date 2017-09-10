import sinon from 'sinon';
import data from '../data/memos';


export default class FakeMemosModel {

  constructor () {
    this.server = sinon.stub( customer.db, 'post' );
    this._setFetch();
  }

  _setFetch () {

    this.server
    .withArgs('/select', {'condition': data.fetch.in, 'table' : 'memos' })
    .returns( Promise.resolve( data.fetch.out ) );

  }

  _setUpdate () {

  }

  _setRemove () {

  }

  destroy () {
    this.server.restore();
  }

}


