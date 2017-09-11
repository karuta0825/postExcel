import sinon from 'sinon';

export default class FakeServer {

  constructor ( obj, method) {
    this.server = sinon.stub( obj, method );
  }

  setFetch ( args, returnValue = [] ) {

    if ( args ) {
      this.server
      .withArgs(args)
      .returns(returnValue);
      return;
    }

    this.server
    .returns(returnValue);

  }

  destroy () {
    this.server.restore();
  }

}