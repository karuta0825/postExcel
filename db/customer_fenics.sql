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
  `kid` varchar(9) DEFAULT NULL,
  `fenics_key` varchar(9) DEFAULT NULL,
  `fenics_id` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `fenics_ip` int(10) unsigned DEFAULT NULL,
  `create_on` datetime DEFAULT NULL,
  `start_on` date DEFAULT NULL,
  `create_user_id` int(2) DEFAULT NULL,
  PRIMARY KEY (`fenics_id`),
  UNIQUE KEY `genics_id_UNIQUE` (`fenics_id`),
  UNIQUE KEY `fenics_ip_UNIQUE` (`fenics_ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fenics`
--

LOCK TABLES `fenics` WRITE;
/*!40000 ALTER TABLE `fenics` DISABLE KEYS */;
INSERT INTO `fenics` VALUES ('KID77160','abp','abp0001','abp0001',2886993178,'2017-05-04 22:01:51','2017-05-04',NULL),('KID21748','atw','atw0001','atw0001',2886992451,'2017-05-04 22:01:51','2017-05-04',NULL),('KID21748','atw','atw0002','atw0002',2886993477,'2017-05-04 22:01:51','2017-05-04',NULL),('KID87386','avn','avn0001','avn0001',2886993361,'2017-05-04 22:01:51','2017-05-04',NULL),('KID97450','bea','bea0001','bea0001',2886994389,'2017-05-21 21:39:39',NULL,NULL),('KID74418','bym','bym0001','bym0001',2886993263,'2017-05-04 22:01:51','2017-05-04',NULL),('KID74418','bym','bym0002','bym0002',2886993076,'2017-05-04 22:01:51','2017-05-04',NULL),('KID35321','cbo','cbo0001','cbo0001',2886992772,'2017-05-04 22:01:51','2017-05-04',NULL),('KID35321','cbo','cbo0002','cbo0002',2886993536,'2017-05-04 22:01:51','2017-05-04',NULL),('KID46502','cgx','cgx0001','cgx0001',2886993651,'2017-05-04 22:01:51','2017-05-04',NULL),('KID71106','cnp','cnp0001','cnp0001',2886993563,'2017-05-04 22:01:51','2017-05-04',NULL),('KID71106','cnp','cnp0002','cnp0002',2886994188,'2017-05-04 22:01:51','2017-05-04',NULL),('KID65172','cqx','cqx0001','cqx0001',2886992742,'2017-05-04 22:01:51','2017-05-04',NULL),('KID65172','cqx','cqx0002','cqx0002',2886994375,'2017-05-17 23:18:59',NULL,NULL),('KID66400','dfs','dfs0001','dfs0001',2886991930,'2017-05-04 22:01:51','2017-05-04',NULL),('KID31971','dmy','dmy0001','dmy0001',2886994104,'2017-05-04 22:01:51','2017-05-04',NULL),('KID37133','dzy','dzy0001','dzy0001',2886994365,'2017-05-04 22:01:51','2017-05-04',NULL),('KID14835','eft','eft0001','eft0001',2886993817,'2017-05-04 22:01:51','2017-05-04',NULL),('KID54041','erp','erp0001','erp0001',2886993860,'2017-05-04 22:01:51','2017-05-04',NULL),('KID54041','erp','erp0002','erp0002',2886993737,'2017-05-04 22:01:51','2017-05-04',NULL),('KID09154','fhk','fhk0001','fhk0001',2886992520,'2017-05-04 22:01:51','2017-05-04',NULL),('KID09154','fhk','fhk0002','fhk0002',2886994079,'2017-05-04 22:01:51','2017-05-04',NULL),('KID45353','fqp','fqp0001','fqp0001',2886993171,'2017-05-04 22:01:51','2017-05-04',NULL),('KID73153','fug','fug0001','fug0001',2886993609,'2017-05-04 22:01:51','2017-05-04',NULL),('KID73153','fug','fug0002','fug0002',2886992226,'2017-05-04 22:01:51','2017-05-04',NULL),('KID82472','fxq','fxq0001','fxq0001',2886992949,'2017-05-04 22:01:51','2017-05-04',NULL),('KID57507','gbe','gbe0001','gbe0001',2886993547,'2017-05-04 22:01:51','2017-05-04',NULL),('KID57507','gbe','gbe0002','gbe0002',2886994047,'2017-05-04 22:01:51','2017-05-04',NULL),('KID28129','gby','gby0001','gby0001',2886992021,'2017-05-04 22:01:51','2017-05-04',NULL),('KID64117','hmh','hmh0001','hmh0001',2886994100,'2017-05-04 22:01:51','2017-05-04',NULL),('KID70680','hno','hno0001','hno0001',2886993963,'2017-05-04 22:01:51','2017-05-04',NULL),('KID16930','hvw','hvw0001','hvw0001',2886992608,'2017-05-04 22:01:51','2017-05-04',NULL),('KID16930','hvw','hvw0002','hvw0002',2886993210,'2017-05-04 22:01:51','2017-05-04',NULL),('KID15852','ifh','ifh0001','ifh0001',2886993003,'2017-05-04 22:01:51','2017-05-04',NULL),('KID79115','imw','imw0001','imw0001',2886993920,'2017-05-04 22:01:51','2017-05-04',NULL),('KID79115','imw','imw0002','imw0002',2886994373,'2017-05-17 08:02:23',NULL,NULL),('KID84785','itj','itj0001','itj0001',2886993774,'2017-05-04 22:01:51','2017-05-04',NULL),('KID84785','itj','itj01','itj01',2886992955,'2017-05-04 22:01:51','2017-05-04',NULL),('KID84785','itj','itj02','itj02',2886994034,'2017-05-04 22:01:51','2017-05-04',NULL),('KID48845','iyc','iyc0001','iyc0001',2886994233,'2017-05-04 22:01:51','2017-05-04',NULL),('KID71644','jah','jah0001','jah0001',2886992997,'2017-05-04 22:01:51','2017-05-04',NULL),('KID19837','jao','jao0001','jao0001',2886993810,'2017-05-04 22:01:51','2017-05-04',NULL),('KID06724','jfi','jfi0001','jfi0001',2886993492,'2017-05-04 22:01:51','2017-05-04',NULL),('KID16879','jfz','jfz0001','jfz0001',2886993947,'2017-05-04 22:01:51','2017-05-04',NULL),('KID16879','jfz','jfz0002','jfz0002',2886991884,'2017-05-04 22:01:51','2017-05-04',NULL),('KID36461','jly','jly0001','jly0001',2886992114,'2017-05-04 22:01:51','2017-05-04',NULL),('KID36461','jly','jly0002','jly0002',2886993846,'2017-05-04 22:01:51','2017-05-04',NULL),('KID48053','jro','jro0001','jro0001',2886992907,'2017-05-04 22:01:51','2017-05-04',NULL),('KID48053','jro','jro0002','jro0002',2886994283,'2017-05-04 22:01:51','2017-05-04',NULL),('KID24500','jva','jva0001','jva0001',2886992798,'2017-05-04 22:01:51','2017-05-04',NULL),('KID24500','jva','jva0002','jva0002',2886994182,'2017-05-04 22:01:51','2017-05-04',NULL),('KID76696','jxb','jxb0001','jxb0001',2886992358,'2017-05-04 22:01:51','2017-05-04',NULL),('KID76696','jxb','jxb0002','jxb0002',2886994179,'2017-05-04 22:01:51','2017-05-04',NULL),('KID25897','jyz','jyz0001','jyz0001',2886992403,'2017-05-04 22:01:51','2017-05-04',NULL),('KID25897','jyz','jyz0002','jyz0002',2886993750,'2017-05-04 22:01:51','2017-05-04',NULL),('KID14815','keq','keq0001','keq0001',2886992296,'2017-05-04 22:01:51','2017-05-04',NULL),('KID24326','kfd','kfd0001','kfd0001',2886994345,'2017-05-04 22:01:51','2017-05-04',NULL),('KID24326','kfd','kfd0002','kfd0002',2886993328,'2017-05-04 22:01:51','2017-05-04',NULL),('KID28748','kiv','kiv0001','kiv0001',2886993972,'2017-05-04 22:01:51','2017-05-04',NULL),('KID28748','kiv','kiv0002','kiv0002',2886993059,'2017-05-04 22:01:51','2017-05-04',NULL),('KID94934','kqh','kqh0001','kqh0001',2886994012,'2017-05-04 22:01:51','2017-05-04',NULL),('KID94934','kqh','kqh0002','kqh0002',2886992420,'2017-05-04 22:01:51','2017-05-04',NULL),('KID10177','kst','kst0001','kst0001',2886992447,'2017-05-04 22:01:51','2017-05-04',NULL),('KID10177','kst','kst0002','kst0002',2886993069,'2017-05-04 22:01:51','2017-05-04',NULL),('KID10177','kst','kst0003','kst0003',2886994368,'2017-05-17 07:53:00',NULL,NULL),('KID10177','kst','kst0004','kst0004',2886994369,'2017-05-17 07:53:00',NULL,NULL),('KID10177','kst','kst0005','kst0005',2886994374,'2017-05-17 08:02:49',NULL,NULL),('KID10177','kst','kst0006','kst0006',2886994391,'2017-05-24 21:35:29',NULL,NULL),('KID10177','kst','kst0007','kst0007',2886994397,'2017-05-25 19:55:25',NULL,NULL),('KID62816','kyy','kyy0001','kyy0001',2886994353,'2017-05-04 22:01:51','2017-05-04',NULL),('KID62816','kyy','kyy0002','kyy0002',2886993450,'2017-05-04 22:01:51','2017-05-04',NULL),('KID69629','lej','lej0001','lej0001',2886994137,'2017-05-04 22:01:51','2017-05-04',NULL),('KID12094','lgd','lgd0001','lgd0001',2886993613,'2017-05-04 22:01:51','2017-05-04',NULL),('KID12094','lgd','lgd0002','lgd0002',2886992033,'2017-05-04 22:01:51','2017-05-04',NULL),('KID12094','lgd','lgd0003','lgd0003',2886992335,'2017-05-04 22:01:51','2017-05-04',NULL),('KID54610','lpb','lpb0001','lpb0001',2886993602,'2017-05-04 22:01:51','2017-05-04',NULL),('KID62505','lqq','lqq0001','lqq0001',2886993966,'2017-05-04 22:01:51','2017-05-04',NULL),('KID62505','lqq','lqq0002','lqq0002',2886992544,'2017-05-04 22:01:51','2017-05-04',NULL),('KID63160','lwa','lwa0001','lwa0001',2886992991,'2017-05-04 22:01:51','2017-05-04',NULL),('KID57984','lxy','lxy0001','lxy0001',2886993267,'2017-05-04 22:01:51','2017-05-04',NULL),('KID48263','lze','lze0001','lze0001',2886993735,'2017-05-04 22:01:51','2017-05-04',NULL),('KID57944','mcp','mcp0001','mcp0001',2886992450,'2017-05-04 22:01:51','2017-05-04',NULL),('KID57944','mcp','mcp0002','mcp0002',2886993520,'2017-05-04 22:01:51','2017-05-04',NULL),('KID52090','miv','miv0001','miv0001',2886992400,'2017-05-04 22:01:51','2017-05-04',NULL),('KID00824','mmm','mmm0001','mmm0001',2886992953,'2017-05-04 22:01:51','2017-05-04',NULL),('KID06320','nfg','nfg0001','nfg0001',2886993596,'2017-05-04 22:01:51','2017-05-04',NULL),('KID06320','nfg','nfg0002','nfg0002',2886993427,'2017-05-04 22:01:51','2017-05-04',NULL),('KID06320','nfg','nfg0003','nfg0003',2886992826,'2017-05-04 22:01:51','2017-05-04',NULL),('KID40357','nmn','nmn0001','nmn0001',2886992961,'2017-05-04 22:01:51','2017-05-04',NULL),('KID30141','oaa','oaa0001','oaa0001',2886993991,'2017-05-04 22:01:51','2017-05-04',NULL),('KID23214','otm','otm0001','otm0001',2886994189,'2017-05-04 22:01:51','2017-05-04',NULL),('KID77891','pjn','pjn0001','pjn0001',2886992234,'2017-05-04 22:01:51','2017-05-04',NULL),('KID77891','pjn','pjn0002','pjn0002',2886993739,'2017-05-04 22:01:51','2017-05-04',NULL),('KID77891','pjn','pjn0003','pjn0003',2886992860,'2017-05-04 22:01:51','2017-05-04',NULL),('KID16319','pmx','pmx0001','pmx0001',2886992591,'2017-05-04 22:01:51','2017-05-04',NULL),('KID31088','puk','puk0001','puk0001',2886992565,'2017-05-04 22:01:51','2017-05-04',NULL),('KID76430','pxw','pxw0001','pxw0001',2886993979,'2017-05-04 22:01:51','2017-05-04',NULL),('KID76430','pxw','pxw0002','pxw0002',2886993401,'2017-05-04 22:01:51','2017-05-04',NULL),('KID76430','pxw','pxw0003','pxw0003',2886992794,'2017-05-04 22:01:51','2017-05-04',NULL),('KID57740','qlh','qlh0001','qlh0001',2886992043,'2017-05-04 22:01:51','2017-05-04',NULL),('KID57740','qlh','qlh0002','qlh0002',2886991964,'2017-05-04 22:01:51','2017-05-04',NULL),('KID05015','quj','quj0001','quj0001',2886993367,'2017-05-04 22:01:51','2017-05-04',NULL),('KID37266','rcs','rcs0001','rcs0001',2886993105,'2017-05-04 22:01:51','2017-05-04',NULL),('KID37266','rcs','rcs0002','rcs0002',2886993674,'2017-05-04 22:01:51','2017-05-04',NULL),('KID37266','rcs','rcs0003','rcs0003',2886991963,'2017-05-04 22:01:51','2017-05-04',NULL),('KID85143','rfs','rfs0001','rfs0001',2886993273,'2017-05-04 22:01:51','2017-05-04',NULL),('KID85143','rfs','rfs0002','rfs0002',2886994129,'2017-05-04 22:01:51','2017-05-04',NULL),('KID02907','rgp','rgp0001','rgp0001',2886993239,'2017-05-04 22:01:51','2017-05-04',NULL),('KID02907','rgp','rgp0002','rgp0002',2886991899,'2017-05-04 22:01:51','2017-05-04',NULL),('KID16915','rlm','rlm0001','rlm0001',2886993137,'2017-05-04 22:01:51','2017-05-04',NULL),('KID16915','rlm','rlm0002','rlm0002',2886992658,'2017-05-04 22:01:51','2017-05-04',NULL),('KID82466','run','run0001','run0001',2886992595,'2017-05-04 22:01:51','2017-05-04',NULL),('KID82466','run','run0002','run0002',2886993190,'2017-05-04 22:01:51','2017-05-04',NULL),('KID82466','run','run0003','run0003',2886992227,'2017-05-04 22:01:51','2017-05-04',NULL),('KID10552','rwi','rwi0001','rwi0001',2886992913,'2017-05-04 22:01:51','2017-05-04',NULL),('KID10552','rwi','rwi0002','rwi0002',2886992074,'2017-05-04 22:01:51','2017-05-04',NULL),('KID71988','ski','ski0001','ski0001',2886994305,'2017-05-04 22:01:51','2017-05-04',NULL),('KID91369','slp','slp0001','slp0001',2886993541,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60004','slx','slx0001','slx0001',2886993768,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60004','slx','slx0002','slx0002',2886994370,'2017-05-17 07:59:46',NULL,NULL),('KID60004','slx','slx0003','slx0003',2886994371,'2017-05-17 07:59:46',NULL,NULL),('KID60004','slx','slx0004','slx0004',2886994372,'2017-05-17 08:01:19',NULL,NULL),('KID95975','spu','spu0001','spu0001',2886993422,'2017-05-04 22:01:51','2017-05-04',NULL),('KID95975','spu','spu0002','spu0002',2886992731,'2017-05-04 22:01:51','2017-05-04',NULL),('KID98368','svi','svi0001','svi0001',2886994004,'2017-05-04 22:01:51','2017-05-04',NULL),('KID66863','ter','ter0001','ter0001',2886991886,'2017-05-04 22:01:51','2017-05-04',NULL),('KID40831','tge','tge0001','tge0001',2886992415,'2017-05-04 22:01:51','2017-05-04',NULL),('KID29537','tuh','tuh0001','tuh0001',2886994138,'2017-05-04 22:01:51','2017-05-04',NULL),('KID29537','tuh','tuh0002','tuh0002',2886993709,'2017-05-04 22:01:51','2017-05-04',NULL),('KID13032','uyu','uyu0001','uyu0001',2886993582,'2017-05-04 22:01:51','2017-05-04',NULL),('KID25144','vci','vci0001','vci0001',2886993268,'2017-05-04 22:01:51','2017-05-04',NULL),('KID56944','vin','vin0001','vin0001',2886993793,'2017-05-04 22:01:51','2017-05-04',NULL),('KID68661','vpk','vpk0001','vpk0001',2886992523,'2017-05-04 22:01:51','2017-05-04',NULL),('KID63177','vvd','vvd0001','vvd0001',2886992080,'2017-05-04 22:01:51','2017-05-04',NULL),('KID35925','vwd','vwd0001','vwd0001',2886994088,'2017-05-04 22:01:51','2017-05-04',NULL),('KID35925','vwd','vwd0002','vwd0002',2886993969,'2017-05-04 22:01:51','2017-05-04',NULL),('KID35925','vwd','vwd0003','vwd0003',2886993092,'2017-05-04 22:01:51','2017-05-04',NULL),('KID79548','vzb','vzb0001','vzb0001',2886993130,'2017-05-04 22:01:51','2017-05-04',NULL),('KID79548','vzb','vzb0002','vzb0002',2886992537,'2017-05-04 22:01:51','2017-05-04',NULL),('KID79548','vzb','vzb0003','vzb0003',2886992431,'2017-05-04 22:01:51','2017-05-04',NULL),('KID92232','wek','wek0001','wek0001',2886992671,'2017-05-04 22:01:51','2017-05-04',NULL),('KID98371','xwr','xwr0001','xwr0001',2886994392,'2017-05-25 07:59:20',NULL,NULL),('KID98371','xwr','xwr0002','xwr0002',2886994393,'2017-05-25 07:59:20',NULL,NULL),('KID98371','xwr','xwr0003','xwr0003',2886994394,'2017-05-25 07:59:20',NULL,NULL),('KID98371','xwr','xwr0004','xwr0004',2886994395,'2017-05-25 07:59:20',NULL,NULL),('KID09563','xxg','xxg0001','xxg0001',2886993575,'2017-05-04 22:01:51','2017-05-04',NULL),('KID97449','xym','xym0001','xym0001',2886992993,'2017-05-04 22:01:51','2017-05-04',NULL),('KID97449','xym','xym0002','xym0002',2886992983,'2017-05-04 22:01:51','2017-05-04',NULL),('KID97449','xym','xym0003','xym0003',2886992406,'2017-05-04 22:01:51','2017-05-04',NULL),('KID56303','xyo','xyo0001','xyo0001',2886993804,'2017-05-04 22:01:51','2017-05-04',NULL),('KID56303','xyo','xyo0002','xyo0002',2886993085,'2017-05-04 22:01:51','2017-05-04',NULL),('KID56303','xyo','xyo0003','xyo0003',2886992435,'2017-05-04 22:01:51','2017-05-04',NULL),('KID92468','yaq','yaq0001','yaq0001',2886992169,'2017-05-04 22:01:51','2017-05-04',NULL),('KID92468','yaq','yaq0002','yaq0002',2886992714,'2017-05-04 22:01:51','2017-05-04',NULL),('KID92468','yaq','yaq0003','yaq0003',2886992656,'2017-05-04 22:01:51','2017-05-04',NULL),('KID92468','yaq','yaq0004','yaq0004',2886994376,'2017-05-19 21:23:08',NULL,NULL),('KID92468','yaq','yaq0005','yaq0005',2886994377,'2017-05-20 11:33:15',NULL,NULL),('KID92468','yaq','yaq0006','yaq0006',2886994378,'2017-05-20 11:33:15',NULL,NULL),('KID92468','yaq','yaq0007','yaq0007',2886994379,'2017-05-20 11:33:15',NULL,NULL),('KID18298','ybz','ybz0001','ybz0001',2886992278,'2017-05-04 22:01:51','2017-05-04',NULL),('KID18298','ybz','ybz0002','ybz0002',2886993060,'2017-05-04 22:01:51','2017-05-04',NULL),('KID18298','ybz','ybz0003','ybz0003',2886993909,'2017-05-04 22:01:51','2017-05-04',NULL),('KID87388','yhw','yhw0001','yhw0001',2886993042,'2017-05-04 22:01:51','2017-05-04',NULL),('KID87388','yhw','yhw0002','yhw0002',2886992692,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60414','yql','yql0001','yql0001',2886994120,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60414','yql','yql0002','yql0002',2886992674,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60414','yql','yql0003','yql0003',2886993786,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60414','yql','yql0004','yql0004',2886994366,'2017-05-17 07:48:00',NULL,NULL),('KID60414','yql','yql0005','yql0005',2886994367,'2017-05-17 07:48:00',NULL,NULL),('KID60414','yql','yql0006','yql0006',2886994396,'2017-05-25 19:55:00',NULL,NULL),('KID42357','ytw','ytw0001','ytw0001',2886992108,'2017-05-04 22:01:51','2017-05-04',NULL),('KID42357','ytw','ytw0002','ytw0002',2886992978,'2017-05-04 22:01:51','2017-05-04',NULL),('KID42357','ytw','ytw0003','ytw0003',2886992842,'2017-05-04 22:01:51','2017-05-04',NULL),('KID50444','yyyy','yyyy0001','yyyy0001',2886994230,'2017-05-04 22:01:51','2017-05-04',NULL),('KID50444','yyyy','yyyy0002','yyyy0002',2886992874,'2017-05-04 22:01:51','2017-05-04',NULL),('KID50444','yyyy','yyyy0003','yyyy0003',2886993552,'2017-05-04 22:01:51','2017-05-04',NULL),('KID80253','yzo','yzo0001','yzo0001',2886994058,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60451','zmm','zmm0001','zmm0001',2886992181,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60451','zmm','zmm0002','zmm0002',2886993180,'2017-05-04 22:01:51','2017-05-04',NULL),('KID60451','zmm','zmm0003','zmm0003',2886994237,'2017-05-04 22:01:51','2017-05-04',NULL),('KID93084','zrt','zrt0001','zrt0001',2886993048,'2017-05-04 22:01:51','2017-05-04',NULL),('KID20749','zxn','zxn0001','zxn0001',2886993199,'2017-05-04 22:01:51','2017-05-04',NULL),('KID20749','zxn','zxn0002','zxn0002',2886992170,'2017-05-04 22:01:51','2017-05-04',NULL),('KID20749','zxn','zxn0003','zxn0003',2886992749,'2017-05-04 22:01:51','2017-05-04',NULL),('KID71925','zyu','zyu0001','zyu0001',2886992061,'2017-05-04 22:01:51','2017-05-04',NULL);
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

-- Dump completed on 2017-05-28 15:46:52
