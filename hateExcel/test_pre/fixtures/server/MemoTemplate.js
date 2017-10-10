import sinon from 'sinon';
import FakeServer from './FakeServer';
import DATA from '../data/memo.template';

export default class MemoTemplateSrv extends FakeServer {

  constructor(obj,method) {
    super( obj, method );
  }

  setFetch () {
    this.server
    .withArgs('/select')
    .returns( Promise.resolve( DATA.fetch.out ));
  }

  setUpdate () {
    this.server
    .withArgs('/update')
    .returns( Promise.resolve( DATA.update.out ));
  }

  setInsert () {
    this.server
    .withArgs('/insert')
    .returns( Promise.resolve( DATA.insert.out ));
  }

  setDelete () {
    this.server
    .withArgs('/delete')
    .returns( Promise.resolve( DATA.delete.out ));
  }

}
