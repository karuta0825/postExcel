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
  `kids_id` int(11) NOT NULL,
  `base_id` int(1) NOT NULL AUTO_INCREMENT,
  `information` json DEFAULT NULL,
  PRIMARY KEY (`base_id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `busivs`
--

LOCK TABLES `busivs` WRITE;
/*!40000 ALTER TABLE `busivs` DISABLE KEYS */;
INSERT INTO `busivs` VALUES (95,17,NULL),(21,18,NULL),(25,19,NULL),(11,20,NULL),(79,21,NULL),(15,22,NULL),(23,23,NULL),(92,24,NULL),(40,25,NULL),(101,26,NULL),(63,27,NULL),(72,28,NULL),(93,29,NULL),(71,30,NULL),(62,31,NULL),(35,32,NULL),(46,33,NULL),(34,34,NULL),(47,35,NULL),(24,36,NULL),(48,37,NULL),(41,38,NULL),(67,39,NULL),(44,40,NULL),(54,41,NULL),(73,42,NULL),(58,43,NULL),(81,44,NULL),(43,45,NULL),(16,46,NULL),(98,47,NULL),(87,48,NULL),(77,49,NULL),(19,50,NULL),(49,51,NULL),(59,52,NULL),(86,53,NULL),(104,54,NULL),(78,55,NULL),(75,56,NULL),(9,57,NULL),(88,58,NULL),(74,59,NULL),(45,60,NULL),(29,61,NULL),(68,62,NULL),(105,63,NULL),(65,64,NULL),(36,65,NULL),(28,66,NULL),(12,67,NULL),(83,68,NULL),(22,69,NULL),(57,70,NULL),(53,71,NULL),(66,72,NULL),(31,73,NULL),(7,74,NULL),(13,75,NULL),(18,76,NULL),(61,77,NULL),(69,78,NULL),(99,79,NULL),(85,80,NULL),(90,81,NULL),(30,82,NULL),(97,83,NULL),(82,84,NULL),(26,85,NULL),(94,86,NULL),(56,87,NULL),(33,88,NULL),(96,89,NULL),(80,90,NULL),(52,91,NULL),(38,92,NULL),(50,93,NULL),(55,94,NULL),(39,95,NULL),(10,96,'{\"rx_ip\": \"afafdafd\", \"sx_ip\": \"192.168.1.3\", \"has_rx\": 0, \"has_sd\": 0, \"w_router\": \"\", \"w_subnet\": \"255.255.255.0\", \"has_sxr_j\": 0, \"open_date\": \"a\", \"w_network\": \"192.196.181.11\", \"clients_ip\": \"fadfafafkd\", \"circuit_name\": \"aaa\", \"virtual_dl_ip\": \"\", \"auth_server_ip\": \"alfkjad;faj\", \"circuit_service\": \"afadfdfs\"}'),(5,97,NULL),(27,98,NULL),(103,99,NULL),(32,100,NULL),(102,101,NULL),(84,102,NULL),(14,103,NULL),(120,104,'{\"cc_ip\": \"\", \"sx_ip\": \"\", \"has_L3\": 0, \"has_cc\": 0, \"has_sx\": 0, \"w_router\": \"\", \"w_subnet\": \"192.168.1.2\", \"has_carte\": 0, \"open_date\": \"\", \"w_network\": \"\", \"carte_system\": \"\", \"circuit_name\": \"fhfak\", \"auth_server_ip\": \"\", \"circuit_service\": \"\", \"how_to_cooperate\": \"\", \"carte_html_save_ip\": \"\", \"download_server_ip\": \"\"}'),(64,105,NULL),(37,106,NULL),(70,107,NULL),(20,108,NULL),(76,109,NULL),(89,110,NULL),(6,111,NULL),(91,112,NULL),(60,113,NULL),(42,114,NULL),(51,115,NULL),(111,116,NULL),(100,117,NULL),(106,118,NULL),(107,119,NULL),(115,120,NULL),(122,121,NULL),(123,122,NULL),(126,123,NULL),(15,124,NULL),(139,130,NULL),(146,134,NULL),(147,135,NULL),(148,136,NULL),(149,137,NULL),(150,138,NULL),(151,139,NULL),(152,140,NULL),(154,142,NULL),(155,143,NULL),(156,144,NULL),(619,145,NULL),(623,147,NULL),(625,148,NULL),(627,149,NULL),(628,150,NULL),(629,151,NULL),(630,152,NULL),(631,153,NULL),(632,154,NULL),(633,155,NULL),(634,156,NULL),(635,157,NULL),(636,158,NULL),(646,168,NULL),(647,169,NULL),(651,173,'{\"cc_ip\": \"\", \"sx_ip\": \"\", \"has_L3\": 0, \"has_cc\": 0, \"has_sx\": 0, \"w_router\": \"\", \"w_subnet\": \"\", \"has_carte\": 0, \"open_date\": \"\", \"w_network\": \"192.168.1.1\", \"carte_system\": \"\", \"circuit_name\": \"a\", \"auth_server_ip\": \"\", \"circuit_service\": \"vb\", \"how_to_cooperate\": \"\", \"carte_html_save_ip\": \"\", \"download_server_ip\": \"\"}');
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

-- Dump completed on 2017-09-24 14:01:19
