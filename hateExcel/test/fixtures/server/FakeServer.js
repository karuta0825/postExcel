import sinon from 'sinon';
import _ from 'underscore';

export default class FakeServer {

  constructor ( obj, method) {
    this.server = sinon.stub( obj, method );
  }

  setFetch ( args, returnValue = [] ) {

    if ( args ) {
      this.server.withArgs(args);
    }

    this.server.returns( returnValue );

  }

  setFetchAsync( args, returnValue = [] ) {

    if ( args ) {
      this.server.withArgs(args);
    }

    this.server.returns( Promise.resolve(returnValue) );

  }

  when () {

    return sinon.stub().withArgs.apply(this.server, arguments );
 
  }

  destroy () {
    this.server.restore();
  }

}