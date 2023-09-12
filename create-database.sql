CREATE TABLE `wedding_manager`.`item` (
  `id_item` BIGINT NOT NULL,
  `name_item` VARCHAR(45) NOT NULL,
  `flag_delete` BIT(1) NOT NULL,
  PRIMARY KEY (`id_item`));
  
  CREATE TABLE `wedding_manager`.`item_status` (
  `id_status` BIGINT NOT NULL AUTO_INCREMENT,
  `name_status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_status`));

CREATE TABLE `wedding_manager`.`type_dress` (
  `id_type_dress` BIGINT NOT NULL AUTO_INCREMENT,
  `name_type_dress` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_type_dress`));
  
CREATE TABLE `wedding_manager`.`dress` (
  `id_dress` BIGINT NOT NULL,
  `name_dress` VARCHAR(45) NOT NULL,
  `flag_delete` BIT(1) NOT NULL,
  `id_type_dress` BIGINT NOT NULL,
  `id_item` BIGINT NOT NULL,
  `id_status` BIGINT NOT NULL,
  PRIMARY KEY (`id_dress`),
    FOREIGN KEY (`id_type_dress`)
    REFERENCES `wedding_manager`.`type_dress` (`id_type_dress`),
    FOREIGN KEY (`id_item`)
    REFERENCES `wedding_manager`.`item` (`id_item`),
    FOREIGN KEY (`id_status`)
	REFERENCES `wedding_manager`.`item_status` (`id_status`));
    
CREATE TABLE `wedding_manager`.`vest` (
  `id_vest` BIGINT NOT NULL,
  `name_vest` VARCHAR(45) NOT NULL,
  `flag_delete` BIT(1) NOT NULL,
  `id_item` BIGINT NOT NULL,
  `id_status` BIGINT NOT NULL,
  PRIMARY KEY (`id_vest`),
    FOREIGN KEY (`id_item`)
    REFERENCES `wedding_manager`.`item` (`id_item`),
    FOREIGN KEY (`id_status`)
	REFERENCES `wedding_manager`.`item_status` (`id_status`));
    
CREATE TABLE `wedding_manager`.`combo` (
  `id_combo` BIGINT NOT NULL AUTO_INCREMENT,
  `name_combo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_combo`));    
    
CREATE TABLE `wedding_manager`.`role` (
  `id_role` BIGINT NOT NULL AUTO_INCREMENT,
  `name_role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_role`));
  
  
  CREATE TABLE `wedding_manager`.`account` (
  `id_account` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` longtext NOT NULL,
  `flag_delete` BIT(1) NOT NULL,
  `id_role` BIGINT NOT NULL,
  PRIMARY KEY (`id_account`),
    FOREIGN KEY (`id_role`)
    REFERENCES `wedding_manager`.`role` (`id_role`)
   );
   
   
   CREATE TABLE `wedding_manager`.`customer` (
  `id_customer` BIGINT primary key AUTO_INCREMENT,
  `name_customer` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `flag_delete` BIT(1) NOT NULL,
  `address` VARCHAR(45) NULL
);
    
    
CREATE TABLE `wedding_manager`.`employee` (
  `id_employee` BIGINT NOT NULL AUTO_INCREMENT,
  `name_employee` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `flag_delete` BIT(1) NOT NULL,
  `id_account` BIGINT NOT NULL,
  `address` VARCHAR(45) NULL,
  PRIMARY KEY (`id_employee`),
    FOREIGN KEY (`id_account`)
    REFERENCES `wedding_manager`.`account` (`id_account`));
    
CREATE TABLE `wedding_manager`.`contract` (
  `id_contract` BIGINT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
    `id_combo` BIGINT NOT NULL,
  `id_customer` BIGINT NOT NULL,
  `id_employee` BIGINT NOT NULL,
  PRIMARY KEY (`id_contract`),
	FOREIGN KEY (`id_combo`)
    REFERENCES `wedding_manager`.`combo` (`id_combo`),
    FOREIGN KEY (`id_customer`)
    REFERENCES `wedding_manager`.`customer` (`id_customer`),
    FOREIGN KEY (`id_employee`)
    REFERENCES `wedding_manager`.`employee` (`id_employee`));


CREATE TABLE `wedding_manager`.`contract_detail` (
  `id_contract_detail` BIGINT NOT NULL,
  `id_contract` BIGINT NOT NULL,
  `id_dress` BIGINT NOT NULL,
  `id_vest` BIGINT NOT NULL,
  `deposit` DOUBLE NOT NULL,
  PRIMARY KEY (`id_contract_detail`),
    FOREIGN KEY (`id_contract`)
    REFERENCES `wedding_manager`.`contract` (`id_contract`),
    FOREIGN KEY (`id_dress`)
    REFERENCES `wedding_manager`.`dress` (`id_dress`),
     FOREIGN KEY (`id_vest`)
    REFERENCES `wedding_manager`.`vest` (`id_vest`));



