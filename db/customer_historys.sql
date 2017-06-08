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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kid` varchar(9) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `content_name` varchar(45) DEFAULT NULL,
  `item_name` varchar(45) DEFAULT NULL,
  `before` varchar(45) DEFAULT NULL,
  `after` varchar(45) DEFAULT NULL,
  `create_on` datetime DEFAULT NULL,
  `create_user_id` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=417 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historys`
--

LOCK TABLES `historys` WRITE;
/*!40000 ALTER TABLE `historys` DISABLE KEYS */;
INSERT INTO `historys` VALUES (1,'KID77891','','','','123','1234','2017-05-03 00:00:00',1),(2,'KID77891','','','','1234','12345','2017-05-03 00:00:00',1),(3,'KID77891','','','','大阪府箕面市1-1','大阪府豊中市1-1','2017-05-03 12:24:25',1),(4,'KID92468','','','','','1234','2017-05-03 12:26:08',1),(5,'KID92468','','','','','豊中市','2017-05-03 12:26:08',1),(6,'KID92468','','','','','システムB','2017-05-03 12:26:08',1),(7,'KID77891','','','','12345','123456','2017-05-03 12:28:48',1),(8,'KID77891','','','','大阪府豊中市1-1','大阪府豊中市1-2','2017-05-03 12:28:48',1),(9,'KID77891','','','','システムAB','システムABC','2017-05-03 12:28:48',1),(10,'KID77891','','','','システムABC','DシステムABC','2017-05-03 12:31:22',1),(11,'KID77891','','','','DシステムABC','CDシステムABC','2017-05-03 12:37:30',1),(12,'KID77891','','','','kurata','kura','2017-05-03 12:37:30',1),(13,'KID77891','','','','CDシステムABC','CDシステムABCt','2017-05-03 12:39:51',1),(14,'KID77891','','','','kura','kurat','2017-05-03 12:39:51',1),(15,'KID77891','','','','大阪府豊中市1-2','大阪府豊中市','2017-05-03 12:40:27',1),(16,'KID77891','','','','CDシステムABCt','システムA','2017-05-03 12:40:27',1),(17,'KID77891','','','','123456','4444','2017-05-03 12:41:47',1),(18,'KID77891','','','','システムA','システムB','2017-05-03 12:41:47',1),(19,'KID77891','','','','藏田','藏田変更','2017-05-03 12:41:47',1),(20,'KID77891','','','','4444','1234','2017-05-03 12:42:37',1),(21,'KID77891','','','','大阪府豊中市','大阪府豊中市3-4','2017-05-03 12:42:37',1),(22,'KID77891','更新','基本情報','','1234','12347','2017-05-03 19:36:22',1),(23,'KID77891','更新','基本情報','郵便番号','12347','123473','2017-05-03 20:15:13',1),(24,'KID77891','更新','基本情報','担当者','藏田変更','大熊猫','2017-05-03 20:21:59',1),(25,'KID77891','更新','基本情報','電話番号','06-1235-1343','03-6712-3212','2017-05-03 20:24:40',1),(26,'KID77891','更新','基本情報','所属','システムB','営業部','2017-05-03 20:25:46',1),(27,'KID77891','更新','パートナー','PID','10001','10001','2017-05-03 21:57:27',1),(28,'KID77891','更新','パートナー',NULL,NULL,'パートナーA','2017-05-03 21:57:27',1),(29,'KID77891','更新','パートナー','郵便番号','3350002','3350002','2017-05-03 21:57:27',1),(30,'KID77891','更新','パートナー','SA所属','営業部','営業部2','2017-05-03 21:57:27',1),(31,'KID77891','更新','パートナー','SA担当者','営業次郎','営業次郎2','2017-05-03 22:05:41',1),(32,'KID77891','更新','パートナー','郵便番号','3350002','12','2017-05-03 22:08:09',1),(33,'KID77891','更新','パートナー','郵便番号','3350002','122','2017-05-03 22:09:28',1),(34,'KID77891','更新','パートナー','郵便番号','3350002','3122','2017-05-03 22:09:33',1),(35,'KID77891','更新','パートナー','SA担当者','営業次郎2','営業次郎更新','2017-05-03 22:10:04',1),(36,'KID92468','更新','パートナー','PID','','0','2017-05-03 22:39:16',1),(37,'KID92468','更新','パートナー','販社名','','partner','2017-05-03 22:39:16',1),(38,'KID92468','更新','パートナー','郵便番号','','0','2017-05-03 22:39:16',1),(39,'KID95866','追加','サービス','K1','0','1','2017-05-05 09:58:34',1),(40,'KID95866','追加','サービス','U1','0','1','2017-05-05 09:58:34',1),(41,'KID95866','追加','サービス','U2','0','1','2017-05-05 09:58:34',1),(42,'KID95866','追加','サービス','U3','0','1','2017-05-05 09:58:34',1),(43,'KID95866','追加','サービス','U4','0','1','2017-05-05 09:58:34',1),(44,'KID95866','追加','サービス','U5','0','1','2017-05-05 09:58:34',1),(45,'KID95866','追加','サービス','U6','0','1','2017-05-05 09:58:34',1),(46,'KID95866','追加','サービス','U7','0','1','2017-05-05 09:58:34',1),(47,'KID95866','追加','サービス','U8','0','1','2017-05-05 09:58:34',1),(48,'KID95866','追加','サービス','U9','0','1','2017-05-05 09:58:34',1),(49,'KID95866','追加','サービス','UA','0','1','2017-05-05 09:58:34',1),(50,'KID95866','追加','サービス','UB','0','1','2017-05-05 09:58:34',1),(51,'KID95866','追加','サービス','UC','0','1','2017-05-05 09:58:34',1),(52,'KID95866','追加','サービス','UD','0','1','2017-05-05 09:58:34',1),(53,'KID95866','追加','サービス','UE','0','1','2017-05-05 09:58:34',1),(54,'KID95866','追加','サービス','UF','0','1','2017-05-05 09:58:34',1),(55,'KID95866','追加','サービス','UG','0','1','2017-05-05 09:58:34',1),(56,'KID95866','追加','サービス','UH','0','1','2017-05-05 09:58:34',1),(57,'KID95866','追加','サービス','UI','0','1','2017-05-05 09:58:34',1),(58,'KID95866','追加','サービス','C1','0','1','2017-05-05 09:58:34',1),(59,'KID95866','追加','サービス','C2','0','1','2017-05-05 09:58:34',1),(60,'KID95866','追加','サービス','C3','0','1','2017-05-05 09:58:34',1),(61,'KID95866','追加','サービス','C4','0','1','2017-05-05 09:58:34',1),(62,'KID95866','追加','サービス','S2','0','1','2017-05-05 09:58:34',1),(63,'KID95866','追加','サービス','S3','0','1','2017-05-05 09:58:34',1),(64,'KID95866','追加','サービス','S9','0','1','2017-05-05 09:58:34',1),(65,'KID95866','追加','サービス','SC','0','1','2017-05-05 09:58:34',1),(66,'KID95866','追加','サービス','SE','0','1','2017-05-05 09:58:34',1),(67,'KID95866','追加','サービス','SH','0','1','2017-05-05 09:58:34',1),(68,'KID95866','追加','サービス','SI','0','1','2017-05-05 09:58:34',1),(69,'KID95866','追加','サービス','SJ','0','1','2017-05-05 09:58:34',1),(70,'KID95866','追加','サービス','SL','0','1','2017-05-05 09:58:34',1),(71,'KID95866','追加','サービス','SM','0','1','2017-05-05 09:58:34',1),(72,'KID95866','追加','サービス','SO','0','1','2017-05-05 09:58:34',1),(73,'KID95866','削除','サービス','K1','1','0','2017-05-05 10:00:55',1),(74,'KID95866','削除','サービス','U1','1','0','2017-05-05 10:00:55',1),(75,'KID95866','削除','サービス','U2','1','0','2017-05-05 10:00:55',1),(76,'KID95866','削除','サービス','U3','1','0','2017-05-05 10:00:55',1),(77,'KID95866','削除','サービス','U4','1','0','2017-05-05 10:00:55',1),(78,'KID95866','削除','サービス','U5','1','0','2017-05-05 10:00:55',1),(79,'KID95866','削除','サービス','U6','1','0','2017-05-05 10:00:55',1),(80,'KID95866','削除','サービス','U7','1','0','2017-05-05 10:00:55',1),(81,'KID95866','削除','サービス','U8','1','0','2017-05-05 10:00:55',1),(82,'KID95866','削除','サービス','U9','1','0','2017-05-05 10:00:55',1),(83,'KID95866','削除','サービス','UA','1','0','2017-05-05 10:00:55',1),(84,'KID95866','削除','サービス','UB','1','0','2017-05-05 10:00:55',1),(85,'KID95866','削除','サービス','UC','1','0','2017-05-05 10:00:55',1),(86,'KID95866','削除','サービス','UD','1','0','2017-05-05 10:00:55',1),(87,'KID95866','削除','サービス','UE','1','0','2017-05-05 10:00:55',1),(88,'KID95866','削除','サービス','UF','1','0','2017-05-05 10:00:55',1),(89,'KID95866','削除','サービス','UG','1','0','2017-05-05 10:00:55',1),(90,'KID95866','削除','サービス','UH','1','0','2017-05-05 10:00:55',1),(91,'KID95866','削除','サービス','UI','1','0','2017-05-05 10:00:55',1),(92,'KID95866','削除','サービス','C1','1','0','2017-05-05 10:00:55',1),(93,'KID95866','削除','サービス','C2','1','0','2017-05-05 10:00:55',1),(94,'KID95866','削除','サービス','C3','1','0','2017-05-05 10:00:55',1),(95,'KID95866','削除','サービス','C4','1','0','2017-05-05 10:00:55',1),(96,'KID95866','削除','サービス','S2','1','0','2017-05-05 10:00:55',1),(97,'KID95866','削除','サービス','S3','1','0','2017-05-05 10:00:55',1),(98,'KID95866','削除','サービス','S9','1','0','2017-05-05 10:00:55',1),(99,'KID95866','削除','サービス','SC','1','0','2017-05-05 10:00:55',1),(100,'KID95866','削除','サービス','SE','1','0','2017-05-05 10:00:55',1),(101,'KID95866','削除','サービス','SH','1','0','2017-05-05 10:00:55',1),(102,'KID95866','削除','サービス','SI','1','0','2017-05-05 10:00:55',1),(103,'KID95866','削除','サービス','SJ','1','0','2017-05-05 10:00:55',1),(104,'KID95866','削除','サービス','SL','1','0','2017-05-05 10:00:55',1),(105,'KID95866','削除','サービス','SM','1','0','2017-05-05 10:00:55',1),(106,'KID95866','削除','サービス','SO','1','0','2017-05-05 10:00:55',1),(107,'KID95866','追加','サービス','K1','0','1','2017-05-05 10:02:54',1),(108,'KID95866','追加','サービス','U3','0','1','2017-05-05 10:02:54',1),(109,'KID71106','更新','基本情報','サーバ','LAP5-5','','2017-05-09 19:57:54',1),(110,'KID71106','更新','基本情報','クライアント数','2','3','2017-05-09 19:57:54',1),(111,'KID71106','更新','基本情報','郵便番号','','0','2017-05-09 19:57:54',1),(112,'KID92468','更新','基本情報','クライアント数','3','4','2017-05-09 20:03:22',1),(113,'KID54041','更新','基本情報','クライアント数','2','3','2017-05-09 20:04:07',1),(114,'KID54041','更新','基本情報','郵便番号','','0','2017-05-09 20:04:07',1),(115,'KID92468','更新','基本情報','クライアント数','4','5','2017-05-10 21:26:42',1),(116,'KID77891','追加','サービス','U4','0','1','2017-05-14 20:12:11',1),(117,'KID98369','新規',NULL,'ユーザー作成',NULL,NULL,'2017-05-14 20:16:36',1),(118,'KID98370','新規',NULL,'ユーザー作成',NULL,NULL,'2017-05-14 21:34:26',1),(119,'KID92468','追加','サービス','U1','0','1','2017-05-14 22:02:32',1),(120,'KID98370','更新','基本情報','郵便番号','','0','2017-05-15 13:09:00',1),(121,'KID98370','更新','基本情報',NULL,'','0','2017-05-15 13:09:00',1),(122,'KID92468','更新','パートナー','販社名',NULL,'パートナーD','2017-05-15 13:53:33',1),(123,'KID92468','追加','サービス','U6','0','1','2017-05-15 15:03:50',1),(124,'KID92468','削除','サービス','U8','1','0','2017-05-15 15:13:53',1),(125,'KID92468','更新','基本情報','ネットワーク','0','1','2017-05-15 20:06:32',1),(126,'KID92468','更新','基本情報','ユーザーキー','YAQDF','YAQDA','2017-05-15 20:09:08',1),(127,'KID92468','更新','基本情報',NULL,'UYAQDF','UYAQDA','2017-05-15 20:09:08',1),(128,'KID92468','更新','基本情報','ネットワーク','1','0','2017-05-15 20:09:08',1),(129,'KID92468','更新','基本情報','担当者',NULL,'厚別','2017-05-15 20:18:07',1),(135,'KID92468','更新','基本情報','クライアント数','7','8','2017-05-15 20:41:21',1),(136,'KID92468','更新','基本情報','ネットワーク','0','1','2017-05-15 20:41:21',1),(137,'KID92468','更新','基本情報','クライアント数','8','9','2017-05-15 20:52:09',1),(138,'KID92468','更新','基本情報','クライアント数','9','10','2017-05-15 20:54:48',1),(139,'KID92468','更新','基本情報','ネットワーク','0','1','2017-05-15 20:54:48',1),(140,'KID92468','更新','基本情報','ネットワーク','1','0','2017-05-15 20:54:58',1),(141,'KID92468','追加','サービス','U7','0','1','2017-05-15 20:55:22',1),(142,'KID92468','削除','サービス','U7','1','0','2017-05-15 20:55:30',1),(143,'KID92468','追加','サービス','U7','0','1','2017-05-15 20:55:33',1),(144,'KID92468','更新','基本情報','顧客名',NULL,'YAQホーム改','2017-05-15 20:56:37',1),(145,'KID92468','更新','基本情報','顧客名',NULL,'YAQホーム改２','2017-05-15 20:57:51',1),(146,'KID92468','更新','基本情報','顧客名',NULL,'YAQホーム改３','2017-05-15 21:00:03',1),(147,'KID92468','更新','基本情報','顧客名',NULL,'YAQホーム改4','2017-05-15 21:07:33',1),(148,'KID92468','更新','パートナー','PID',NULL,'444345','2017-05-15 21:08:33',1),(149,'KID92468','更新','基本情報','顧客名',NULL,'YAQホーム改5','2017-05-15 21:10:32',1),(150,'KID92468','更新','基本情報',NULL,'YAQホーム改4','YAQホーム改5','2017-05-15 21:10:32',1),(151,'KID92468','更新','基本情報','端末台数','5','7','2017-05-15 21:42:59',1),(152,'KID60414','更新','基本情報','郵便番号',NULL,'0','2017-05-17 07:46:46',1),(153,'KID60414','更新','基本情報','端末台数','3','5','2017-05-17 07:46:46',1),(154,'KID60414','更新','基本情報','端末台数','5','7','2017-05-17 07:48:00',1),(157,'KID60004','更新','基本情報','郵便番号',NULL,'0','2017-05-17 07:59:46',1),(158,'KID60004','更新','基本情報','端末台数','1','3','2017-05-17 07:59:46',1),(159,'KID60004','更新','基本情報','端末台数','3','4','2017-05-17 08:01:19',1),(160,'KID79115','更新','基本情報','郵便番号',NULL,'0','2017-05-17 08:02:37',1),(161,'KID79115','更新','基本情報','端末台数','1','2','2017-05-17 08:02:37',1),(164,'KID65172','更新','基本情報','郵便番号',NULL,'0','2017-05-17 23:18:59',1),(165,'KID92468','更新','基本情報','端末台数','7','9','2017-05-19 21:23:08',1),(166,'KID92468','更新','基本情報','端末台数','9','11','2017-05-19 21:23:52',1),(167,'KID92468','更新','基本情報','端末台数','11','13','2017-05-19 21:25:58',1),(168,'KID92468','更新','基本情報','端末台数','13','14','2017-05-19 21:48:36',1),(169,'KID92468','更新','基本情報','端末台数','14','15','2017-05-19 21:48:55',1),(172,'KID92468','更新','基本情報','クライアント数','3','6','2017-05-19 22:08:10',1),(173,'KID92468','更新','基本情報','クライアント数','4','7','2017-05-19 22:08:58',1),(174,'KID92468','更新','基本情報','クライアント数','4','6','2017-05-19 22:13:14',1),(175,'KID92468','更新','基本情報','クライアント数','4','6','2017-05-19 22:18:01',1),(176,'KID92468','更新','基本情報','クライアント数','2','9','2017-05-19 22:19:23',1),(177,'KID92468','更新','基本情報','クライアント数','3','8','2017-05-19 22:27:10',1),(178,'KID92468','更新','基本情報','クライアント数','4','5','2017-05-19 22:27:26',1),(179,'KID92468','更新','基本情報','クライアント数','4','6','2017-05-19 22:29:02',1),(180,'KID92468','更新','基本情報',NULL,NULL,'14','2017-05-20 11:15:40',1),(181,'KID92468','更新','基本情報',NULL,NULL,'14','2017-05-20 11:16:32',1),(182,'KID92468','更新','基本情報','端末台数','15','14','2017-05-20 11:20:55',1),(183,'KID92468','更新','基本情報','端末台数','5','6','2017-05-20 11:22:58',1),(184,'KID92468','更新','基本情報','端末台数','6','4','2017-05-20 11:23:12',1),(185,'KID92468','更新','基本情報','端末台数','4','3','2017-05-20 11:23:41',1),(186,'KID92468','更新','基本情報','端末台数','4','5','2017-05-20 11:24:30',1),(187,'KID92468','更新','基本情報','端末台数','5','3','2017-05-20 11:24:34',1),(188,'KID92468','更新','基本情報','端末台数','4','5','2017-05-20 11:25:51',1),(189,'KID92468','更新','基本情報','端末台数','5','3','2017-05-20 11:26:32',1),(190,'KID92468','更新','基本情報','端末台数','4','5','2017-05-20 11:29:35',1),(191,'KID92468','更新','基本情報','端末台数','5','4','2017-05-20 11:29:51',1),(192,'KID92468','更新','基本情報','端末台数','4','10','2017-05-20 11:30:49',1),(193,'KID92468','更新','基本情報','端末台数','10','4','2017-05-20 11:32:53',1),(194,'KID92468','更新','基本情報','端末台数','4','7','2017-05-20 11:33:01',1),(195,'KID92468','更新','基本情報','端末台数','7','4','2017-05-20 11:33:09',1),(196,'KID92468','更新','基本情報','端末台数','4','8','2017-05-20 11:33:15',1),(197,'KID92468','更新','基本情報','クライアント数','3','4','2017-05-20 11:49:49',1),(198,'KID92468','更新','基本情報','端末台数','8','4','2017-05-20 11:51:45',1),(199,'KID60414','追加','サービス','K1','0','1','2017-05-21 12:40:35',1),(200,'KID60414','追加','サービス','U1','0','1','2017-05-21 12:40:35',1),(201,'KID92468','更新','基本情報','クライアント数','3','5','2017-05-21 20:37:17',2),(202,'KID92468','更新','基本情報','クライアント数','5','6','2017-05-21 20:38:55',2),(203,'KID92468','更新','基本情報','クライアント数','6','8','2017-05-21 20:44:51',2),(204,'KID92468','更新','基本情報','クライアント数','6','7','2017-05-21 20:45:51',2),(205,'KID92468','更新','基本情報','クライアント数','6','7','2017-05-21 20:46:08',2),(206,'KID92468','更新','基本情報','クライアント数','6','7','2017-05-21 20:47:51',2),(207,'KID92468','更新','基本情報','クライアント数','4','6','2017-05-21 20:52:16',2),(208,'KID92468','更新','基本情報','クライアント数','6','7','2017-05-21 20:52:36',2),(223,'KID97450','新規',NULL,'ユーザー作成',NULL,NULL,'2017-05-21 21:34:31',2),(224,'KID97450','更新','基本情報','郵便番号',NULL,'0','2017-05-21 21:39:39',2),(225,'KID97450','更新','基本情報','端末台数','0','1','2017-05-21 21:39:39',2),(226,'KID97450','更新','基本情報','端末台数','1','2','2017-05-21 21:40:00',2),(227,'KID97450','更新','基本情報','端末台数','2','3','2017-05-21 21:40:27',2),(228,'KID97450','更新','基本情報','端末台数','3','4','2017-05-21 21:40:51',2),(229,'KID97450','更新','基本情報','端末台数','4','5','2017-05-21 21:41:06',2),(230,'KID97450','更新','基本情報','端末台数','5','8','2017-05-21 21:41:26',2),(231,'KID97450','更新','基本情報','端末台数','8','11','2017-05-21 21:41:42',2),(232,'KID92468','更新','基本情報','端末台数','4','5','2017-05-24 21:35:01',1),(249,'KID98371','新規',NULL,'ユーザー作成',NULL,NULL,'2017-05-25 07:45:06',1),(250,'KID98371','更新','基本情報','郵便番号',NULL,'0','2017-05-25 07:45:22',1),(251,'KID98371','更新','基本情報','端末台数','0','3','2017-05-25 07:45:22',1),(252,'KID98371','更新','基本情報','ネットワーク','','0','2017-05-25 07:45:22',1),(253,'KID98371','更新','基本情報','クライアント数','0','7','2017-05-25 07:46:03',1),(254,'KID98371','更新','基本情報','端末台数','3','4','2017-05-25 07:46:03',1),(255,'KID98371','更新','基本情報','ネットワーク','0','1','2017-05-25 07:49:29',1),(256,'KID98371','更新','基本情報','端末台数','4','5','2017-05-25 07:49:57',1),(257,'KID98371','更新','基本情報','端末台数','5','7','2017-05-25 07:50:11',1),(258,'KID98371','更新','基本情報','端末台数','7','6','2017-05-25 07:54:51',1),(259,'KID98371','更新','基本情報','端末台数','6','3','2017-05-25 07:55:02',1),(260,'KID98371','更新','基本情報','端末台数','3','0','2017-05-25 07:57:28',1),(261,'KID98371','更新','基本情報','端末台数','0','2','2017-05-25 07:57:39',1),(262,'KID98371','更新','基本情報','ネットワーク','1','0','2017-05-25 07:57:39',1),(263,'KID98371','更新','基本情報','端末台数','2','0','2017-05-25 07:57:45',1),(264,'KID98371','更新','基本情報','クライアント数','0','2','2017-05-25 07:59:09',1),(265,'KID98371','更新','基本情報','端末台数','0','4','2017-05-25 07:59:20',1),(266,'KID92468','更新','基本情報',NULL,NULL,'KID92469','2017-05-25 19:51:28',1),(267,'KID60414','更新','基本情報','端末台数','7','8','2017-05-25 19:55:00',1),(270,'KID00824','更新','パートナー','SE所属',NULL,'SE所属変更しました','2017-05-26 08:01:45',1),(271,'KID92468','更新','基本情報','端末台数','5','2','2017-05-27 17:21:45',1),(272,'KID92468','更新','基本情報','端末台数','14','7','2017-05-27 17:23:05',1),(276,'KID92468','追加','サービス','K1','0','1','2017-05-29 07:38:28',1),(277,'KID92468','追加','サービス','U1','0','1','2017-05-29 07:38:28',1),(278,'KID92468','追加','サービス','K1','0','1','2017-05-29 07:40:03',1),(279,'KID92468','追加','サービス','U1','0','1','2017-05-29 07:40:03',1),(280,'KID92468','追加','サービス','K1','0','1','2017-05-29 07:41:41',1),(281,'KID92468','追加','サービス','U1','0','1','2017-05-29 07:41:41',1),(282,'KID71106','追加','サービス','K1','0','1','2017-05-29 07:42:12',1),(283,'KID71106','追加','サービス','U1','0','1','2017-05-29 07:42:12',1),(284,'KID71106','追加','サービス','U2','0','1','2017-05-29 07:42:12',1),(285,'KID71106','追加','サービス','U3','0','1','2017-05-29 07:42:12',1),(286,'KID71106','追加','サービス','U4','0','1','2017-05-29 07:42:12',1),(287,'KID71106','追加','サービス','U5','0','1','2017-05-29 07:42:12',1),(288,'KID71106','追加','サービス','U6','0','1','2017-05-29 07:42:12',1),(289,'KID71106','追加','サービス','U7','0','1','2017-05-29 07:42:12',1),(290,'KID71106','追加','サービス','U8','0','1','2017-05-29 07:42:12',1),(291,'KID71106','追加','サービス','U9','0','1','2017-05-29 07:42:12',1),(292,'KID71106','追加','サービス','UA','0','1','2017-05-29 07:42:12',1),(293,'KID71106','追加','サービス','UB','0','1','2017-05-29 07:42:12',1),(294,'KID71106','追加','サービス','UC','0','1','2017-05-29 07:42:12',1),(295,'KID71106','追加','サービス','UD','0','1','2017-05-29 07:42:12',1),(296,'KID71106','追加','サービス','UE','0','1','2017-05-29 07:42:12',1),(297,'KID71106','追加','サービス','UF','0','1','2017-05-29 07:42:12',1),(298,'KID71106','追加','サービス','UG','0','1','2017-05-29 07:42:12',1),(299,'KID71106','追加','サービス','UH','0','1','2017-05-29 07:42:12',1),(300,'KID71106','追加','サービス','UI','0','1','2017-05-29 07:42:12',1),(301,'KID71106','追加','サービス','C1','0','1','2017-05-29 07:42:12',1),(302,'KID71106','追加','サービス','C2','0','1','2017-05-29 07:42:12',1),(303,'KID71106','追加','サービス','C3','0','1','2017-05-29 07:42:12',1),(304,'KID71106','追加','サービス','C4','0','1','2017-05-29 07:42:12',1),(305,'KID71106','追加','サービス','S2','0','1','2017-05-29 07:42:12',1),(306,'KID71106','追加','サービス','S3','0','1','2017-05-29 07:42:12',1),(307,'KID71106','追加','サービス','S9','0','1','2017-05-29 07:42:12',1),(308,'KID71106','追加','サービス','SC','0','1','2017-05-29 07:42:12',1),(309,'KID71106','追加','サービス','SE','0','1','2017-05-29 07:42:12',1),(310,'KID71106','追加','サービス','SH','0','1','2017-05-29 07:42:12',1),(311,'KID71106','追加','サービス','SI','0','1','2017-05-29 07:42:12',1),(312,'KID71106','追加','サービス','SJ','0','1','2017-05-29 07:42:12',1),(313,'KID71106','追加','サービス','SL','0','1','2017-05-29 07:42:12',1),(314,'KID71106','追加','サービス','SM','0','1','2017-05-29 07:42:12',1),(315,'KID71106','追加','サービス','SO','0','1','2017-05-29 07:42:12',1),(316,'KID71106','追加','サービス','K1','0','1','2017-05-29 07:43:04',1),(317,'KID71106','追加','サービス','U1','0','1','2017-05-29 07:43:04',1),(318,'KID71106','追加','サービス','U2','0','1','2017-05-29 07:43:04',1),(319,'KID71106','追加','サービス','U3','0','1','2017-05-29 07:43:04',1),(320,'KID71106','追加','サービス','U4','0','1','2017-05-29 07:43:04',1),(321,'KID71106','追加','サービス','U5','0','1','2017-05-29 07:43:04',1),(322,'KID71106','追加','サービス','U6','0','1','2017-05-29 07:43:04',1),(323,'KID71106','追加','サービス','U7','0','1','2017-05-29 07:43:04',1),(324,'KID71106','追加','サービス','U8','0','1','2017-05-29 07:43:04',1),(325,'KID71106','追加','サービス','U9','0','1','2017-05-29 07:43:04',1),(326,'KID71106','追加','サービス','UA','0','1','2017-05-29 07:43:04',1),(327,'KID71106','追加','サービス','UB','0','1','2017-05-29 07:43:04',1),(328,'KID71106','追加','サービス','UC','0','1','2017-05-29 07:43:04',1),(329,'KID71106','追加','サービス','UD','0','1','2017-05-29 07:43:04',1),(330,'KID71106','追加','サービス','UE','0','1','2017-05-29 07:43:04',1),(331,'KID71106','追加','サービス','UF','0','1','2017-05-29 07:43:04',1),(332,'KID71106','追加','サービス','UG','0','1','2017-05-29 07:43:04',1),(333,'KID71106','追加','サービス','UH','0','1','2017-05-29 07:43:04',1),(334,'KID71106','追加','サービス','UI','0','1','2017-05-29 07:43:04',1),(335,'KID71106','追加','サービス','C1','0','1','2017-05-29 07:43:04',1),(336,'KID71106','追加','サービス','C2','0','1','2017-05-29 07:43:04',1),(337,'KID71106','追加','サービス','C3','0','1','2017-05-29 07:43:04',1),(338,'KID71106','追加','サービス','C4','0','1','2017-05-29 07:43:04',1),(339,'KID71106','追加','サービス','S2','0','1','2017-05-29 07:43:04',1),(340,'KID71106','追加','サービス','S3','0','1','2017-05-29 07:43:04',1),(341,'KID71106','追加','サービス','S9','0','1','2017-05-29 07:43:04',1),(342,'KID71106','追加','サービス','SC','0','1','2017-05-29 07:43:04',1),(343,'KID71106','追加','サービス','SE','0','1','2017-05-29 07:43:04',1),(344,'KID71106','追加','サービス','SH','0','1','2017-05-29 07:43:04',1),(345,'KID71106','追加','サービス','SI','0','1','2017-05-29 07:43:04',1),(346,'KID71106','追加','サービス','SJ','0','1','2017-05-29 07:43:04',1),(347,'KID71106','追加','サービス','SL','0','1','2017-05-29 07:43:04',1),(348,'KID71106','追加','サービス','SM','0','1','2017-05-29 07:43:04',1),(349,'KID71106','追加','サービス','SO','0','1','2017-05-29 07:43:04',1),(353,'KID60414','追加','サービス','K1','0','1','2017-05-29 07:53:37',1),(354,'KID60414','追加','サービス','U3','0','1','2017-05-29 07:53:37',1),(355,'KID60414','追加','サービス','U7','0','1','2017-05-29 07:53:37',1),(356,'KID60414','追加','サービス','U8','0','1','2017-05-29 07:53:37',1),(357,'KID60414','追加','サービス','UG','0','1','2017-05-29 07:53:46',1),(358,'KID60414','追加','サービス','K1','0','1','2017-05-29 07:54:46',1),(359,'KID60414','追加','サービス','U1','0','1','2017-05-29 07:54:46',1),(360,'KID60414','追加','サービス','U2','0','1','2017-05-29 07:54:46',1),(361,'KID60414','追加','サービス','U3','0','1','2017-05-29 07:54:46',1),(362,'KID60414','追加','サービス','U6','0','1','2017-05-29 07:57:46',1),(363,'KID60414','追加','サービス','U7','0','1','2017-05-29 07:57:52',1),(364,'KID92468','追加','サービス','U5','0','1','2017-05-29 07:59:17',1),(365,'KID92468','追加','サービス','U7','0','1','2017-05-29 07:59:17',1),(370,'KID35321','追加','サービス','K1','0','1','2017-05-29 08:07:20',1),(371,'KID92468','削除','サービス','U1','1','0','2017-05-29 08:08:11',1),(372,'KID92468','削除','サービス','U5','1','0','2017-05-29 08:08:11',1),(373,'KID92468','追加','サービス','U1','0','1','2017-05-29 08:08:14',1),(374,'KID92468','追加','サービス','U2','0','1','2017-05-29 08:08:14',1),(375,'KID92468','削除','サービス','U1','1','0','2017-05-29 08:08:18',1),(376,'KID92468','削除','サービス','U2','1','0','2017-05-29 08:08:18',1),(377,'KID92468','削除','サービス','U7','1','0','2017-05-29 08:08:18',1),(378,'KID92468','削除','サービス','K1','1','0','2017-05-29 08:08:21',1),(379,'KID92468','追加','サービス','K1','0','1','2017-05-29 08:08:23',1),(380,'KID92468','追加','サービス','U1','0','1','2017-05-29 08:08:26',1),(381,'KID83015','新規',NULL,'ユーザー作成',NULL,NULL,'2017-05-30 07:29:40',1),(382,'KID97450','更新','基本情報','サーバ','AP1-1','AP1-3','2017-05-30 07:41:39',1),(383,'KID92468','更新','基本情報','クライアント数','7','8','2017-05-31 21:11:13',1),(384,'KID92468','更新','基本情報','端末台数','7','8','2017-05-31 21:11:30',1),(385,'KID98371','更新','基本情報','端末台数','4','2','2017-06-01 07:41:05',1),(386,'KID98371','更新','基本情報','端末台数','2','4','2017-06-01 07:41:12',1),(387,'KID92468','更新','基本情報','クライアント数','8','9','2017-06-03 20:23:48',1),(388,'KID92468','更新','基本情報','端末台数','8','9','2017-06-03 20:23:48',1),(389,'KID92468','更新','基本情報','クライアント数','9','10','2017-06-03 20:24:05',1),(390,'KID92468','更新','基本情報','端末台数','9','10','2017-06-03 20:24:05',1),(391,'KID60004','更新','基本情報','クライアント数','1','4','2017-06-03 22:22:36',1),(392,'KID87386','更新','基本情報','郵便番号',NULL,'0','2017-06-03 22:24:48',1),(393,'KID87386','更新','基本情報','クライアント数','1','2','2017-06-03 22:24:48',1),(394,'KID87386','更新','基本情報','端末台数','1','2','2017-06-03 22:24:48',1),(395,'KID87386','更新','基本情報','クライアント数','2','6','2017-06-03 22:25:17',1),(396,'KID87386','更新','基本情報','端末台数','2','5','2017-06-03 22:25:17',1),(397,'KID79115','更新','基本情報','クライアント数','1','5','2017-06-03 22:33:16',1),(398,'KID79115','更新','基本情報','端末台数','2','4','2017-06-03 22:33:16',1),(399,'KID79115','追加','サービス','K1','0','1','2017-06-03 22:33:54',1),(400,'KID79115','追加','サービス','U4','0','1','2017-06-03 22:33:54',1),(401,'KID79115','追加','サービス','U5','0','1','2017-06-03 22:33:54',1),(402,'KID92468','更新','基本情報','端末台数','10','9','2017-06-04 10:49:25',1),(403,'KID92468','更新','基本情報','クライアント数','9','10','2017-06-04 12:52:56',1),(404,'KID92468','更新','基本情報','端末台数','9','10','2017-06-04 12:52:56',1),(405,'KID77576','更新','基本情報','郵便番号',NULL,'0','2017-06-04 12:53:41',1),(406,'KID77576','更新','基本情報','クライアント数','3','4','2017-06-04 12:53:41',1),(407,'KID77576','更新','基本情報','端末台数','3','4','2017-06-04 12:53:41',1),(408,'KID35321','更新','基本情報','郵便番号',NULL,'0','2017-06-04 12:54:12',1),(409,'KID35321','更新','基本情報','クライアント数','2','3','2017-06-04 12:54:12',1),(410,'KID35321','更新','基本情報','端末台数','2','3','2017-06-04 12:54:12',1),(411,'KID35321','更新','基本情報','端末台数','3','4','2017-06-04 13:18:19',1),(412,'KID60004','更新','基本情報','端末台数','4','5','2017-06-04 13:21:17',1),(413,'KID80253','更新','基本情報','郵便番号',NULL,'0','2017-06-05 10:25:08',1),(414,'KID80253','更新','基本情報','クライアント数','1','2','2017-06-05 10:25:08',1),(415,'KID80253','更新','基本情報','端末台数','1','2','2017-06-05 10:25:08',1),(416,'KID95866','追加','サービス','K1','0','1','2017-06-07 09:49:54',7);
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

-- Dump completed on 2017-06-09  7:47:49
