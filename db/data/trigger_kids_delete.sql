#drop trigger kids_delete;

use customer;
DELIMITER $$

CREATE TRIGGER kids_delete AFTER DELETE ON kids FOR EACH ROW
 BEGIN

	delete from licenses where kids_id = old.id;
    delete from customers where kids_id = old.id;
    delete from partners where kids_id = old.id;
    delete from fenics where kids_id = old.id;    
    delete from clients where kids_id = old.id;
    delete from historys where kids_id = old.id;
    delete from busivs where kids_id = old.id;
    delete from mobiles where kids_id = old.id;
   
 END;
$$

DELIMITER ;kids_delete
