
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

      // const data = {
      //   "kids":{"id":3452,"number_pc":11,"user_name":"B訪問看護ステーション","has_qa":"1"},
      //   "clients":{"kids_id":3452,"number":5},
      //   "customers":{"kids_id":3452,"postal_cd":"12341111","address":"東京都太田区北千束1-2-3","owner":"介護オーナー","affliation":"介護情報部","tel":"090-333-3333","fax":"080-333-3333","has_mobile":1,"has_busiv":0,"has_fenics":1},
      //   "licenses":{"kids_id":3452,"K1":1,"U1":1,"U2":1,"U3":0,"U4":1,"U5":0,"U6":0,"U7":0,"U8":1,"U9":0,"UA":0,"UB":0,"UC":0,"UD":0,"UE":0,"UF":0,"UG":0,"UH":0,"UI":0,"C1":0,"C2":0,"C3":0,"C4":0,"S2":0,"S3":0,"S9":0,"SC":0,"SE":0,"SH":0,"SI":0,"SJ":0,"SL":0,"SM":0,"SO":0},
      //   "partners":{"kids_id":3452,"sa_pid":"10101","sa_company":"販社名","sa_postal_cd":"郵便番号","sa_address":"111-1111","sa_affliation":"SA所属","sa_kana":"SAフリガナ","sa_name":"SA担当者","sa_tel":"090-111-1111","sa_fax":"080-111-1111","sa_email":"sa@mail.com","se_pid":"10101","se_company":"販社名","se_postal_cd":"111-2222","se_address":"SE住所","se_affliation":"SE所属","se_kana":"SEフリガナ","se_name":"SE担当者","se_tel":"090-222-2222","se_fax":"080-222-2222","se_email":"se@mail.com","em_company":"緊急連絡先社名","em_name":"担当者","em_tel":"090-333-3333","em_email":"em@mail.com"},
      //   "mobiles":{"kids_id":3452,"number":5},"busivs":{"kids_id":3452,"cc_ip":"a","sx_ip":"a","has_L3":"a","has_cc":"a","has_sx":"a","w_router":"a","w_subnet":"a","has_carte":"a","open_date":"a","w_network":"a","carte_system":"a","circuit_name":"a","auth_server_ip":"a","circuit_service":"a","how_to_cooperate":"a","carte_html_save_ip":"a","download_server_ip":"a"},
      //   "kid":"KID98414"
      // };

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

        },
        mobilies: {

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
        .then(() => License.select(kids_id))
        .then((r) => {
          assert(r[0].U1 === Number(data.licenses.U1));
        })
        .then(() => Partner.select(kids_id))
        .then((r) => {
          assert(r[0].sa_company === data.partners.sa_company);
        })
        .then(() => Busiv.select(kids_id))
        .then((r) => {
          assert(r[0].cc_ip === data.busivs.cc_ip);
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
