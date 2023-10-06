-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: wedding_manager
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id_account` bigint NOT NULL,
  `flag_delete` bit(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `id_role` bigint DEFAULT NULL,
  PRIMARY KEY (`id_account`),
  KEY `FKn2ojv1jm3miwie24w3mop7j1p` (`id_role`),
  CONSTRAINT `FKn2ojv1jm3miwie24w3mop7j1p` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combo`
--

DROP TABLE IF EXISTS `combo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo` (
  `id_combo` bigint NOT NULL,
  `name_combo` varchar(255) DEFAULT NULL,
  `price_combo` double DEFAULT NULL,
  PRIMARY KEY (`id_combo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo`
--

LOCK TABLES `combo` WRITE;
/*!40000 ALTER TABLE `combo` DISABLE KEYS */;
/*!40000 ALTER TABLE `combo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id_contract` bigint NOT NULL,
  `cancel_contract` bit(1) DEFAULT NULL,
  `contract_date` datetime(6) DEFAULT NULL,
  `deposit` double DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `status_contract` bit(1) DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `id_combo` bigint DEFAULT NULL,
  `id_customer` bigint DEFAULT NULL,
  `id_employee` bigint DEFAULT NULL,
  PRIMARY KEY (`id_contract`),
  KEY `FKc2ptrjk222e0wa9mwl3qk65ww` (`id_combo`),
  KEY `FKfh4gnj5nj1jofunmnhhtxo8ko` (`id_customer`),
  KEY `FKbj5yasaugty275jgcrppl7pr7` (`id_employee`),
  CONSTRAINT `FKbj5yasaugty275jgcrppl7pr7` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id_employee`),
  CONSTRAINT `FKc2ptrjk222e0wa9mwl3qk65ww` FOREIGN KEY (`id_combo`) REFERENCES `combo` (`id_combo`),
  CONSTRAINT `FKfh4gnj5nj1jofunmnhhtxo8ko` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_detail`
--

DROP TABLE IF EXISTS `contract_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_detail` (
  `id_contract_detail` bigint NOT NULL,
  `wedding_date` varchar(255) DEFAULT NULL,
  `id_contract` bigint DEFAULT NULL,
  `id_dress` bigint DEFAULT NULL,
  `id_vest` bigint DEFAULT NULL,
  PRIMARY KEY (`id_contract_detail`),
  KEY `FKjswdedip8jc6fgerumf74iwhx` (`id_contract`),
  KEY `FKdegab1a8nik3w3jhpbhy4c6k6` (`id_dress`),
  KEY `FK8qrnbcvfu467cney2p63x3evw` (`id_vest`),
  CONSTRAINT `FK8qrnbcvfu467cney2p63x3evw` FOREIGN KEY (`id_vest`) REFERENCES `vest` (`id_vest`),
  CONSTRAINT `FKdegab1a8nik3w3jhpbhy4c6k6` FOREIGN KEY (`id_dress`) REFERENCES `dress` (`id_dress`),
  CONSTRAINT `FKjswdedip8jc6fgerumf74iwhx` FOREIGN KEY (`id_contract`) REFERENCES `contract` (`id_contract`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_detail`
--

LOCK TABLES `contract_detail` WRITE;
/*!40000 ALTER TABLE `contract_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id_customer` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `flag_delete` bit(1) DEFAULT NULL,
  `name_customer` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dress`
--

DROP TABLE IF EXISTS `dress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dress` (
  `id_dress` bigint NOT NULL,
  `date_maintenance` varchar(255) DEFAULT NULL,
  `flag_delete` bit(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `information` varchar(255) DEFAULT NULL,
  `maintenance_times` int DEFAULT NULL,
  `name_dress` varchar(255) DEFAULT NULL,
  `id_item` bigint DEFAULT NULL,
  `id_status` bigint DEFAULT NULL,
  `id_type_dress` bigint DEFAULT NULL,
  PRIMARY KEY (`id_dress`),
  KEY `FK41nvk40sflhgu08f8r427cbe4` (`id_item`),
  KEY `FKee80adyy8tkde4o5a8av5kxpx` (`id_status`),
  KEY `FK8j954scfl65nnaa7us0ltdu59` (`id_type_dress`),
  CONSTRAINT `FK41nvk40sflhgu08f8r427cbe4` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`),
  CONSTRAINT `FK8j954scfl65nnaa7us0ltdu59` FOREIGN KEY (`id_type_dress`) REFERENCES `type_dress` (`id_type_dress`),
  CONSTRAINT `FKee80adyy8tkde4o5a8av5kxpx` FOREIGN KEY (`id_status`) REFERENCES `item_status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dress`
--

LOCK TABLES `dress` WRITE;
/*!40000 ALTER TABLE `dress` DISABLE KEYS */;
/*!40000 ALTER TABLE `dress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id_employee` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `flag_delete` bit(1) DEFAULT NULL,
  `name_employee` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `id_account` bigint DEFAULT NULL,
  PRIMARY KEY (`id_employee`),
  KEY `FKhhedu9y9tffk4o0s0hj9pqs52` (`id_account`),
  CONSTRAINT `FKhhedu9y9tffk4o0s0hj9pqs52` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id_item` bigint NOT NULL,
  `flag_delete` bit(1) DEFAULT NULL,
  `name_item` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_status`
--

DROP TABLE IF EXISTS `item_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_status` (
  `id_status` bigint NOT NULL,
  `name_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_status`
--

LOCK TABLES `item_status` WRITE;
/*!40000 ALTER TABLE `item_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id_role` bigint NOT NULL,
  `name_role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_dress`
--

DROP TABLE IF EXISTS `type_dress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_dress` (
  `id_type_dress` bigint NOT NULL,
  `name_type_dress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_type_dress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_dress`
--

LOCK TABLES `type_dress` WRITE;
/*!40000 ALTER TABLE `type_dress` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_dress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vest`
--

DROP TABLE IF EXISTS `vest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vest` (
  `id_vest` bigint NOT NULL,
  `date_maintenance` varchar(255) DEFAULT NULL,
  `flag_delete` bit(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `information` varchar(255) DEFAULT NULL,
  `maintenance_times` int DEFAULT NULL,
  `name_vest` varchar(255) DEFAULT NULL,
  `id_item` bigint DEFAULT NULL,
  `id_status` bigint DEFAULT NULL,
  PRIMARY KEY (`id_vest`),
  KEY `FK9al25eul4f7yqq9muhegrg659` (`id_item`),
  KEY `FK5fmbihtydss0f8cg4ue2yck9h` (`id_status`),
  CONSTRAINT `FK5fmbihtydss0f8cg4ue2yck9h` FOREIGN KEY (`id_status`) REFERENCES `item_status` (`id_status`),
  CONSTRAINT `FK9al25eul4f7yqq9muhegrg659` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vest`
--

LOCK TABLES `vest` WRITE;
/*!40000 ALTER TABLE `vest` DISABLE KEYS */;
/*!40000 ALTER TABLE `vest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 14:00:22
