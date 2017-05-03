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
-- Table structure for table `historys`
--

DROP TABLE IF EXISTS `historys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historys` (
  `kid` varchar(9) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `content_name` varchar(45) DEFAULT NULL,
  `item_name` varchar(45) DEFAULT NULL,
  `before` varchar(45) DEFAULT NULL,
  `after` varchar(45) DEFAULT NULL,
  `create_on` datetime DEFAULT NULL,
  `login_id` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historys`
--

LOCK TABLES `historys` WRITE;
/*!40000 ALTER TABLE `historys` DISABLE KEYS */;
INSERT INTO `historys` VALUES ('KID77891','','','','123','1234','2017-05-03 00:00:00',1),('KID77891','','','','1234','12345','2017-05-03 00:00:00',1),('KID77891','','','','大阪府箕面市1-1','大阪府豊中市1-1','2017-05-03 12:24:25',1),('KID92468','','','','','1234','2017-05-03 12:26:08',1),('KID92468','','','','','豊中市','2017-05-03 12:26:08',1),('KID92468','','','','','システムB','2017-05-03 12:26:08',1),('KID77891','','','','12345','123456','2017-05-03 12:28:48',1),('KID77891','','','','大阪府豊中市1-1','大阪府豊中市1-2','2017-05-03 12:28:48',1),('KID77891','','','','システムAB','システムABC','2017-05-03 12:28:48',1),('KID77891','','','','システムABC','DシステムABC','2017-05-03 12:31:22',1),('KID77891','','','','DシステムABC','CDシステムABC','2017-05-03 12:37:30',1),('KID77891','','','','kurata','kura','2017-05-03 12:37:30',1),('KID77891','','','','CDシステムABC','CDシステムABCt','2017-05-03 12:39:51',1),('KID77891','','','','kura','kurat','2017-05-03 12:39:51',1),('KID77891','','','','大阪府豊中市1-2','大阪府豊中市','2017-05-03 12:40:27',1),('KID77891','','','','CDシステムABCt','システムA','2017-05-03 12:40:27',1),('KID77891','','','','123456','4444','2017-05-03 12:41:47',1),('KID77891','','','','システムA','システムB','2017-05-03 12:41:47',1),('KID77891','','','','藏田','藏田変更','2017-05-03 12:41:47',1),('KID77891','','','','4444','1234','2017-05-03 12:42:37',1),('KID77891','','','','大阪府豊中市','大阪府豊中市3-4','2017-05-03 12:42:37',1);
/*!40000 ALTER TABLE `historys` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-03 19:33:49
