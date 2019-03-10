#drop trigger customers_insert;

use kms;
DELIMITER $$

CREATE TRIGGER customers_insert AFTER INSERT ON customers FOR EACH ROW
 BEGIN


	INSERT INTO busivs (kids_id, base_id) values( new.kids_id, new.base_id );
	INSERT INTO mobiles (kids_id, base_id) values( new.kids_id, new.base_id );
    
 END;
$$

DELIMITER ;customers_insert
