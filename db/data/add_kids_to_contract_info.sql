ALTER TABLE `customer`.`columns`
ADD COLUMN `is_new_contract` VARCHAR(45) NULL AFTER `is_marked`,
ADD COLUMN `is_replaced_from_cj` VARCHAR(45) NULL AFTER `is_new_contract`,
ADD COLUMN `is_replaced_from_wc` VARCHAR(45) NULL AFTER `is_replaced_from_cj`,
ADD COLUMN `is_replaced_from_another` VARCHAR(45) NULL AFTER `is_replaced_from_wc`;
