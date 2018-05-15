# fenics更新の差分を取得する機能作成

## 項目
- fenics_id
- password
- pc_name
- fenics_ip
- start_on
- end_on

## before afterの組み合わせを考える
| no | before | after  |  diff  | actual |
|----|--------|--------|--------|--------|
|  1 | null   | null   | -      |        |
|  2 | null   | ''     | -      |        |
|  3 | null   | value  | value  |        |
|  4 | ''     | null   | -      |        |
|  5 | ''     | ''     | -      |        |
|  6 | ''     | value  | value  |        |
|  7 | value  | ''     | ''     |        |
|  8 | value  | null   | null   |        |
|  9 | value  | value  | -      |        |
| 10 | value  | value2 | value2 |        |
| 11 |        |        |        |        |


## test data
var test = {
  fenics_id:"vomw01004",
  fenics_ip:"172.20.11.134",
  password:"vomw01004",
  pc_name:"VOMW01004",
  start_on:"2017-10-05",
  end_on : ""
}

### no4
var test = {
  fenics_id:"vomw01004",
  fenics_ip:"172.20.11.134",
  password:"vomw01004",
  pc_name:"VOMW01004",
  start_on:"2017-10-05",
  end_on : null
}
console.log(customer.model.userNetwork.diff(test));


### no5
var test = {
  fenics_id:"vomw01004",
  fenics_ip:"172.20.11.134",
  password:"vomw01004",
  pc_name:"VOMW01004",
  start_on:"2017-10-05",
  end_on : ""
}
console.log(customer.model.userNetwork.diff(test));


### no6
var test = {
  fenics_id:"vomw01004",
  fenics_ip:"172.20.11.135",
  password:"vomw01004",
  pc_name:"VOMW01004",
  start_on:"2017-10-05",
  end_on : "2017-12-04"
}
console.log(customer.model.userNetwork.diff(test));


### no7
var test = {
  fenics_id:"vomw01004",
  fenics_ip:"",
  password:"vomw01004",
  pc_name:"VOMW01004",
  start_on:"2017-10-05",
  end_on : ""
}
console.log(customer.model.userNetwork.diff(test));

### no8
var test = {
  fenics_id:"vomw01004",
  fenics_ip:null,
  password:"vomw01004",
  pc_name:"VOMW01004",
  start_on:"2017-10-05",
  end_on : ""
}
console.log(customer.model.userNetwork.diff(test));

### no9
var test = {
  fenics_id:"vomw01004",
  fenics_ip:"172.20.11.134",
  password:"vomw01004",
  pc_name:"VOMW01004",
  start_on:"2017-10-05",
  end_on : ""
}
console.log(customer.model.userNetwork.diff(test));

### no10
var test = {
  fenics_id:"vomw01004",
  fenics_ip:"172.20.11.135",
  password:"vomw01004",
  pc_name:"VOMW01004",
  start_on:"2017-10-05",
  end_on : ""
}

console.log(customer.model.userNetwork.diff(test));
