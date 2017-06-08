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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `kid` varchar(9) NOT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `postal_cd` varchar(8) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `owner` varchar(45) DEFAULT NULL,
  `affliation` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `fax` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`kid`),
  UNIQUE KEY `kid_UNIQUE` (`kid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('KID00824','MMMサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID02907','RGPホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID05015','QUJホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID06320','NFGステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID06724','JFIサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID08385','KRVステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID09154','FHKサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID09563','XXG事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID10178','KSTホーム','0',NULL,NULL,NULL,NULL,NULL),('KID10552','RWI事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID12094','LGD事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID13032','UYUサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID14815','KEQ事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID14835','EFT事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID15852','IFHサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID16319','PMXホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID16879','JFZホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID16915','RLM事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID16930','HVWサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID18298','YBZステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID19837','JAOステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID20749','ZXN事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID21748','ATW事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID23214','OTMサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID24326','KFD事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID24500','JVAステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID25144','VCI事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID25897','JYZホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID28129','GBYホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID28748','KIVサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID29537','TUHサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID30141','OAAホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID31088','PUK事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID31971','DMYサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID35321','CBOホーム','0',NULL,NULL,NULL,NULL,NULL),('KID35925','VWDサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID36461','JLYホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID37133','DZYサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID37266','RCSステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID40357','NMNホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID40831','TGEホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID42357','YTWステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID45353','FQPホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID46502','CGXサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID48053','JRO事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID48263','LZEステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID48845','IYCステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID50444','YYYセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID52090','MIVサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID54041','ERPステーション','0',NULL,NULL,NULL,NULL,NULL),('KID54610','LPB事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID56303','XYOステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID56944','VINステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID57507','GBEステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID57740','QLHサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID57944','MCP事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID57984','LXYステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID60004','SLXホーム','0',NULL,NULL,NULL,NULL,NULL),('KID60414','YQL事業所','0',NULL,NULL,NULL,NULL,NULL),('KID60451','ZMMステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID62505','LQQサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID62816','KYYホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID63160','LWAサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID63177','VVDホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID64117','HMHホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID65172','CQXステーション','0',NULL,NULL,NULL,NULL,NULL),('KID66400','DFSサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID66863','TERサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID68661','VPKサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID69629','LEJホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID70680','HNOホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID71106','CNPホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID71644','JAHステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID71925','ZYUステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID71988','SKIホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID73153','FUGステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID74418','BYM事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID76430','PXWサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID76696','JXBステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID77160','ABPホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID77576','KAK事業所','0',NULL,NULL,NULL,NULL,NULL),('KID77891','PJN事業所','3122','大阪府豊中市3-4','大熊猫','営業部','03-6712-3212','080-1343-1343'),('KID79115','IMWステーション','0',NULL,NULL,NULL,NULL,NULL),('KID79548','VZBステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID80253','YZOステーション','0',NULL,NULL,NULL,NULL,NULL),('KID82466','RUN事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID82472','FXQサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID83014','BXG事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID83015',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('KID84785','ITJホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID85143','RFSホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID87386','AVN事業所','0',NULL,NULL,NULL,NULL,NULL),('KID87388','YHW事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID91369','SLPステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID92232','WEKサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID92468','YAQホーム改5','1234','豊中市','厚別','システムB',NULL,NULL),('KID93084','ZRT事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID94934','KQHサービスセンター',NULL,NULL,NULL,NULL,NULL,NULL),('KID95866','OXK事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID95975','SPUステーション',NULL,NULL,NULL,NULL,NULL,NULL),('KID97449','XYMホーム',NULL,NULL,NULL,NULL,NULL,NULL),('KID97450',NULL,'0',NULL,NULL,NULL,NULL,NULL),('KID98368','SVI事業所',NULL,NULL,NULL,NULL,NULL,NULL),('KID98369',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('KID98370','A訪問看護ステーション','12341111','東京都太田区北千束1-2-3','介護オーナー','介護情報部','090-333-3333','080-333-3333'),('KID98371',NULL,'0',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-09  7:47:48
