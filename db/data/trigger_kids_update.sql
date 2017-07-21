#drop trigger kids_update;

use customer;
DELIMITER $$

CREATE TRIGGER kids_update AFTER update ON kids FOR EACH ROW
 BEGIN

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
