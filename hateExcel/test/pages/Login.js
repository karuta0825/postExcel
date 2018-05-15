
const Page = require('./Page').Page;


const elements = {
  id: '.id',
  pass: '.pass',
  btn: {
    login: '.btn--login',
  },
};

class Login extends Page {
  constructor(driver, By, until) {
    super(driver, By, until, '.login');
    super.initElements(elements);
  }

  enter(id, pass) {
    this.get('id').sendKeys(id);
    this.get('pass').sendKeys(pass);
    return this.get('btn__login').click();
  }

  get(property) {
    let local = this.elements;
    property = property.split('__');

    if (property.length === 1) {
      return this.elements[property[0]];
    }

    for (let i = 0; i < property.length; i += 1) {
      local = local[property[i]];
    }
    return local;
  }
}


exports.Login = Login;

