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
-- Table structure for table `kids`
--

DROP TABLE IF EXISTS `kids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kids` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kid` varchar(9) NOT NULL,
  `userkey` varchar(5) DEFAULT NULL,
  `server` varchar(5) DEFAULT NULL,
  `db_password` varchar(45) DEFAULT NULL,
  `fenics_key` varchar(10) DEFAULT NULL,
  `has_mobile` int(1) DEFAULT '0',
  `environment_id` int(2) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `create_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`kid`),
  UNIQUE KEY `kid_UNIQUE` (`kid`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `db_password_UNIQUE` (`db_password`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kids`
--

LOCK TABLES `kids` WRITE;
/*!40000 ALTER TABLE `kids` DISABLE KEYS */;
INSERT INTO `kids` VALUES (5,'KID77891','PJNPN','AP2-5','UPJNPN','pjn',0,3,2,'2016-09-24 00:12:37'),(6,'KID92468','YAQDF','AP2-4','UYAQDF','yaq',0,3,1,'2016-09-24 00:12:37'),(7,'KID60414','YQLBW','AP1-3','UYQLBW','yql',0,3,1,'2016-09-24 00:12:37'),(8,'KID95866',NULL,NULL,NULL,NULL,0,1,2,'2016-09-24 00:12:37'),(9,'KID42357','YTWBV','AP2-3','UYTWBV','ytw',0,3,3,'2016-09-24 00:12:37'),(10,'KID77576',NULL,NULL,NULL,NULL,0,1,1,'2016-09-24 00:12:38'),(11,'KID06320','NFGGL','AP5-5','UNFGGL','nfg',0,3,2,'2016-09-24 00:12:38'),(12,'KID56303','XYOUJ','AP3-2','UXYOUJ','xyo',0,3,3,'2016-09-24 00:12:38'),(13,'KID60451','ZMMCW','AP3-5','UZMMCW','zmm',0,3,2,'2016-09-24 00:12:38'),(14,'KID83014',NULL,NULL,NULL,NULL,0,2,2,'2016-09-24 00:12:38'),(15,'KID08385',NULL,NULL,NULL,NULL,0,2,2,'2016-09-24 00:12:38'),(16,'KID29537','TUHDM','AP2-5','UTUHDM','tuh',0,3,2,'2016-09-24 00:12:38'),(17,'KID10177','KSTFX','AP2-4','UKSTFX','kst',0,3,1,'2016-09-24 00:12:38'),(18,'KID62505','LQQJX','AP4-5','ULQQJX','lqq',0,3,2,'2016-09-24 00:12:38'),(19,'KID35321','CBOVD','AP5-2','UCBOVD','cbo',0,3,1,'2016-09-24 00:12:38'),(20,'KID87388','YHWWZ','AP5-5','UYHWWZ','yhw',0,3,2,'2016-09-24 00:12:38'),(21,'KID02907','RGPPS','AP3-1','URGPPS','rgp',0,3,2,'2016-09-24 00:12:38'),(22,'KID57507','GBEQD','AP4-2','UGBEQD','gbe',0,3,1,'2016-09-24 00:12:38'),(23,'KID09154','FHKUE','AP3-3','UFHKUE','fhk',0,3,2,'2016-09-24 00:12:38'),(24,'KID19837','JAOAN','AP1-4','UJAOAN','jao',0,3,3,'2016-09-24 00:12:38'),(25,'KID05015','QUJVK','AP3-2','UQUJVK','quj',0,3,3,'2016-09-24 00:12:38'),(26,'KID69629','LEJHA','AP3-4','ULEJHA','lej',0,3,2,'2016-09-24 00:12:38'),(27,'KID79115','IMWNJ','AP5-1','UIMWNJ','imw',0,3,1,'2016-09-24 00:12:38'),(28,'KID54610','LPBHE','AP3-4','ULPBHE','lpb',0,3,3,'2016-09-24 00:12:38'),(29,'KID48263','LZEQJ','AP5-3','ULZEQJ','lze',0,3,2,'2016-09-24 00:12:38'),(30,'KID66400','DFSUD','AP4-1','UDFSUD','dfs',0,3,3,'2016-09-24 00:12:38'),(31,'KID60004','SLXXO','AP1-4','USLXXO','slx',0,3,1,'2016-09-24 00:12:38'),(32,'KID80253','YZOBI','AP4-5','UYZOBI','yzo',0,3,1,'2016-09-24 00:12:38'),(33,'KID71644','JAHGD','AP4-2','UJAHGD','jah',0,3,3,'2016-09-24 00:12:38'),(34,'KID16930','HVWVZ','AP3-1','UHVWVZ','hvw',0,3,3,'2016-09-24 00:12:38'),(35,'KID16879','JFZJH','AP4-3','UJFZJH','jfz',0,3,3,'2016-09-24 00:12:38'),(36,'KID54041','ERPTF','AP4-3','UERPTF','erp',0,3,1,'2016-09-24 00:12:39'),(37,'KID85143','RFSHM','AP3-2','URFSHM','rfs',0,3,2,'2016-09-24 00:12:39'),(38,'KID74418','BYMUS','AP2-1','UBYMUS','bym',0,3,3,'2016-09-24 00:12:39'),(39,'KID77160','ABPBN','AP5-1','UABPBN','abp',0,3,3,'2016-09-24 00:12:39'),(40,'KID10552','RWIOH','AP5-4','URWIOH','rwi',0,3,3,'2016-09-24 00:12:39'),(41,'KID21748','ATWGU','AP1-5','UATWGU','atw',0,3,2,'2016-09-24 00:12:39'),(42,'KID95975','SPUXI','AP1-4','USPUXI','spu',0,3,3,'2016-09-24 00:12:39'),(43,'KID28748','KIVVP','AP1-3','UKIVVP','kiv',0,3,2,'2016-09-24 00:12:39'),(44,'KID24326','KFDMX','AP5-4','UKFDMX','kfd',0,3,1,'2016-09-24 00:12:39'),(45,'KID48053','JROKE','AP1-2','UJROKE','jro',0,3,2,'2016-09-24 00:12:40'),(46,'KID16915','RLMGZ','AP5-2','URLMGZ','rlm',0,3,2,'2016-09-24 00:12:40'),(47,'KID18298','YBZXG','AP2-2','UYBZXG','ybz',0,3,2,'2016-09-24 00:12:40'),(48,'KID20749','ZXNJJ','AP5-1','UZXNJJ','zxn',0,3,3,'2016-09-24 00:12:40'),(49,'KID35925','VWDVC','AP1-5','UVWDVC','vwd',0,3,1,'2016-09-24 00:12:40'),(50,'KID76430','PXWSF','AP5-1','UPXWSF','pxw',0,3,3,'2016-09-24 00:12:40'),(51,'KID97449','XYMMS','AP5-4','UXYMMS','xym',0,3,1,'2016-09-24 00:12:40'),(52,'KID73153','FUGNG','AP3-2','UFUGNG','fug',0,3,3,'2016-09-24 00:12:40'),(53,'KID57944','MCPVZ','AP1-2','UMCPVZ','mcp',0,3,3,'2016-09-24 00:12:40'),(54,'KID24500','JVADI','AP2-5','UJVADI','jva',0,3,2,'2016-09-24 00:12:40'),(55,'KID76696','JXBZI','AP1-4','UJXBZI','jxb',0,3,2,'2016-09-24 00:12:40'),(56,'KID71106','CNPJH','AP5-5','UCNPJH','cnp',0,4,1,'2016-09-24 00:12:40'),(57,'KID57740','QLHZF','AP2-5','UQLHZF','qlh',0,4,3,'2016-09-24 00:12:40'),(58,'KID25897','JYZVJ','AP3-5','UJYZVJ','jyz',0,4,1,'2016-09-24 00:12:40'),(59,'KID36461','JLYOL','AP4-2','UJLYOL','jly',0,4,1,'2016-09-24 00:12:41'),(60,'KID94934','KQHCQ','AP2-2','UKQHCQ','kqh',0,4,2,'2016-09-24 00:12:41'),(61,'KID62816','KYYBW','AP5-3','UKYYBW','kyy',0,4,2,'2016-09-24 00:12:41'),(62,'KID16319','PMXOE','AP5-1','UPMXOE','pmx',0,4,2,'2016-09-24 00:12:41'),(63,'KID13032','UYUXB','AP4-4','UUYUXB','uyu',0,4,2,'2016-09-24 00:12:41'),(64,'KID84785','ITJZY','AP1-1','UITJZY','itj',0,4,3,'2016-09-24 00:12:41'),(65,'KID52090','MIVZR','AP2-5','UMIVZR','miv',0,4,3,'2016-09-24 00:12:41'),(66,'KID57984','LXYFY','AP4-1','ULXYFY','lxy',0,4,2,'2016-09-24 00:12:41'),(67,'KID23214','OTMHT','AP3-5','UOTMHT','otm',0,4,2,'2016-09-24 00:12:41'),(68,'KID48845','IYCUT','AP1-4','UIYCUT','iyc',0,4,3,'2016-09-24 00:12:41'),(69,'KID63160','LWAPO','AP3-5','ULWAPO','lwa',0,4,2,'2016-09-24 00:12:41'),(70,'KID87386','AVNQR','AP5-1','UAVNQR','avn',0,4,1,'2016-09-24 00:12:41'),(71,'KID15852','IFHOI','AP2-4','UIFHOI','ifh',0,4,2,'2016-09-24 00:12:41'),(72,'KID14815','KEQKU','AP4-2','UKEQKU','keq',0,4,2,'2016-09-24 00:12:41'),(73,'KID25144','VCILY','AP4-5','UVCILY','vci',0,4,3,'2016-09-24 00:12:41'),(74,'KID46502','CGXXV','AP5-3','UCGXXV','cgx',0,4,1,'2016-09-24 00:12:41'),(75,'KID40831','TGEOP','AP4-4','UTGEOP','tge',0,4,3,'2016-09-24 00:12:41'),(76,'KID91369','SLPHY','AP1-2','USLPHY','slp',0,4,1,'2016-09-24 00:12:41'),(77,'KID31971','DMYVC','AP1-2','UDMYVC','dmy',0,4,1,'2016-09-24 00:12:41'),(78,'KID40357','NMNML','AP2-3','UNMNML','nmn',0,4,1,'2016-09-24 00:12:41'),(79,'KID06724','JFIQC','AP4-3','UJFIQC','jfi',0,4,2,'2016-09-24 00:12:41'),(80,'KID71988','SKIZO','AP1-1','USKIZO','ski',0,4,3,'2016-09-24 00:12:41'),(81,'KID28129','GBYYE','AP3-2','UGBYYE','gby',0,4,1,'2016-09-24 00:12:41'),(82,'KID68661','VPKMJ','AP4-3','UVPKMJ','vpk',0,4,1,'2016-09-24 00:12:41'),(83,'KID56944','VINJH','AP5-3','UVINJH','vin',0,4,1,'2016-09-24 00:12:41'),(84,'KID82472','FXQDO','AP1-4','UFXQDO','fxq',0,4,3,'2016-09-24 00:12:42'),(85,'KID64117','HMHPH','AP3-3','UHMHPH','hmh',0,4,1,'2016-09-24 00:12:42'),(86,'KID37133','DZYIN','AP2-4','UDZYIN','dzy',0,4,3,'2016-09-24 00:12:42'),(87,'KID31088','PUKHU','AP1-3','UPUKHU','puk',0,4,2,'2016-09-24 00:12:42'),(88,'KID45353','FQPKI','AP3-2','UFQPKI','fqp',0,4,1,'2016-09-24 00:12:42'),(89,'KID92232','WEKEB','AP5-4','UWEKEB','wek',0,4,2,'2016-09-24 00:12:42'),(90,'KID65172','CQXOT','AP1-4','UCQXOT','cqx',0,4,2,'2016-09-24 00:12:42'),(91,'KID93084','ZRTLC','AP4-3','UZRTLC','zrt',0,4,1,'2016-09-24 00:12:42'),(92,'KID09563','XXGWP','AP4-3','UXXGWP','xxg',0,4,2,'2016-09-24 00:12:42'),(93,'KID14835','EFTVU','AP1-3','UEFTVU','eft',0,4,3,'2016-09-24 00:12:42'),(94,'KID70680','HNOJW','AP5-5','UHNOJW','hno',0,4,1,'2016-09-24 00:12:42'),(95,'KID00824','MMMRG','AP4-2','UMMMRG','mmm',0,4,1,'2016-09-24 00:12:42'),(96,'KID71925','ZYUYG','AP4-1','UZYUYG','zyu',0,4,2,'2016-09-24 00:12:42'),(97,'KID66863','TERCF','AP1-3','UTERCF','ter',0,4,3,'2016-09-24 00:12:42'),(98,'KID30141','OAAOW','AP2-5','UOAAOW','oaa',0,4,1,'2016-09-24 00:12:42'),(99,'KID63177','VVDIL','AP2-2','UVVDIL','vvd',0,4,1,'2016-09-24 00:12:42'),(100,'KID98368','SVIHT','AP4-2','USVIHT','svi',0,4,3,'2016-09-24 00:12:42'),(101,'KID12094','LGDIY','AP4-2','ULGDIY','lgd',0,4,1,'2016-09-24 00:12:42'),(102,'KID82466','RUNSB','AP4-1','URUNSB','run',0,4,3,'2016-09-24 00:12:42'),(103,'KID79548','VZBCM','AP5-4','UVZBCM','vzb',0,4,3,'2016-09-24 00:12:42'),(104,'KID37266','RCSID','AP2-2','URCSID','rcs',0,4,1,'2016-09-24 00:12:42'),(105,'KID50444','YYYYY','AP1-2','UYYYYY','yyyy',0,4,1,'2016-09-25 20:26:54');
/*!40000 ALTER TABLE `kids` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-07 10:20:22
