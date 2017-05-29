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
-- Table structure for table `columns`
--

DROP TABLE IF EXISTS `columns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `columns` (
  `uid` int(11) NOT NULL,
  `kid` varchar(45) DEFAULT '1',
  `user_name` varchar(45) DEFAULT '1',
  `server` varchar(45) DEFAULT '1',
  `userkey` varchar(45) DEFAULT '1',
  `db_password` varchar(45) DEFAULT '1',
  `fenics_key` varchar(45) DEFAULT '1',
  `number_pc` varchar(45) DEFAULT NULL,
  `client_number` varchar(45) DEFAULT '1',
  `number_id` varchar(45) DEFAULT NULL,
  `start_id` varchar(45) DEFAULT NULL,
  `creater` varchar(45) DEFAULT '1',
  `update_on` varchar(45) DEFAULT '1',
  `system_type` varchar(45) DEFAULT NULL,
  `version` varchar(45) DEFAULT NULL,
  `is_busiv` varchar(45) DEFAULT NULL,
  `has_mobile` varchar(45) DEFAULT NULL,
  `is_registered` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `user_id_UNIQUE` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `columns`
--

LOCK TABLES `columns` WRITE;
/*!40000 ALTER TABLE `columns` DISABLE KEYS */;
INSERT INTO `columns` VALUES (0,'KID','顧客名','サーバ','ユーザキー','DBパスワード','fenicsキー','端末台数','クライアント数','端末id収容数','端末id','作成者','更新日','システム環境','バージョン','ビジVあり','モバイル有無','初期登録済'),(1,'1','1','1','1','1','1','1','1','1','1','1','1','0','0','0','0','0');
/*!40000 ALTER TABLE `columns` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-30  8:08:22
