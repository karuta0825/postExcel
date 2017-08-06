-- 該当テーブル
-- customers
-- licenses
-- clients
-- fenics
-- busivs
-- partners
-- mobiles
-- memos
-- historys

-- 案１　トリガーで対応するとき
use customer;
DELIMITER $$

CREATE TRIGGER kids_update AFTER update ON kids FOR EACH ROW
 BEGIN
  if new.kid != '' then
    update licenses  set kid = new.kid where kid = old.kid;
    update clients   set kid = new.kid where kid = old.kid;
    update fenics    set kid = new.kid where kid = old.kid;
    update busivs    set kid = new.kid where kid = old.kid;
    update partners  set kid = new.kid where kid = old.kid;
    update mobiles   set kid = new.kid where kid = old.kid;
    update memos     set kid = new.kid where kid = old.kid;
    update historys  set kid = new.kid where kid = old.kid;
  end if;
 END;
$$

DELIMITER ;kids_update

-- 完全ver
#drop trigger kids_update;

use customer;
DELIMITER $$

CREATE TRIGGER kids_update AFTER update ON kids FOR EACH ROW
 BEGIN

  if new.kid != '' then
    update licenses  set kid = new.kid where kid = old.kid;
    update clients   set kid = new.kid where kid = old.kid;
    update fenics    set kid = new.kid where kid = old.kid;
    update busivs    set kid = new.kid where kid = old.kid;
    update partners  set kid = new.kid where kid = old.kid;
    update mobiles   set kid = new.kid where kid = old.kid;
    update memos     set kid = new.kid where kid = old.kid;
    update historys  set kid = new.kid where kid = old.kid;
  end if;

  if new.userkey != '' then
    update clients C
      set C.client_id = Concat( new.userkey, right(client_id,4) ) ,
        C.client_pass = Concat( new.userkey, right(client_id,4) )
      where kid = old.kid;
    end if;

  if new.fenics_key != '' then
    update fenics F
      set F.fenics_id = Concat( new.fenics_key, right(fenics_id,5) ),
        F.password = Concat( new.fenics_key, right(fenics_id,5) )
      where kid = old.kid and is_mobile = 0;
    end if;

 END;
$$

DELIMITER ;kids_update

-- テスト１
UPDATE `customer`.`kids` SET `kid`='KID77777' WHERE `id`='39' and`kid`='KID77160';


-- 案２　変更されないidで対応
-- idの変更
update customers T, kids K set T.kid = K.id where T.kid = K.kid;
update licenses  T, kids K set T.kid = K.id where T.kid = K.kid;
update clients   T, kids K set T.kid = K.id where T.kid = K.kid;
update fenics    T, kids K set T.kid = K.id where T.kid = K.kid;
update busivs    T, kids K set T.kid = K.id where T.kid = K.kid;
update partners  T, kids K set T.kid = K.id where T.kid = K.kid;
update mobiles   T, kids K set T.kid = K.id where T.kid = K.kid;
update memos     T, kids K set T.kid = K.id where T.kid = K.kid;
update historys  T, kids K set T.kid = K.id where T.kid = K.kid;

-- 定義変更
ALTER TABLE `customer`.`customers` CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`customers` CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`licenses`  CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`clients`   CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`fenics`    CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`busivs`    CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`partners`  CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`mobiles`   CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`memos`     CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;
ALTER TABLE `customer`.`historys`  CHANGE COLUMN `kid` `kids_id` VARCHAR(9) NOT NULL ;

-- test
customer.model.userBase.fetch('123').then(function(r) {console.log(r);})
customer.model.userCustomer.fetch('123').then(function(r) {console.log(r);})
customer.model.userLicense.fetch('123').then(function(r) {console.log(r);})
customer.model.clients.fetch('123').then(function(r) {console.log(r);})
customer.model.userNetwork.fetch('123').then(function(r) {console.log(r);})
customer.model.userBusiv.fetch('123').then(function(r) {console.log(r);})
customer.model.userPartner.fetch('123').then(function(r) {console.log(r);})
customer.model.userMobile.fetch('123').then(function(r) {console.log(r);})
customer.model.userMemo.fetch('123').then(function(r) {console.log(r);})
customer.model.userHistory.fetch('123').then(function(r) {console.log(r);})
