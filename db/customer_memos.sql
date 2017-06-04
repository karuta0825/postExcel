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
-- Table structure for table `memos`
--

DROP TABLE IF EXISTS `memos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `memos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kid` varchar(9) NOT NULL,
  `title` varchar(45) NOT NULL,
  `priority_id` int(1) NOT NULL,
  `message` varchar(300) NOT NULL,
  `create_on` datetime NOT NULL,
  `create_user_id` int(1) NOT NULL,
  `update_on` datetime DEFAULT NULL,
  `update_user_id` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memos`
--

LOCK TABLES `memos` WRITE;
/*!40000 ALTER TABLE `memos` DISABLE KEYS */;
INSERT INTO `memos` VALUES (1,'KID77891','タイトル',1,'KID77891のメッセージです。今日は非常に眠たい日です。エンジニアは細かいところに注意がいくものですが、僕は適当な人間です。','2017-05-12 00:00:00',1,NULL,2),(2,'KID77891','タイトル２',2,'KID744','2017-05-20 12:32:23',1,NULL,NULL),(3,'KID92468','テスト',3,' // まずキャッシュを見に行くけど最初は\'number\'が存在しないので、カスタムデータ属性を見に行って\"01\"を取得する\n// そしてついでにデータをキャッシュする\n$(\'#fruit\').data(\'number\')\n\n// attr()を使ってカスタムデータ属性を変えてみる\n$(\'#fruit\').attr(\'data-number\', \'02\')\n\n// キャッシュを見に行くと前回取得時に作ったキャッシュがあるので、そこから \"01\" を取得する\n$(\'#fruit\').data(\'number\')','2017-05-21 11:34:21',1,NULL,NULL),(4,'KID98370','test',2,'','2017-05-21 11:54:23',1,NULL,NULL),(5,'KID98370','test',2,'テスト内容あああああああああああああああああああああ\n３００文字までしか保証しておりません。','2017-05-21 11:54:57',1,NULL,NULL),(6,'KID92468','test_update',2,'優先度を重要に変更しました。\n赤さんの変更しました。','2017-05-21 12:01:04',1,'2017-05-21 18:27:16',2),(7,'KID92468','テスト',3,'青鬼が変更しました。','2017-05-21 12:03:47',1,'2017-05-21 19:55:34',2),(8,'KID92468','テスト',1,'優先度を緊急に変更','2017-05-21 12:06:32',1,NULL,NULL),(9,'KID92468','テスト',1,'優先度を緊急に変更。あああああああああああああ\n\n緊急な内容ですよね。aaaaaaffaf','2017-05-21 12:07:47',1,NULL,NULL),(15,'KID60414','テスト１',3,'テスト１','2017-05-21 12:20:20',1,NULL,NULL),(17,'KID60414','テスト３',2,'優先度の変更','2017-05-21 12:26:07',1,NULL,NULL),(19,'KID10177','テスト１',2,'テスト','2017-05-21 13:27:13',1,NULL,NULL),(20,'KID92468','新規作成',1,'優先度変更','2017-05-21 14:51:36',1,NULL,NULL),(21,'KID92468','メモ',1,'作成しました。修正しました。','2017-05-21 18:22:39',2,'2017-05-21 18:26:17',NULL);
/*!40000 ALTER TABLE `memos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-04 13:48:45
