//
const MainMenu = require('./MainMenu').MainMenu;

const entryPoint = '.main-contents--home';
const elements = {
  article: {
    notice: '.article-notice',
    table: '.article-servers-table',
  },
  notice: {
    title: '.article-notice .article__title',
    body: '.article-notice .article__body',
    list: '.article-notice__list',
    items: '.article-notice__item--body',
    header: '.article-notice__item--header',
    btnMore: '.article__footer',
    filter: '.article-notice .filter',
    msg: '.notice-item__body .msg',
  },
  options: {
    all: '.article-notice .filter > option:nth-child(1)',
    new: '.article-notice .filter > option:nth-child(2)',
    add: '.article-notice .filter > option:nth-child(3)',
    upd: '.article-notice .filter > option:nth-child(4)',
    del: '.article-notice .filter > option:nth-child(5)',
  },
};

class Home extends MainMenu {
  constructor(driver, by, until) {
    super(driver, by, until, entryPoint);
    super.initElements(elements);
  }

  /**
   * [もっと見る]ボタンをクリックする
   */
  moreMsg() {
    return this.elements.notice.btnMore.click()
      .then(() => {
        this.driver.sleep(20);
      });
  }

  /**
   * 表示されているお知らせ数を返す
   */
  getMsgNumber() {
    return this.driver.executeScript('return $(".article-notice__item--body").length');
  }

  /**
   * お知らせを絞り込んで、表示件数を返す
   */
  filter(name) {
    let promise;

    switch (name) {
      case '全て':
        promise = this.elements.options.all.click();
        break;
      case '新規':
        promise = this.elements.options.new.click();
        break;
      case '更新':
        promise = this.elements.options.upd.click();
        break;
      case '追加':
        promise = this.elements.options.add.click();
        break;
      case '削除':
        promise = this.elements.options.del.click();
        break;
      default:
        throw new Error('指定した引数ではフィルターできません');
    }

    return promise.then(() => {
      this.driver.sleep(1000);
      return this.getMsgNumber();
    });
  }
}

exports.Home = Home;
