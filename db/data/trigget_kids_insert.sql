#drop trigger kids_insert;

use customer;
DELIMITER $$

CREATE TRIGGER kids_insert AFTER INSERT ON kids FOR EACH ROW
 BEGIN


	INSERT INTO licenses (kids_id) values( new.id );


  if new.environment_id = '1' || new.environment_id = '2' then
    INSERT INTO customers (kids_id, has_busiv, has_fenics, has_mobile ) values( new.id, 1, 0, 1 );
  else
  	INSERT INTO customers (kids_id) values( new.id );
  end if;


	INSERT INTO partners (kids_id) values( new.id );
	INSERT INTO historys (kids_id, type, item_name, create_on, create_user_id ) values( new.id, '新規', 'ユーザー作成', new.create_on, new.create_user_id );


	if new.userkey != '' then
		INSERT INTO clients ( kids_id, client_id, client_pass, create_on, is_admin, create_user_id ) values ( new.id, concat( new.userkey, '0999'), concat( new.userkey, '0999'), new.create_on, 1, new.create_user_id );
		INSERT INTO clients ( kids_id, client_id, client_pass, create_on, is_admin, create_user_id ) values ( new.id, concat( new.userkey, '1999'), concat( new.userkey, '1999'), new.create_on, 1, new.create_user_id );
	end if;




 END;
$$

DELIMITER ;kids_insert
