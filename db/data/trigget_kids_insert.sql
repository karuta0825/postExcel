#drop trigger kids_insert;

use customer;
DELIMITER $$

CREATE TRIGGER kids_insert AFTER INSERT ON kids FOR EACH ROW
 BEGIN
   INSERT INTO licenses (kid) values(new.kid);
   INSERT INTO customers (kid) values( new.kid );
   INSERT INTO clients ( kid, client_id, client_pass, update_on, is_admin ) values ( new.kid, concat( new.userkey, '0999'), concat( new.userkey, '0999'), new.create_on, 1, new.create_user_id );
   INSERT INTO clients ( kid, client_id, client_pass, update_on, is_admin ) values ( new.kid, concat( new.userkey, '1999'), concat( new.userkey, '1999'), new.create_on, 1, new.create_user_id );
   INSERT INTO partners (kid) values(new.kid);
   INSERT INTO historys (kid, type, create_on, create_user_id ) values( new.kid, '新規', new.create_on, new.create_user_id );
 END;
$$

DELIMITER ;kids_insert
