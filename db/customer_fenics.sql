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
-- Table structure for table `fenics`
--

DROP TABLE IF EXISTS `fenics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fenics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kid` varchar(9) DEFAULT NULL,
  `fenics_key` varchar(9) DEFAULT NULL,
  `fenics_id` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `fenics_ip` int(10) unsigned DEFAULT NULL,
  `create_on` datetime DEFAULT NULL,
  `start_on` date DEFAULT NULL,
  `end_on` date DEFAULT NULL,
  `create_user_id` int(2) DEFAULT NULL,
  `client_id` varchar(10) DEFAULT NULL,
  `is_mobile` int(1) DEFAULT '0',
  PRIMARY KEY (`id`,`fenics_id`),
  UNIQUE KEY `genics_id_UNIQUE` (`fenics_id`),
  UNIQUE KEY `fenics_ip_UNIQUE` (`fenics_ip`)
) ENGINE=InnoDB AUTO_INCREMENT=618 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fenics`
--

LOCK TABLES `fenics` WRITE;
/*!40000 ALTER TABLE `fenics` DISABLE KEYS */;
INSERT INTO `fenics` VALUES (2,'KID77160','abp','abpa01001','abpa01001',2886993181,'2017-05-04 22:01:51','2017-05-13','2017-07-14',NULL,'',0),(3,'KID98373','aif','aifa01001','aifa01001',2886994417,'2017-06-17 13:54:17','2017-06-17',NULL,NULL,NULL,0),(4,'KID98373','aif','aifa01002','aifa01002',2886994418,'2017-06-17 13:55:26','2017-06-17',NULL,NULL,NULL,0),(5,'KID98373','aif','aifa01003','aifa01003',2886994419,'2017-06-17 13:55:26','2017-06-17',NULL,NULL,NULL,0),(6,'KID21748','atw','atwa01001','atwa01001',2886992451,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(7,'KID21748','atw','atwa01002','atwa01002',2886993477,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(8,'KID87386','avn','avna01001','avna01001',2886993361,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'AVNQR0001',0),(9,'KID87386','avn','avna01002','avna01002',2886994403,'2017-06-03 22:24:47','2017-06-03',NULL,NULL,'AVNQR0002',0),(10,'KID87386','avn','avna01003','avna01003',2886994404,'2017-06-03 22:25:17','2017-06-03',NULL,NULL,'AVNQR0003',0),(11,'KID87386','avn','avna01004','avna01004',2886994405,'2017-06-03 22:25:17','2017-06-03',NULL,NULL,'AVNQR0004',0),(12,'KID87386','avn','avna01005','avna01005',2886994406,'2017-06-03 22:25:17','2017-06-03',NULL,NULL,'AVNQR0005',0),(13,'KID97450','bea','beaa01001','beaa01001',2886994389,'2017-05-21 21:39:39',NULL,NULL,NULL,NULL,0),(14,'KID74418','bym','byma01001','byma01001',2886993263,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(15,'KID74418','bym','byma01002','byma01002',2886993076,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(16,'KID35321','cbo','cboa01001','cboa01001',2886992772,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'CBOVD0001',0),(17,'KID35321','cbo','cboa01002','cboa01002',2886993536,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'CBOVD0002',0),(18,'KID35321','cbo','cboa01003','cboa01003',2886994410,'2017-06-04 12:54:12','2017-06-04',NULL,NULL,NULL,0),(19,'KID35321','cbo','cboa01004','cboa01004',2886994411,'2017-06-04 13:18:19','2017-06-04',NULL,NULL,NULL,0),(20,'KID46502','cgx','cgxa01001','cgxa01001',2886993651,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(21,'KID71106','cnp','cnpa01001','cnpa01001',2886993563,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(22,'KID71106','cnp','cnpa01002','cnpa01002',2886994188,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(23,'KID65172','cqx','cqxa01001','cqxa01001',2886992742,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(24,'KID65172','cqx','cqxa01002','cqxa01002',2886994375,'2017-05-17 23:18:59',NULL,NULL,NULL,NULL,0),(25,'KID66400','dfs','dfsa01001','dfsa01001',2886991930,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(26,'KID31971','dmy','dmya01001','dmya01001',2886994104,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(27,'KID37133','dzy','dzya01001','dzya01001',2886994365,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(28,'KID14835','eft','efta01001','efta01001',2886993817,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(29,'KID54041','erp','erpa01001','erpa01001',2886993860,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(30,'KID54041','erp','erpa01002','erpa01002',2886993737,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(31,'KID09154','fhk','fhka01001','fhka01001',2886992520,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'YAQDF0007',0),(32,'KID09154','fhk','fhka01002','fhka01002',2886994079,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(33,'KID45353','fqp','fqpa01001','fqpa01001',2886993171,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(34,'KID73153','fug','fuga01001','fuga01001',2886993609,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(35,'KID73153','fug','fuga01002','fuga01002',2886992226,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(36,'KID82472','fxq','fxqa01001','fxqa01001',2886992949,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(37,'KID57507','gbe','gbea01001','gbea01001',2886993547,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'GBEQD0001',0),(38,'KID57507','gbe','gbea01002','gbea01002',2886994047,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'GBEQD0002',0),(39,'KID57507','gbe','gbea01003','gbea01003',2886994412,'2017-06-04 13:20:14','2017-06-04',NULL,NULL,NULL,0),(40,'KID28129','gby','gbya01001','gbya01001',2886992021,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(41,'KID64117','hmh','hmha01001','hmha01001',2886994100,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(42,'KID70680','hno','hnoa01001','hnoa01001',2886993963,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(43,'KID16930','hvw','hvwa01001','hvwa01001',2886992608,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(44,'KID16930','hvw','hvwa01002','hvwa01002',2886993210,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(45,'KID15852','ifh','ifha01001','ifha01001',2886993003,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(46,'KID79115','imw','imwa01001','imwa01001',2886993920,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'IMWNJ0001',0),(47,'KID79115','imw','imwa01002','imwa01002',2886994373,'2017-05-17 08:02:23',NULL,NULL,NULL,'IMWNJ0002',0),(48,'KID79115','imw','imwa01003','imwa01003',2886994407,'2017-06-03 22:33:16','2017-06-03',NULL,NULL,'IMWNJ0004',0),(49,'KID79115','imw','imwa01004','imwa01004',2886994408,'2017-06-03 22:33:16','2017-06-03',NULL,NULL,'IMWNJ0005',0),(50,'KID84785','itj','itja01001','itja01001',2886993774,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(51,'KID84785','itj','itja01j01','itja01j01',2886992955,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(52,'KID84785','itj','itja01j02','itja01j02',2886994034,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(53,'KID48845','iyc','iyca01001','iyca01001',2886994233,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(54,'KID71644','jah','jaha01001','jaha01001',2886992997,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(55,'KID19837','jao','jaoa01001','jaoa01001',2886993810,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(56,'KID06724','jfi','jfia01001','jfia01001',2886993492,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(57,'KID16879','jfz','jfza01001','jfza01001',2886993947,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(58,'KID16879','jfz','jfza01002','jfza01002',2886991884,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(59,'KID36461','jly','jlya01001','jlya01001',2886992114,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(60,'KID36461','jly','jlya01002','jlya01002',2886993846,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(61,'KID48053','jro','jroa01001','jroa01001',2886992907,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(62,'KID48053','jro','jroa01002','jroa01002',2886994283,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(63,'KID24500','jva','jvaa01001','jvaa01001',2886992798,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(64,'KID24500','jva','jvaa01002','jvaa01002',2886994182,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(65,'KID76696','jxb','jxba01001','jxba01001',2886992358,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(66,'KID76696','jxb','jxba01002','jxba01002',2886994179,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(67,'KID25897','jyz','jyza01001','jyza01001',2886992403,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(68,'KID25897','jyz','jyza01002','jyza01002',2886993750,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(69,'KID14815','keq','keqa01001','keqa01001',2886992296,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(70,'KID24326','kfd','kfda01001','kfda01001',2886994345,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(71,'KID24326','kfd','kfda01002','kfda01002',2886993328,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(72,'KID28748','kiv','kiva01001','kiva01001',2886993972,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(73,'KID28748','kiv','kiva01002','kiva01002',2886993059,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(74,'KID94934','kqh','kqha01001','kqha01001',2886994012,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(75,'KID94934','kqh','kqha01002','kqha01002',2886992420,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(76,'KID10177','kst','ksta01001','ksta01001',2886992447,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(77,'KID10177','kst','ksta01002','ksta01002',2886993069,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(78,'KID10177','kst','ksta01003','ksta01003',2886994368,'2017-05-17 07:53:00',NULL,NULL,NULL,NULL,0),(79,'KID10177','kst','ksta01004','ksta01004',2886994369,'2017-05-17 07:53:00',NULL,NULL,NULL,NULL,0),(80,'KID10177','kst','ksta01005','ksta01005',2886994374,'2017-05-17 08:02:49',NULL,NULL,NULL,NULL,0),(81,'KID10177','kst','ksta01006','ksta01006',2886994391,'2017-05-24 21:35:29',NULL,NULL,NULL,NULL,0),(82,'KID10177','kst','ksta01007','ksta01007',2886994397,'2017-05-25 19:55:25',NULL,NULL,NULL,NULL,0),(83,'KID62816','kyy','kyya01001','kyya01001',2886994353,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(84,'KID62816','kyy','kyya01002','kyya01002',2886993450,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(85,'KID69629','lej','leja01001','leja01001',2886994137,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(86,'KID12094','lgd','lgda01001','lgda01001',2886993613,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(87,'KID12094','lgd','lgda01002','lgda01002',2886992033,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(88,'KID12094','lgd','lgda01003','lgda01003',2886992335,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(89,'KID54610','lpb','lpba01001','lpba01001',2886993602,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(90,'KID62505','lqq','lqqa01001','lqqa01001',2886993966,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(91,'KID62505','lqq','lqqa01002','lqqa01002',2886992544,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(92,'KID63160','lwa','lwaa01001','lwaa01001',2886992991,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(93,'KID57984','lxy','lxya01001','lxya01001',2886993267,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(94,'KID48263','lze','lzea01001','lzea01001',2886993735,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(95,'KID57944','mcp','mcpa01001','mcpa01001',2886992450,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(96,'KID57944','mcp','mcpa01002','mcpa01002',2886993520,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(97,'KID52090','miv','miva01001','miva01001',2886992400,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(98,'KID00824','mmm','mmma01001','mmma01001',2886994421,'2017-07-01 22:36:36','2017-07-01',NULL,NULL,NULL,0),(99,'KID00824','mmm','mmma01002','mmma01002',2886994424,'2017-07-02 11:40:46','2017-07-02',NULL,NULL,NULL,0),(100,'KID00824','mmm','mmma01003','mmma01003',2886994425,'2017-07-02 11:40:46','2017-07-02',NULL,NULL,NULL,0),(101,'KID00824','mmm','mmma01004','mmma01004',2886994426,'2017-07-02 11:40:46','2017-07-02',NULL,NULL,NULL,0),(102,'KID00824','mmm','mmma01005','mmma01005',2886994427,'2017-07-02 12:08:09','2017-07-02',NULL,NULL,NULL,0),(103,'KID06320','nfg','nfga01001','nfga01001',2886993596,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(104,'KID06320','nfg','nfga01002','nfga01002',2886993427,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(105,'KID06320','nfg','nfga01003','nfga01003',2886992826,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(106,'KID40357','nmn','nmna01001','nmna01001',2886992961,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(107,'KID30141','oaa','oaaa01001','oaaa01001',2886993991,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(108,'KID23214','otm','otma01001','otma01001',2886994189,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(109,'KID77891','pjn','pjna01001','pjna01001',2886992234,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'',0),(110,'KID77891','pjn','pjna01002','pjna01002',2886993739,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(111,'KID77891','pjn','pjna01003','pjna01003',2886992860,'2017-05-04 22:01:51','2017-06-08',NULL,NULL,'',0),(112,'KID77891','pjn','pjna01004','pjna01004',2886994415,'2017-06-16 07:52:15','2017-06-16',NULL,NULL,NULL,0),(113,'KID77891','pjn','pjna01005','pjna01005',2886994416,'2017-06-16 07:55:09','2017-06-16',NULL,NULL,NULL,0),(114,'KID16319','pmx','pmxa01001','pmxa01001',2886992591,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(115,'KID31088','puk','puka01001','puka01001',2886992565,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(116,'KID76430','pxw','pxwa01001','pxwa01001',2886993979,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(117,'KID76430','pxw','pxwa01002','pxwa01002',2886993401,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(118,'KID76430','pxw','pxwa01003','pxwa01003',2886992794,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(119,'KID57740','qlh','qlha01001','qlha01001',2886992043,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(120,'KID57740','qlh','qlha01002','qlha01002',2886991964,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(121,'KID05015','quj','quja01001','quja01001',2886993367,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(122,'KID05015','quj','quja01002','quja01002',2886994420,'2017-06-30 07:40:16','2017-06-30',NULL,NULL,NULL,0),(123,'KID37266','rcs','rcsa01001','rcsa01001',2886993105,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(124,'KID37266','rcs','rcsa01002','rcsa01002',2886993674,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(125,'KID37266','rcs','rcsa01003','rcsa01003',2886991963,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(126,'KID85143','rfs','rfsa01001','rfsa01001',2886993273,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(127,'KID85143','rfs','rfsa01002','rfsa01002',2886994129,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(128,'KID02907','rgp','rgpa01001','rgpa01001',2886993239,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(129,'KID02907','rgp','rgpa01002','rgpa01002',2886991899,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(130,'KID16915','rlm','rlma01001','rlma01001',2886993137,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(131,'KID16915','rlm','rlma01002','rlma01002',2886992658,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(132,'KID82466','run','runa01001','runa01001',2886992595,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(133,'KID82466','run','runa01002','runa01002',2886993190,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(134,'KID82466','run','runa01003','runa01003',2886992227,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(135,'KID10552','rwi','rwia01001','rwia01001',2886992913,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(136,'KID10552','rwi','rwia01002','rwia01002',2886992074,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(137,'KID71988','ski','skia01001','skia01001',2886994305,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(138,'KID91369','slp','slpa01001','slpa01001',2886993541,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(139,'KID60004','slx','slxa01001','slxa01001',2886993768,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'SLXXO0001',0),(140,'KID60004','slx','slxa01002','slxa01002',2886994370,'2017-05-17 07:59:46',NULL,NULL,NULL,NULL,0),(141,'KID60004','slx','slxa01003','slxa01003',2886994371,'2017-05-17 07:59:46',NULL,NULL,NULL,NULL,0),(142,'KID60004','slx','slxa01004','slxa01004',2886994372,'2017-05-17 08:01:19',NULL,NULL,NULL,NULL,0),(143,'KID60004','slx','slxa01005','slxa01005',2886994413,'2017-06-04 13:21:17','2017-06-04',NULL,NULL,NULL,0),(144,'KID95975','spu','spua01001','spua01001',2886993422,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(145,'KID95975','spu','spua01002','spua01002',2886992731,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(146,'KID98368','svi','svia01001','svia01001',2886994004,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(147,'KID66863','ter','tera01001','tera01001',2886991886,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(148,'KID40831','tge','tgea01001','tgea01001',2886992415,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(149,'KID29537','tuh','tuha01001','tuha01001',2886994138,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(150,'KID29537','tuh','tuha01002','tuha01002',2886993709,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(151,'KID13032','uyu','uyua01001','uyua01001',2886993582,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(152,'KID25144','vci','vcia01001','vcia01001',2886993268,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(153,'KID56944','vin','vina01001','vina01001',2886993793,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(154,'KID68661','vpk','vpka01001','vpka01001',2886992523,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(155,'KID63177','vvd','vvda01001','vvda01001',2886992080,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(156,'KID35925','vwd','vwda01001','vwda01001',2886994088,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(157,'KID35925','vwd','vwda01002','vwda01002',2886993969,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(158,'KID35925','vwd','vwda01003','vwda01003',2886993092,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(159,'KID79548','vzb','vzba01001','vzba01001',2886993130,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(160,'KID79548','vzb','vzba01002','vzba01002',2886992537,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(161,'KID79548','vzb','vzba01003','vzba01003',2886992431,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(162,'KID92232','wek','weka01001','weka01001',2886992671,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(163,'KID98375','wlm','wlma01001','wlma01001',2886994428,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(164,'KID98375','wlm','wlma01002','wlma01002',2886994429,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(165,'KID98375','wlm','wlma01003','wlma01003',2886994430,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(166,'KID98375','wlm','wlma01004','wlma01004',2886994433,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(167,'KID98375','wlm','wlma01005','wlma01005',2886994434,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(168,'KID98375','wlm','wlma01006','wlma01006',2886994435,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(169,'KID98375','wlm','wlma01007','wlma01007',2886994436,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(170,'KID98375','wlm','wlma01008','wlma01008',2886994437,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(171,'KID98375','wlm','wlma01009','wlma01009',2886994438,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(172,'KID98375','wlm','wlma01010','wlma01010',2886994439,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(173,'KID98375','wlm','wlma01011','wlma01011',2886994440,'2017-07-05 21:13:16','2017-07-05',NULL,NULL,NULL,0),(174,'KID98371','xwr','xwra01001','xwra01001',2886994392,'2017-05-25 07:59:20',NULL,NULL,NULL,'DHQRBY0001',0),(175,'KID98371','xwr','xwra01002','xwra01002',2886994393,'2017-05-25 07:59:20',NULL,NULL,NULL,'DHQRBY0001',0),(176,'KID98371','xwr','xwra01003','xwra01003',2886994399,'2017-06-01 07:41:12','2017-06-01',NULL,NULL,'DHQRBY0002',0),(177,'KID98371','xwr','xwra01004','xwra01004',2886994400,'2017-06-01 07:41:12','2017-06-01',NULL,NULL,'DHQRBY0002',0),(178,'KID09563','xxg','xxga01001','xxga01001',2886993575,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(179,'KID97449','xym','xyma01001','xyma01001',2886992993,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(180,'KID97449','xym','xyma01002','xyma01002',2886992983,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(181,'KID97449','xym','xyma01003','xyma01003',2886992406,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(182,'KID56303','xyo','xyoa01001','xyoa01001',2886993804,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(183,'KID56303','xyo','xyoa01002','xyoa01002',2886993085,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(184,'KID56303','xyo','xyoa01003','xyoa01003',2886992435,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(185,'KID92468','yaq','yacc01001','yacc01001',2886992169,'2017-05-04 22:01:51',NULL,NULL,NULL,'',0),(186,'KID92468','yaq','yacc01002','yacc01002',2886992714,'2017-05-04 22:01:51','2017-05-24',NULL,NULL,'',0),(187,'KID92468','yaq','yacc01003','yacc01003',2886992656,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'YAQDF0003',0),(188,'KID92468','yaq','yacc01004','yacc01004',2886994376,'2017-05-19 21:23:08','2017-06-05',NULL,NULL,'YAQDF0004',0),(189,'KID92468','yaq','yacc01005','yacc01005',2886994377,'2017-05-20 11:33:15','2017-06-05',NULL,NULL,'YAQDF0005',0),(190,'KID92468','yaq','yacc01006','yacc01006',2886994378,'2017-05-20 11:33:15','2017-06-06',NULL,NULL,'YAQDF0006',0),(191,'KID92468','yaq','yacc01007','yacc01007',2886994379,'2017-05-20 11:33:15','2017-06-06',NULL,NULL,'YAQDF0007',0),(192,'KID92468','yaq','yacc01008','yacc01008',2886994398,'2017-05-31 21:11:30','2017-05-31',NULL,NULL,'YAQDF0009',0),(193,'KID92468','yaq','yacc01009','yacc01009',2886994401,'2017-06-03 20:23:48','2017-06-03',NULL,NULL,'YAQDF0009',0),(194,'KID92468','yaq','yacc01010','yacc01010',2886994409,'2017-06-04 12:52:56','2017-06-06',NULL,NULL,'',0),(195,'KID18298','ybz','ybza01001','ybza01001',2886992278,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(196,'KID18298','ybz','ybza01002','ybza01002',2886993060,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(197,'KID18298','ybz','ybza01003','ybza01003',2886993909,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(198,'KID87388','yhw','yhwa01001','yhwa01001',2886993042,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(199,'KID87388','yhw','yhwa01002','yhwa01002',2886992692,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(200,'KID60414','yql','yqla01001','yqla01001',2886994120,'2017-05-04 22:01:51',NULL,NULL,NULL,'',0),(201,'KID60414','yql','yqla01002','yqla01002',2886992674,'2017-05-04 22:01:51','2017-05-10',NULL,NULL,'',0),(202,'KID60414','yql','yqla01003','yqla01003',2886993786,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'',0),(203,'KID60414','yql','yqla01004','yqla01004',2886994366,'2017-05-17 07:48:00','2017-06-05',NULL,NULL,'',0),(204,'KID60414','yql','yqla01005','yqla01005',2886994367,'2017-05-17 07:48:00','2017-06-05',NULL,NULL,'',0),(205,'KID60414','yql','yqla01006','yqla01006',2886994396,'2017-05-25 19:55:00','2017-06-05',NULL,NULL,'',0),(206,'KID42357','ytw','ytwa01001','ytwa01001',2886992108,'2017-05-04 22:01:51','2017-05-04','2017-07-11',NULL,'',0),(207,'KID42357','ytw','ytwa01002','ytwa01002',2886992978,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(208,'KID42357','ytw','ytwa01003','ytwa01003',2886992842,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(209,'KID50444','yyyy','yyyya01001','yyyya01001',2886994230,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(210,'KID50444','yyyy','yyyya01002','yyyya01002',2886992874,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(211,'KID50444','yyyy','yyyya01003','yyyya01003',2886993552,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(212,'KID80253','yzo','yzoa01001','yzoa01001',2886994058,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,'YZOBI0001',0),(213,'KID80253','yzo','yzoa01002','yzoa01002',2886994414,'2017-06-05 10:25:08','2017-06-05',NULL,NULL,NULL,0),(214,'KID60451','zmm','zmma01001','zmma01001',2886992181,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(215,'KID60451','zmm','zmma01002','zmma01002',2886993180,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(216,'KID60451','zmm','zmma01003','zmma01003',2886994237,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(217,'KID93084','zrt','zrta01001','zrta01001',2886993048,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(218,'KID20749','zxn','zxna01001','zxna01001',2886993199,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(219,'KID20749','zxn','zxna01002','zxna01002',2886992170,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(220,'KID20749','zxn','zxna01003','zxna01003',2886992749,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(221,'KID71925','zyu','zyua01001','zyua01001',2886992061,'2017-05-04 22:01:51','2017-05-04',NULL,NULL,NULL,0),(222,'KID98375','wlm','wlma01012','wlma01012',2886994441,'2017-07-08 14:48:35','2017-07-08',NULL,NULL,NULL,0),(283,'KID98375','m4mme','m4mme01001','m4mme01001',2886994442,'2017-07-09 01:37:10','2017-07-09',NULL,NULL,NULL,1),(284,'KID98375','m4mme','m4mme01002','m4mme01002',2886994443,'2017-07-09 01:37:10','2017-07-09',NULL,NULL,NULL,1),(285,'KID98375','m4mme','m4mme01003','m4mme01003',2886994444,'2017-07-09 01:37:10','2017-07-09',NULL,NULL,NULL,1),(286,'KID98375','m4mme','m4mme01004','m4mme01004',2886994445,'2017-07-09 01:37:10','2017-07-09',NULL,NULL,NULL,1),(287,'KID98375','m4mme','m4mme01005','m4mme01005',2886994446,'2017-07-09 01:37:10','2017-07-09',NULL,NULL,NULL,1),(290,'KID98376','m4roo','m4roo01001','m4roo01001',2886994447,'2017-07-09 11:21:12','2017-07-09',NULL,NULL,NULL,1),(291,'KID98376','m4roo','m4roo01002','m4roo01002',2886994448,'2017-07-09 11:21:12','2017-07-09',NULL,NULL,NULL,1),(292,'KID98376','m4roo','m4roo01003','m4roo01003',2886994449,'2017-07-09 11:21:12','2017-07-09',NULL,NULL,NULL,1),(293,'KID98376','m4roo','m4roo01004','m4roo01004',2886994450,'2017-07-09 11:21:12','2017-07-09',NULL,NULL,NULL,1),(294,'KID83014','m4maw','m4maw01001','m4maw01001',2886994451,'2017-07-09 12:24:42','2017-07-09',NULL,NULL,NULL,1),(603,'KID08385','m4aar','m4aar01001','m4aar01001',2886994452,'2017-07-09 12:28:58','2017-07-09',NULL,NULL,NULL,1),(604,'KID08385','m4aar','m4aar01002','m4aar01002',2886994453,'2017-07-09 12:28:58','2017-07-09',NULL,NULL,NULL,1),(605,'KID08385','m4aar','m4aar01003','m4aar01003',2886994454,'2017-07-09 12:28:58','2017-07-09',NULL,NULL,NULL,1),(606,'KID08385','m4aar','m4aar01004','m4aar01004',2886994455,'2017-07-09 12:28:58','2017-07-09',NULL,NULL,NULL,1),(607,'KID08385','m4aar','m4aar01005','m4aar01005',2886994456,'2017-07-09 12:28:58','2017-07-09',NULL,NULL,NULL,1),(608,'KID77891','pjn','pjna01006','pjna01006',2886994457,'2017-07-11 07:19:26','2017-07-11',NULL,NULL,NULL,0),(610,'KID98377','mgi','mgia01001','mgia01001',2886994459,'2017-07-12 19:12:29','2017-07-12',NULL,NULL,NULL,0),(611,'KID98377','mgi','mgia01002','mgia01002',2886994460,'2017-07-12 19:12:29','2017-07-12',NULL,NULL,NULL,0),(612,'KID98377','m8agr','m8agr001','m8agr001',2886994461,'2017-07-12 19:12:38','2017-07-12',NULL,NULL,NULL,1),(613,'KID98377','m8agr','m8agr002','m8agr002',2886994462,'2017-07-12 19:12:38','2017-07-12',NULL,NULL,NULL,1),(614,'KID98377','m8agr','m8agr003','m8agr003',2886994463,'2017-07-12 19:12:38','2017-07-12',NULL,NULL,NULL,1),(615,'KID98377','m8agr','m8agr004','m8agr004',2886994464,'2017-07-12 19:12:38','2017-07-12',NULL,NULL,NULL,1),(616,'KID98377','m8agr','m8agr005','m8agr005',2886994465,'2017-07-12 19:12:38','2017-07-12',NULL,NULL,NULL,1),(617,'KID77576','m4ytr','m4ytr001','m4ytr001',2886994466,'2017-07-18 07:39:44','2017-07-18',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `fenics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-22 18:27:38
