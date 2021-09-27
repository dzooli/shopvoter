-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tagger
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tagger` ;

-- -----------------------------------------------------
-- Schema tagger
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tagger` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci ;
USE `tagger` ;

-- -----------------------------------------------------
-- Table `tagger`.`city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tagger`.`city` ;

CREATE TABLE IF NOT EXISTS `tagger`.`city` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` BIGINT NULL,
  `updatedAt` BIGINT NULL,
  PRIMARY KEY (`id`))
COMMENT = 'Cities';


-- -----------------------------------------------------
-- Table `tagger`.`company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tagger`.`company` ;

CREATE TABLE IF NOT EXISTS `tagger`.`company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `city_id` INT NOT NULL,
  `address1` VARCHAR(120) NULL,
  `address2` VARCHAR(120) NULL,
  `zip` VARCHAR(10) NULL,
  `createdAt` BIGINT NULL,
  `updatedAt` BIGINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_company_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `tagger`.`city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE UNIQUE INDEX `id_UNIQUE` ON `tagger`.`company` (`id` ASC) VISIBLE;

CREATE INDEX `fk_company_city1_idx` ON `tagger`.`company` (`city_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `tagger`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tagger`.`user` ;

CREATE TABLE IF NOT EXISTS `tagger`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `emailAddress` VARCHAR(200) NOT NULL,
  `fullName` VARCHAR(120) NOT NULL COMMENT 'Full representation of the user\\\'s name.',
  `password` VARCHAR(128) NOT NULL COMMENT 'Securely hashed representation of the user\\\'s login password.',
  `emailStatus` ENUM('unconfirmed', 'change-requested', 'confirmed') NULL DEFAULT 'confirmed' COMMENT 'Users might be created as \"unconfirmed\" (e.g. normal signup) or as \"confirmed\" (e.g. hard-coded\nadmin users).  When the email verification feature is enabled, new users created via the\nsignup form have \\`emailStatus: \'unconfirmed\'\\` until they click the link in the confirmation email.\nSimilarly, when an existing user changes their email address, they switch to the \"change-requested\"\nemail status until they click the link in the confirmation email.',
  `createdAt` BIGINT NULL,
  `updatedAt` BIGINT NULL,
  `emailChangeCandidate` VARCHAR(200) NULL COMMENT 'A still-unconfirmed email address that this user wants to change to (if relevant).',
  `isSuperAdmin` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Super admins might have extra permissions, see a different default home page when they log in,\nor even have a completely different feature set from normal users.  In this app, the \\`isSuperAdmin\\`\nflag is just here as a simple way to represent two different kinds of users.  Usually, it\'s a good idea\nto keep the data model as simple as possible, only adding attributes when you actually need them for\nfeatures being built right now.\n\nFor example, a \"super admin\" user for a small to medium-sized e-commerce website might be able to\nchange prices, deactivate seasonal categories, add new offerings, and view live orders as they come in.\nOn the other hand, for an e-commerce website like Walmart.com that has undergone years of development\nby a large team, those administrative features might be split across a few different roles.\n\nSo, while this \\`isSuperAdmin\\` demarcation might not be the right approach forever, it\'s a good place to start.',
  `passwordResetToken` VARCHAR(100) NULL COMMENT 'A unique token used to verify the user\\\'s identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.',
  `passwordResetTokenExpiresAt` TIMESTAMP NULL COMMENT 'A JS timestamp (epoch ms) representing the moment when this user\\\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
  `emailProofToken` VARCHAR(100) NULL COMMENT 'A pseudorandom, probabilistically-unique token for use in our account verification emails.',
  `emailProofTokenExpiresAt` TIMESTAMP NULL,
  `stripeCustomerId` VARCHAR(255) NULL COMMENT 'Just because this value is set doesn\'t necessarily mean that this user has a billing card.\nIt just means they have a customer entry in Stripe, which might or might not have a billing card.',
  `hasBillingCard` TINYINT(1) NULL,
  `billingCardBrand` VARCHAR(45) NULL,
  `billingCardLast4` VARCHAR(4) NULL,
  `billingCardExpMonth` VARCHAR(2) NULL,
  `billingCardExpYear` VARCHAR(4) NULL,
  `tosAcceptedByIp` VARCHAR(45) NULL COMMENT 'The IP (ipv4) address of the request that accepted the terms of service.',
  `lastSeenAt` BIGINT NULL,
  `lastShopLogin` INT NULL COMMENT 'The id of the shop from where the user logged in last time.',
  `company_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `tagger`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
AUTO_INCREMENT = 1
CHECKSUM = 1
MIN_ROWS = 3
KEY_BLOCK_SIZE = 4;

CREATE UNIQUE INDEX `emailAddress_UNIQUE` ON `tagger`.`user` (`emailAddress` ASC) VISIBLE;

CREATE INDEX `mail_fullname` ON `tagger`.`user` (`emailAddress` ASC, `fullName` ASC) VISIBLE;

CREATE UNIQUE INDEX `emailProofToken_UNIQUE` ON `tagger`.`user` (`emailProofToken` ASC) VISIBLE;

CREATE INDEX `fk_user_company1_idx` ON `tagger`.`user` (`company_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `tagger`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tagger`.`role` ;

CREATE TABLE IF NOT EXISTS `tagger`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL COMMENT 'The name of the role.',
  `level` ENUM('1', '2', '3', '4', '5') NOT NULL COMMENT 'The role level for multi-level role based access.',
  `description` VARCHAR(200) NOT NULL COMMENT 'Short description of the role.',
  `createdAt` BIGINT NULL,
  `updatedAt` BIGINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = 'Role dictionary';

CREATE UNIQUE INDEX `id_UNIQUE` ON `tagger`.`role` (`id` ASC) VISIBLE;

CREATE INDEX `level_UNIQUE` USING BTREE ON `tagger`.`role` (`level`) VISIBLE;


-- -----------------------------------------------------
-- Table `tagger`.`user_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tagger`.`userrole` ;

CREATE TABLE IF NOT EXISTS `tagger`.`userrole` (
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `createdAt` BIGINT NULL,
  `updatedAt` BIGINT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  CONSTRAINT `fk_user_role_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `tagger`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_role_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `tagger`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
ALTER TABLE `tagger`.`userrole` 
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`, `user_id`, `role_id`);
;    

CREATE INDEX `fk_user_role_role1_idx` ON `tagger`.`user_role` (`role_id` ASC) VISIBLE;

CREATE INDEX `fk_user_role_user_idx` ON `tagger`.`user_role` (`user_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `tagger`.`shop`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tagger`.`shop` ;

CREATE TABLE IF NOT EXISTS `tagger`.`shop` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `city_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `address1` VARCHAR(45) NULL,
  `address2` VARCHAR(45) NULL,
  `zip` VARCHAR(10) NULL,
  `createdAt` BIGINT NULL,
  `updatedAt` BIGINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_shop_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `tagger`.`city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shop_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `tagger`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `fk_shop_city1_idx` ON `tagger`.`shop` (`city_id` ASC) VISIBLE;

CREATE INDEX `fk_shop_company1_idx` ON `tagger`.`shop` (`company_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `tagger`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tagger`.`tag` ;

CREATE TABLE IF NOT EXISTS `tagger`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shop_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `tagValue` INT NOT NULL COMMENT 'Tag value added on the UI.',
  `createdAt` BIGINT NULL,
  `updatedAt` BIGINT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tag_shop1`
    FOREIGN KEY (`shop_id`)
    REFERENCES `tagger`.`shop` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tag_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `tagger`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE UNIQUE INDEX `id_UNIQUE` ON `tagger`.`tag` (`id` ASC) VISIBLE;

CREATE INDEX `idx_created` ON `tagger`.`tag` (`createdAt` ASC) VISIBLE;

CREATE INDEX `fk_tag_shop1_idx` ON `tagger`.`tag` (`shop_id` ASC) VISIBLE;

CREATE INDEX `fk_tag_user1_idx` ON `tagger`.`tag` (`user_id` ASC) VISIBLE;

CREATE INDEX `idx_user_shop` ON `tagger`.`tag` (`shop_id` ASC, `user_id` ASC) VISIBLE;

CREATE INDEX `idx_value` ON `tagger`.`tag` (`tagValue` ASC) VISIBLE;

CREATE INDEX `idx_val_user` ON `tagger`.`tag` (`tagValue` ASC, `user_id` ASC) VISIBLE;

CREATE INDEX `idx_val_shop` ON `tagger`.`tag` (`tagValue` ASC, `shop_id` ASC) VISIBLE;

DROP TABLE IF EXISTS `tagger`.`usershop` ;
CREATE TABLE IF NOT EXISTS `tagger`.`usershop` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `shop_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `shop_id`),
  INDEX `fk_usershop_shop1_idx` (`shop_id` ASC) VISIBLE,
  INDEX `fk_usershop_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_usershop_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `tagger`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usershop_shop1`
    FOREIGN KEY (`shop_id`)
    REFERENCES `tagger`.`shop` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
ALTER TABLE `tagger`.`usershop` 
ADD COLUMN `createdAt` BIGINT NULL AFTER `shop_id`,
ADD COLUMN `updatedAt` BIGINT NULL AFTER `createdAt`;

ALTER TABLE `tagger`.`usershop` 
ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`, `user_id`, `shop_id`);
;

    
SET SQL_MODE = '';
DROP USER IF EXISTS tagger;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'tagger' IDENTIFIED BY 'tagger';

GRANT ALL ON `tagger`.* TO 'tagger';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
