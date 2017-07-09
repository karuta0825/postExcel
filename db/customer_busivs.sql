-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: customer
-- ------------------------------------------------------
-- Server version	5.7.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `busivs`
--

DROP TABLE IF EXISTS `busivs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `busivs` (
  `kid` varchar(9) NOT NULL,
  `base_id` int(1) NOT NULL AUTO_INCREMENT,
  `circuit_name` varchar(45) DEFAULT NULL,
  `circuit_service` varchar(45) DEFAULT NULL,
  `open_date` date DEFAULT NULL,
  `w_network` varchar(15) DEFAULT NULL,
  `w_subnet` varchar(15) DEFAULT NULL,
  `w_router` varchar(15) DEFAULT NULL,
  `has_sx` int(1) DEFAULT NULL,
  `how_to_cooperate` varchar(45) DEFAULT NULL,
  `has_L3` int(1) DEFAULT NULL,
  `sx_ip` varchar(45) DEFAULT NULL,
  `has_carte` int(1) DEFAULT NULL,
  `carte_system` varchar(45) DEFAULT NULL,
  `carte_html_save_ip` varchar(45) DEFAULT NULL,
  `has_cc` int(1) DEFAULT NULL,
  `cc_ip` varchar(15) DEFAULT NULL,
  `download_server_ip` varchar(15) DEFAULT NULL,
  `auth_server_ip` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`base_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `busivs`
--

LOCK TABLES `busivs` WRITE;
/*!40000 ALTER TABLE `busivs` DISABLE KEYS */;
INSERT INTO `busivs` VALUES ('KID08385',6,'回線品目','回線サービス','2017-05-20','192.168.0.0','255.255.255.0','192.168.1.2',1,NULL,1,NULL,1,NULL,NULL,1,NULL,'172.20.2.1',NULL),('KID77777',7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `busivs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-09 10:43:15
