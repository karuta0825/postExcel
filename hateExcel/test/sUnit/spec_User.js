
const assert = require('power-assert');
const sinon = require('sinon');
const User = require('../../models/presentations/User.js');
const Kid = require('../..//models/tables/Kid');
const Customer = require('../../models/tables/Customer');
const License = require('../../models/tables/License');
const Busiv = require('../../models/tables/Busiv');
const Partner = require('../../models/tables/Partner');

describe('Userモジュール', () => {
  describe('createメソッド', () => {
    it('ok_ユーザー作成すると、作成されたKIDを返す');
    // it('ユーザー作成', () => {
    //   return User.create({
    //     kid:'10001',
    //     environment_id: 4,
    //     server: 'LAP1-1',
    //     create_user_id:1
    //   })
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });
  });

  describe('registerメソッド', () => {
    it('ユーザー登録', () => {
      const kids_id = 65;
      const data = {
        kid: '22223',
        kids: {
          id: kids_id,
          user_name: 'register名前',
          has_qa: 1,
          is_new_constract: 1,
          is_replaced_from_cj: 1,
        },
        customers: {
          kids_id,
          base_name: 'updated',
          address: '住所はここだ',
        },
        licenses: {
          kids_id,
          K1: '0',
          U1: '1',
          U2: '1',
          U4: '0',
          U5: '1',
        },
        partners: {
          kids_id,
          sa_pid: '10000',
          sa_company: 'sa_company',
          sa_address: 'sa_address',
          sa_kana: 'sa_kana',
          sa_name: 'sa_name',
          sa_tel: '090-1111-1111',
          sa_fax: '080-1111-1111',
          sa_email: 'sa_email',
        },
        busivs: {
          kids_id,
          cc_ip: 'c',
          sx_ip: 'c',
          has_L3: 'c',
          has_cc: 'c',
          has_sx: 'c',
          w_router: 'c',
          w_subnet: 'c',
          has_carte: 'c',
          open_date: 'c',
          w_network: 'c',
          carte_system: 'c',
          circuit_name: 'c',
          auth_server_ip: 'c',
          circuit_service: 'c',
          how_to_cooperate: 'c',
          carte_html_save_ip: 'c',
          download_server_ip: 'c',
        },
        clients: {
          kids_id,
          number: 5,
        },
        mobiles: {
          kids_id,
          number: 5,
        },
      };

      return User.register(data)
        .then(() => Kid.select(kids_id))
        .then((r) => {
          assert(r[0].user_name === data.kids.user_name);
        })
        .then(() => Customer.select(kids_id))
        .then((r) => {
          assert(r[0].address === data.customers.address);
        })
        .then(() => Partner.select(kids_id))
        .then((r) => {
          assert(r[0].sa_company === data.partners.sa_company);
        })
        .then(() => Busiv.select(kids_id))
        .then((r) => {
          assert(r[0].cc_ip === data.busivs.cc_ip);
        })
        .then(() => License.select(kids_id))
        .then((r) => {
          assert(r[0].U1 === Number(data.licenses.U1));
        });
    });

    it('失敗すると、ロールバックする', () => {
      const kids_id = 65;
      const data = {
        kid: '22223',
        kids: {
          id: kids_id,
          user_name: 'register名前2',
          has_qa: 1,
          is_new_constract: 1,
          is_replaced_from_cj: 1,
        },
        customers: {
          // kids_id,
          base_name: 'updated2',
          address: '住所はここにあらず',
        },
        licenses: {
          kids_id,
          K1: '0',
          U1: '0',
          U2: '0',
          U4: '0',
          U5: '0',
        },
        partners: {
          kids_id,
          sa_pid: '20000',
          sa_company: 'sa_company',
          sa_address: 'sa_address',
          sa_kana: 'sa_kana',
          sa_name: 'sa_name',
          sa_tel: '090-1111-1111',
          sa_fax: '080-1111-1111',
          sa_email: 'sa_email',
        },
        busivs: {
          kids_id,
          cc_ip: 'd',
          sx_ip: 'd',
          has_L3: 'd',
          has_cc: 'd',
          has_sx: 'd',
          w_router: 'd',
          w_subnet: 'd',
          has_carte: 'd',
          open_date: 'd',
          w_network: 'd',
          carte_system: 'd',
          circuit_name: 'd',
          auth_server_ip: 'd',
          circuit_service: 'd',
          how_to_cooperate: 'd',
          carte_html_save_ip: 'd',
          download_server_ip: 'd',
        },
        clients: {
          kids_id: 'aaffaflkjdlkfjakljfdklsfjaskl;fasdfkljkaldfj',
          number: 5,
        },
        mobiles: {
          kids_id,
          number: 5,
        },
      };

      return User.register(data)
        .catch((err) => { console.log(err); })
        .then(() => Customer.select(kids_id))
        .then(([{ address }]) => {
          assert(address === '住所はここだ');
        })
        .then(() => Kid.select(kids_id))
        .then(([{ user_name }]) => {
          assert(user_name !== data.kids.user_name);
        })
        .then(() => Partner.select(kids_id))
        .then((r) => {
          assert(r[0].sa_pid === '10000');
        })
        .then(() => Busiv.select(kids_id))
        .then((r) => {
          assert(r[0].cc_ip === 'c');
        })
        .then(() => License.select(kids_id))
        .then((r) => {
          assert(r[0].U1 === 1);
        });
    });
  });

  describe('addBaseメソッド', () => {
    it('ok_KID10000の拠点追加を行う');
    // it('KID10000の拠点追加を行う', () => {
    //   return User.addBase(10000,false)
    //   .then( r => {
    //     assert(r.affectedRows === 1);
    //   })
    // });
  });
});
