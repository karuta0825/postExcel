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
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `order` int(3) NOT NULL,
  `service_id` varchar(2) NOT NULL,
  `service_name` varchar(45) NOT NULL,
  PRIMARY KEY (`order`,`service_id`),
  UNIQUE KEY `service_id_UNIQUE` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'K1','基本サービス'),(2,'U1','U1サービス'),(3,'U2','U2サービス'),(4,'U3','U3サービス'),(5,'U4','U4サービス'),(6,'U5','U5サービス'),(7,'U6','U6サービス'),(8,'U7','U7サービス'),(9,'U8','U8サービス'),(10,'U9','U9サービス'),(11,'UA','UAサービス'),(12,'UB','UBサービス'),(13,'UC','UCサービス'),(14,'UD','UDサービス'),(15,'UE','UEサービス'),(16,'UF','UFサービス'),(17,'UG','UGサービス'),(18,'UH','UHサービス'),(19,'UI','UIサービス'),(20,'C1','C1サービス'),(21,'C2','C2サービス'),(22,'C3','C3サービス'),(23,'C4','C4サービス'),(24,'S2','S2サービス'),(25,'S3','S3サービス'),(26,'S9','S9サービス'),(27,'SC','SCサービス'),(28,'SE','SEサービス'),(29,'SH','SHサービス'),(30,'SI','SIサービス'),(31,'SJ','SJサービス'),(32,'SL','SLサービス'),(33,'SM','SMサービス'),(34,'SO','SOサービス');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-15 21:53:10
