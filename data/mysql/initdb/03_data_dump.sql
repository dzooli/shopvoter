-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: tagger
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COMMENT='Cities';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Budapest',20210927115739,20210927115739),(2,'PÃ©cs',20210927115739,20210927115739),(3,'Sopron',20210927115739,20210927115739);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `city_id` int NOT NULL,
  `address1` varchar(120) DEFAULT NULL,
  `address2` varchar(120) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_company_city1_idx` (`city_id`),
  CONSTRAINT `fk_company_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Manna Kft.',1,NULL,NULL,NULL,20210927115739,20210927115739),(2,'Anna Kft.',1,NULL,NULL,NULL,20210927115739,20210927115739),(3,'Alma Kft.',2,NULL,NULL,NULL,20210927115739,20210927115739),(4,'Körte Kft.',2,NULL,NULL,NULL,20210927115739,20210927115739),(5,'Banán Kft.',3,NULL,NULL,NULL,20210927115739,20210927115739),(6,'Barack Kft.',3,NULL,NULL,NULL,20210927115739,20210927115739);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT 'The name of the role.',
  `level` enum('1','2','3','4','5') NOT NULL COMMENT 'The role level for multi-level role based access.',
  `description` varchar(200) NOT NULL COMMENT 'Short description of the role.',
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `level_UNIQUE` (`level`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COMMENT='Role dictionary';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'superuser','1','Able to CRUD all',20210927115739,20210927115739),(2,'companyadmin','2','CRUD for users, shops + assignment of own properties',20210927115739,20210927115739),(3,'user','3','Receives the tags after login',20210927115739,20210927115739);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city_id` int NOT NULL,
  `company_id` int NOT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_shop_city1_idx` (`city_id`),
  KEY `fk_shop_company1_idx` (`company_id`),
  CONSTRAINT `fk_shop_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`),
  CONSTRAINT `fk_shop_company1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'Manna Shop 1',1,1,NULL,NULL,NULL,20210927115739,20210927115739),(2,'Manna Shop 2',1,1,NULL,NULL,NULL,20210927115739,20210927115739),(3,'Manna Shop 3',2,1,NULL,NULL,NULL,20210927115739,20210927115739),(4,'Anna Shop 1',1,2,NULL,NULL,NULL,20210927115739,20210927115739),(5,'Anna Shop 2',1,2,NULL,NULL,NULL,20210927115739,20210927115739),(6,'Anna Shop 3',3,2,NULL,NULL,NULL,20210927115739,20210927115739),(7,'Banán Shop 1',1,5,NULL,NULL,NULL,20210927115739,20210927115739),(8,'Banán Shop 2',2,5,NULL,NULL,NULL,20210927115739,20210927115739),(9,'Banán Shop 3',2,5,NULL,NULL,NULL,20210927115739,20210927115739);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `shop_id` int NOT NULL,
  `user_id` int NOT NULL,
  `tagValue` int NOT NULL COMMENT 'Tag value added on the UI.',
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idx_created` (`createdAt`),
  KEY `fk_tag_shop1_idx` (`shop_id`),
  KEY `fk_tag_user1_idx` (`user_id`),
  KEY `idx_user_shop` (`shop_id`,`user_id`),
  KEY `idx_value` (`tagValue`),
  KEY `idx_val_user` (`tagValue`,`user_id`),
  KEY `idx_val_shop` (`tagValue`,`shop_id`),
  CONSTRAINT `fk_tag_shop1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`),
  CONSTRAINT `fk_tag_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emailAddress` varchar(200) NOT NULL,
  `fullName` varchar(120) NOT NULL COMMENT 'Full representation of the user\\''s name.',
  `password` varchar(128) NOT NULL COMMENT 'Securely hashed representation of the user\\''s login password.',
  `emailStatus` enum('unconfirmed','change-requested','confirmed') DEFAULT 'confirmed' COMMENT 'Users might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded\nadmin users).  When the email verification feature is enabled, new users created via the\nsignup form have \\`emailStatus: ''unconfirmed''\\` until they click the link in the confirmation email.\nSimilarly, when an existing user changes their email address, they switch to the "change-requested"\nemail status until they click the link in the confirmation email.',
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `emailChangeCandidate` varchar(200) DEFAULT NULL,
  `isSuperAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `passwordResetToken` varchar(100) DEFAULT NULL,
  `passwordResetTokenExpiresAt` timestamp NULL DEFAULT NULL,
  `emailProofToken` varchar(100) DEFAULT NULL,
  `emailProofTokenExpiresAt` timestamp NULL DEFAULT NULL,
  `stripeCustomerId` varchar(255) DEFAULT NULL,
  `hasBillingCard` tinyint(1) DEFAULT NULL,
  `billingCardBrand` varchar(45) DEFAULT NULL,
  `billingCardLast4` varchar(4) DEFAULT NULL,
  `billingCardExpMonth` varchar(2) DEFAULT NULL,
  `billingCardExpYear` varchar(4) DEFAULT NULL,
  `tosAcceptedByIp` varchar(45) DEFAULT NULL COMMENT 'The IP (ipv4) address of the request that accepted the terms of service.',
  `lastSeenAt` bigint DEFAULT NULL,
  `lastShopLogin` int DEFAULT NULL COMMENT 'The id of the shop from where the user logged in last time.',
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailAddress_UNIQUE` (`emailAddress`),
  UNIQUE KEY `emailProofToken_UNIQUE` (`emailProofToken`),
  KEY `mail_fullname` (`emailAddress`,`fullName`),
  KEY `fk_user_company1_idx` (`company_id`),
  CONSTRAINT `fk_user_company1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 MIN_ROWS=3 CHECKSUM=1 KEY_BLOCK_SIZE=4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@email.com','Test Super','$2a$10$0KG3iODkxCJvFJpM9cUTS.KyymPamxRyU47RMAlEQNi8rzkqFf1G2','confirmed',NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(2,'cadmin@email.com','Test CompanyAdmin','$2a$10$0KG3iODkxCJvFJpM9cUTS.KyymPamxRyU47RMAlEQNi8rzkqFf1G2','confirmed',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(3,'user@email.com','Test User','$2a$10$0KG3iODkxCJvFJpM9cUTS.KyymPamxRyU47RMAlEQNi8rzkqFf1G2','confirmed',NULL,1632744652005,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1632744652005,NULL,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_role_role1_idx` (`role_id`),
  KEY `fk_user_role_user_idx` (`user_id`),
  CONSTRAINT `fk_user_role_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usershop`
--

DROP TABLE IF EXISTS `usershop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usershop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `shop_id` int NOT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usershop_shop1_idx` (`shop_id`),
  KEY `fk_usershop_user1_idx` (`user_id`),
  CONSTRAINT `fk_usershop_shop1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`),
  CONSTRAINT `fk_usershop_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usershop`
--

LOCK TABLES `usershop` WRITE;
/*!40000 ALTER TABLE `usershop` DISABLE KEYS */;
INSERT INTO `usershop` VALUES (1,3,8,NULL,NULL),(2,3,9,NULL,NULL),(3,3,6,NULL,NULL),(4,3,5,NULL,NULL);
/*!40000 ALTER TABLE `usershop` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-27 12:14:23
