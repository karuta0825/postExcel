import sinon from 'sinon';
import DATA from '../data/home.server.table';


export default class FakeServerTableModel {

  constructor () {
    this.server = sinon.stub( customer.db, 'select' );
  }

  setFetch () {
    this.server
    .withArgs('/select', {
      condition : [undefined],
      table : 'available_number_in_each_server'
    })
    .returns( DATA.fetch.out )
    ;
  }

  destory () {
      this.server.restore();
  }

}