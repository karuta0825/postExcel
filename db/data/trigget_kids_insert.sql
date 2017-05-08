use customer;
#drop trigger kids_insert;
DELIMITER $$

CREATE TRIGGER kids_insert AFTER INSERT ON kids FOR EACH ROW
 BEGIN
   INSERT INTO licenses (kid) values(new.kid);
   INSERT INTO customers (kid) values( new.kid );
   INSERT INTO accounts ( kid, client_id, client_pass, update_on, is_admin ) values ( new.kid, concat( new.userkey, '0999'), concat( new.userkey, '0999'), new.create_on, 1);
   INSERT INTO accounts ( kid, client_id, client_pass, update_on, is_admin ) values ( new.kid, concat( new.userkey, '1999'), concat( new.userkey, '1999'), new.create_on, 1);
   INSERT INTO partners (kid) values(new.kid);
 END;
$$

DELIMITER ;kids_insert
