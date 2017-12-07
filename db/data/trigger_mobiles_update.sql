#drop trigger mobiles_update;

use customer;
DELIMITER $$

CREATE TRIGGER mobiles_update AFTER update ON mobiles FOR EACH ROW
 BEGIN
    
	if new.fenics_key != old.fenics_key then
		update fenics F
			set F.fenics_id = Concat( new.fenics_key, right(fenics_id,3) ), 
				F.password = Concat( new.fenics_key, right(fenics_id,3) ) ,
                F.pc_name = Concat( upper(new.fenics_key), right(fenics_id,3) ) 
			where kids_id = old.kids_id and is_mobile = 1;
    end if;

 END;
$$

DELIMITER ;mobiles_update
	