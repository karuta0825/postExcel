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
-- Table structure for table `memo_templates`
--

DROP TABLE IF EXISTS `memo_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `memo_templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `msg` varchar(300) NOT NULL,
  `create_user_id` int(2) DEFAULT NULL,
  `create_on` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memo_templates`
--

LOCK TABLES `memo_templates` WRITE;
/*!40000 ALTER TABLE `memo_templates` DISABLE KEYS */;
INSERT INTO `memo_templates` VALUES (1,'使い方 - サンプルタスク','# 記述方法\nMarkdown記法に則り、タスクは以下のように表示するとわかりやすい\n- [x] タスク1 <- 完了\n- [ ] タスク2 <- 未完了\n===================\n\n# サンプルタスクリスト\n- [ ] ファイルをオープン\n- [ ] ファイルに書き込む\n- [ ] ファイルを閉じる\n',1,'2017-08-19'),(8,'クラウドLMユーザ登録','例) \n- [x] 完了 \n- [ ] 未完了\n===================\n- [  ] タスク１\n- [  ] タスク２\n- [  ] タスク３\n- [  ] タスク４\n- [  ] タスク５\n- [  ] タスク６\n- [  ] タスク７\n- [  ] タスク８\n- [  ] タスク９\n- [  ] タスク１０\n- [  ] タスク１１\n- [  ] タスク１２\n- [  ] タスク１３\n- [  ] タスク１４\n',1,'2017-08-19'),(14,'クラウドESユーザ登録タスクリスト','例) \n- [x] 完了 \n- [ ] 未完了\n===================\n- [  ] タスク１\n- [  ] タスク２\n- [  ] タスク３\n- [  ] タスク４\n- [  ] タスク５\n- [  ] タスク６\n- [  ] タスク７\n- [  ] タスク８\n- [  ] タスク９\n- [  ] タスク１０\n- [  ] タスク１１\n- [  ] タスク１２\n- [  ] タスク１３\n- [  ] タスク１４\n',1,'2017-08-19'),(15,'使い方 - サンプルタスク','# 記述方法\nMarkdown記法に則り、タスクは以下のように表示する\n- [x] タスク1 <- 完了\n- [ ] タスク2 <- 未完了\n===================\n\n# サンプルタスクリスト\n- [ ] ファイルをオープン\n- [ ] ファイルに書き込む\n- [ ] ファイルを閉じる\n',1,'2017-08-21');
/*!40000 ALTER TABLE `memo_templates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-08-21 23:26:23
