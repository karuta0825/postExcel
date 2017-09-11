import sinon from 'sinon';
import FakeServer from './FakeServer';
import DATA from '../data/kids.header';

export default class HeaderModel extends FakeServer {

  constructor (obj, method) {
    super(obj, method);
  }

  setFetch () {
    super.setFetch();
  }

}