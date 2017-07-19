SELECT *FROM customer.clients;

SET SQL_SAFE_UPDATES = 0;

use customer;
update clients C, clients C2 set C.client_id = right(C.client_id,4) where C.client_id = C2.client_id;

update clients C, clients C2 set C.client_pass = right(C.client_pass,4) where C.client_pass = C2.client_pass;
