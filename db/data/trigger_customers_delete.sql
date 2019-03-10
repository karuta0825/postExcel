#drop trigger customers_insert;

use kms;
DELIMITER $$

CREATE TRIGGER customers_delete AFTER DELETE ON customers FOR EACH ROW
 BEGIN


	delete from busivs where base_id = old.base_id;
	delete from mobiles where base_id = old.base_id;
    
 END;
$$

DELIMITER ;customers_delete
