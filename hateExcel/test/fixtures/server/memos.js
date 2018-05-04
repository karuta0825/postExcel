import sinon from 'sinon';
import data from '../data/memos';


export default class FakeMemosModel {
  constructor() {
    this.server = sinon.stub(customer.db, 'post');
  }

  setFetch() {
    this.server
      .withArgs('/select', { condition: data.fetch.in, table: 'memos' })
      .returns(Promise.resolve(data.fetch.out));
  }

  setUpdate() {
    this.server
      .withArgs('/update', data.update.in)
      .returns(Promise.resolve());
    this.server
      .withArgs('/select', { condition: data.update.refetch.in, table: 'memos' })
      .returns(Promise.resolve(data.update.refetch.out));
  }

  setRemove() {
    this.server
      .withArgs('/delete', data.remove.in)
      .returns(Promise.resolve());
    this.server
      .withArgs('/select', { condition: data.remove.refetch.in, table: 'memos' })
      .returns(Promise.resolve(data.remove.refetch.out));
  }

  setMakeMemo() {
    this.server
      .withArgs('/makeMemo', data.makeMemo.in)
      .returns(Promise.resolve());
  }

  destroy() {
    this.server.restore();
  }
}

