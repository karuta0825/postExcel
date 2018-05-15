

/**
 * [makeUserKey description]
 * @param  {Number} length [description]
 * @return {String}        [description]
 */
function makeUserKey(length) {
  const c = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
  const l = length;
  const cl = c.length;
  let r = '';

  for(var i=0; i<l; i++){
    r += c[Math.floor(Math.random()*cl)];
  }

  return r;

};

/**
 * [makeFenicsKey description]
 * @param  {Number} length [description]
 * @return {String}        [description]
 */
function makeFenicsKey(length) {
  const c = 'abcdefghijklmnopwrstrvwxyz';
  const l = length;
  const cl = c.length;
  let r = '';

  for(var i=0; i<l; i++){
    r += c[Math.floor(Math.random()*cl)];
  }

  return r;
}

function getNextZeroPadData(value) {
    var
      numOnly  = value.match(/(\d+)$/)[0],
      notNum   = value.substr(0, value.length - numOnly.length),
      fmtNum   = Number(numOnly),
      nextNum  = fmtNum + 1,
      zeroPad  = ( '000' + nextNum ).slice( -1 * numOnly.length ),
      nextData = notNum + zeroPad
      ;
    return nextData;
};

function inet_aton(ip){
    // split into octets
    var a = ip.split('.');
    var buffer = new ArrayBuffer(4);
    var dv = new DataView(buffer);
    for(var i = 0; i < 4; i++){
        dv.setUint8(i, a[i]);
    }
    return(dv.getUint32(0));
}

module.exports = {
  makeUserKey : makeUserKey,
  makeFenicsKey :makeFenicsKey,
  getNextZeroPadData :getNextZeroPadData,
  inet_aton : inet_aton
};