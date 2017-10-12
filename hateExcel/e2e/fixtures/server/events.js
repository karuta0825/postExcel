import sinon from 'sinon';
import FakeServer from './FakeServer';
import DATA from '../data/events';

export default class EventsData extends FakeServer {

  constructor ( obj, method ) {
    super( obj, method );
  }

  setFetch () {
    this.server
    .withArgs('/select', {
      condition : ['2017-09'],
      table : 'events'
    })
    .returns( Promise.resolve( DATA.fetch.out ) );
  }

  setInsert () {

    this.server
    .withArgs('/insert', {
      table : "events",
      data  : [ DATA.insert.in ]
    })
    .returns( Promise.resolve( DATA.insert.out ) )
    ;
  }

  setUpdate () {
    this.server
    .withArgs('/update')
    .returns( Promise.resolve() )
    ;
  }

  setRemove () {
    this.server
    .withArgs('/delete')
    .returns( Promise.resolve() )
    ;
  }

}