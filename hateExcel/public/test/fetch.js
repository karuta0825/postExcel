/**
 * ブラウザのfetchメソッドを使ってみる。
 * 脱Ajaxを考えるとあり実装だ！
 */
fetch( '/select', {
   method:'POST',
   headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
   body : "table=kids"
})
.then( (r) => {
  return r.json();
})
.then( (j) => {
  console.log(j);
});

// or
fetch( '/select', {
   method:'POST',
   headers: { 'content-type': 'application/json' },
   body : JSON.stringify({ table : 'kids'})
})
.then( (r) => {
  return r.json();
})
.then( (j) => {
  console.log(j);
});


// text
fetch( '/template/user.client.html', {
   method:'get'
})
.then( (r) => {
  return r.text();
})
.then( (j) => {
  console.log(j);
});