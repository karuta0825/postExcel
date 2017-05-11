#drop trigger kids_delete;

use customer;
DELIMITER $$

CREATE TRIGGER kids_delete AFTER DELETE ON kids FOR EACH ROW
 BEGIN

	delete from licenses where kid = old.kid;
    delete from customers where kid = old.kid;
    delete from partners where kid = old.kid;    
    delete from clients where kid = old.kid;
    delete from historys where kid = old.kid;
   
 END;
$$

DELIMITER ;kids_delete
