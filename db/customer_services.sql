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
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `service_id` varchar(2) NOT NULL,
  `sales_id` varchar(45) DEFAULT NULL,
  `service_name` varchar(45) NOT NULL,
  `version` varchar(4) NOT NULL,
  PRIMARY KEY (`id`,`service_id`),
  UNIQUE KEY `order_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'K1','AK1','基本サービス','LM'),(2,'U1','AU1','U1サービス','LM'),(3,'U2','AU2','U2サービス','LM'),(4,'U3','AU3','U3サービス','LM'),(5,'U4','AU4','U4サービス','LM'),(6,'U5','AU5','U5サービス','LM'),(7,'U6','AU6','U6サービス','LM'),(8,'U7','AU7','U7サービス','LM'),(9,'U8','AU8','U8サービス','LM'),(10,'U9','AU9','U9サービス','LM'),(11,'UA','AUA','UAサービス','LM'),(12,'UB','AUB','UBサービス','LM'),(13,'UC','AUC','UCサービス','LM'),(14,'UD','AUD','UDサービス','LM'),(15,'UE','AUE','UEサービス','LM'),(16,'UF','AUF','UFサービス','LM'),(17,'UG','AUG','UGサービス','LM'),(18,'UH','AUH','UHサービス','LM'),(19,'UI','AUI','UIサービス','LM'),(20,'C1','AC1','C1サービス','LM'),(21,'C2','AC2','C2サービス','LM'),(22,'C3','AC3','C3サービス','LM'),(23,'C4','AC4','C4サービス','LM'),(24,'S2','AS2','S2サービス','LM'),(25,'S3','AS3','S3サービス','LM'),(26,'S9','AS9','S9サービス','LM'),(27,'SC','ASC','SCサービス','LM'),(28,'SE','ASE','SEサービス','LM'),(29,'SH','ASH','SHサービス','LM'),(30,'SI','ASI','SIサービス','LM'),(31,'SJ','ASJ','SJサービス','LM'),(32,'SL','ASL','SLサービス','LM'),(33,'SM','ASM','SMサービス','LM'),(34,'SO','ASO','SOサービス','LM'),(36,'K1','AK1','基本サービス_ES','ES'),(37,'U1','AU1','U1サービス_ES','ES'),(38,'U2','AU2','U2サービス_ES','ES'),(39,'U3','AU3','U3サービス_ES','ES'),(40,'U4','AU4','U4サービス_ES','ES'),(41,'U5','AU5','U5サービス_ES','ES'),(42,'U6','AU6','U6サービス_ES','ES'),(43,'U7','AU7','U7サービス_ES','ES'),(44,'U8','AU8','U8サービス_ES','ES'),(45,'U9','AU9','U9サービス_ES','ES'),(46,'UA','AUA','UAサービス_ES','ES'),(47,'UB','AUB','UBサービス_ES','ES'),(48,'UC','AUC','UCサービス_ES','ES'),(49,'UD','AUD','UDサービス_ES','ES'),(50,'UE','AUE','UEサービス_ES','ES'),(51,'UF','AUF','UFサービス_ES','ES'),(52,'UG','AUG','UGサービス_ES','ES'),(53,'UH','AUH','UHサービス_ES','ES'),(54,'UI','AUI','UIサービス_ES','ES'),(55,'C1','AC1','C1サービス_ES','ES'),(56,'C2','AC2','C2サービス_ES','ES'),(57,'C3','AC3','C3サービス_ES','ES'),(58,'C4','AC4','C4サービス_ES','ES'),(59,'S2','AS2','S2サービス_ES','ES'),(60,'S3','AS3','S3サービス_ES','ES'),(61,'S9','AS9','S9サービス_ES','ES'),(62,'SC','ASC','SCサービス_ES','ES'),(63,'SE','ASE','SEサービス_ES','ES'),(64,'SH','ASH','SHサービス_ES','ES'),(65,'SI','ASI','SIサービス_ES','ES'),(66,'SJ','ASJ','SJサービス_ES','ES'),(67,'SL','ASL','SLサービス_ES','ES'),(68,'SM','ASM','SMサービス_ES','ES'),(69,'SO','ASO','SOサービス_ES','ES');
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

-- Dump completed on 2017-06-12  0:04:27
