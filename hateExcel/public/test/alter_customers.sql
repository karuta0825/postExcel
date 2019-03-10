ALTER TABLE
    `kms`.`customers`;
ADD
    COLUMN `has_qa` INT(1) NULL DEFAULT 0
AFTER
    `has_mobile`,
ADD
    COLUMN `is_new_contract` INT(1) NULL DEFAULT 0
AFTER
    `has_qa`,
ADD
    COLUMN `is_replaced_from_cj` INT(1) NULL DEFAULT 0
AFTER
    `is_new_contract`,
ADD
    COLUMN `is_replaced_from_wc` INT(1) NULL DEFAULT 0
AFTER
    `is_replaced_from_cj`,
ADD
    COLUMN `is_replaced_from_another` INT(1) NULL DEFAULT 0
AFTER
    `is_replaced_from_wc`;