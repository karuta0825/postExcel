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
-- Table structure for table `mobiles`
--

DROP TABLE IF EXISTS `mobiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobiles` (
  `kid` varchar(9) NOT NULL,
  `base_id` int(1) NOT NULL AUTO_INCREMENT,
  `fenics_key` varchar(5) DEFAULT NULL,
  `client_number` int(4) DEFAULT '0',
  `admin_id` varchar(45) DEFAULT NULL,
  `admin_pw` varchar(45) DEFAULT NULL,
  `city_cd` varchar(45) DEFAULT NULL,
  `office_cd` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`base_id`),
  UNIQUE KEY `fenics_key_UNIQUE` (`fenics_key`),
  UNIQUE KEY `admin_id_UNIQUE` (`admin_id`),
  UNIQUE KEY `admin_pw_UNIQUE` (`admin_pw`),
  UNIQUE KEY `office_cd_UNIQUE` (`office_cd`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobiles`
--

LOCK TABLES `mobiles` WRITE;
/*!40000 ALTER TABLE `mobiles` DISABLE KEYS */;
INSERT INTO `mobiles` VALUES ('kid',16,'m4gfr',0,'m4gfr','m4gfr94',NULL,NULL),('KID00824',17,'m4vtv',0,'m4vtv','m4vtv57',NULL,NULL),('KID02907',18,'m4pye',0,'m4pye','m4pye13',NULL,NULL),('KID05015',19,'m4tsj',0,'m4tsj','m4tsj26',NULL,NULL),('KID06320',20,'m4fwa',0,'m4fwa','m4fwa12',NULL,NULL),('KID06724',21,'m4znr',0,'m4znr','m4znr79',NULL,NULL),('KID08385',22,'m4aar',5,'m4aar','m4aar64',NULL,NULL),('KID09154',23,'m4oig',0,'m4oig','m4oig40',NULL,NULL),('KID09563',24,'m4bpo',0,'m4bpo','m4bpo66',NULL,NULL),('KID10552',25,'m4iob',0,'m4iob','m4iob44',NULL,NULL),('KID12094',26,'m4snw',0,'m4snw','m4snw88',NULL,NULL),('KID13032',27,'m4tig',0,'m4tig','m4tig72',NULL,NULL),('KID14815',28,'m4wcw',0,'m4wcw','m4wcw61',NULL,NULL),('KID14835',29,'m4wrk',0,'m4wrk','m4wrk51',NULL,NULL),('KID15852',30,'m4xix',0,'m4xix','m4xix34',NULL,NULL),('KID16319',31,'m4yhz',0,'m4yhz','m4yhz24',NULL,NULL),('KID16879',32,'m4gfv',0,'m4gfv','m4gfv85',NULL,NULL),('KID16915',33,'m4msh',0,'m4msh','m4msh20',NULL,NULL),('KID16930',34,'m4ssa',0,'m4ssa','m4ssa15',NULL,NULL),('KID18298',35,'m4aww',0,'m4aww','m4aww04',NULL,NULL),('KID19837',36,'m4cpr',0,'m4cpr','m4cpr50',NULL,NULL),('KID20749',37,'m4hxp',0,'m4hxp','m4hxp66',NULL,NULL),('KID21748',38,'m4ihx',0,'m4ihx','m4ihx98',NULL,NULL),('KID23214',39,'m4ire',0,'m4ire','m4ire20',NULL,NULL),('KID24326',40,'m4frv',0,'m4frv','m4frv75',NULL,NULL),('KID24500',41,'m4rhv',0,'m4rhv','m4rhv55',NULL,NULL),('KID25144',42,'m4kaw',0,'m4kaw','m4kaw01',NULL,NULL),('KID25897',43,'m4mhf',0,'m4mhf','m4mhf07',NULL,NULL),('KID28129',44,'m4wiw',0,'m4wiw','m4wiw04',NULL,NULL),('KID28748',45,'m4dvz',0,'m4dvz','m4dvz76',NULL,NULL),('KID29537',46,'m4zcw',0,'m4zcw','m4zcw62',NULL,NULL),('KID30141',47,'m4rcj',0,'m4rcj','m4rcj97',NULL,NULL),('KID31088',48,'m4vrn',0,'m4vrn','m4vrn86',NULL,NULL),('KID31971',49,'m4dnf',0,'m4dnf','m4dnf80',NULL,NULL),('KID35321',50,'m4jgt',0,'m4jgt','m4jgt61',NULL,NULL),('KID35925',51,'m4wof',0,'m4wof','m4wof08',NULL,NULL),('KID36461',52,'m4cmt',0,'m4cmt','m4cmt40',NULL,NULL),('KID37133',53,'m4siv',0,'m4siv','m4siv07',NULL,NULL),('KID37266',54,'m4ogz',0,'m4ogz','m4ogz20',NULL,NULL),('KID40357',55,'m4vng',0,'m4vng','m4vng00',NULL,NULL),('KID40831',56,'m4byl',0,'m4byl','m4byl46',NULL,NULL),('KID42357',57,'m4kxz',0,'m4kxz','m4kxz18',NULL,NULL),('KID45353',58,'m4pkj',0,'m4pkj','m4pkj40',NULL,NULL),('KID46502',59,'m4wjl',0,'m4wjl','m4wjl10',NULL,NULL),('KID48053',60,'m4rjm',0,'m4rjm','m4rjm54',NULL,NULL),('KID48263',61,'m4zkw',0,'m4zkw','m4zkw62',NULL,NULL),('KID48845',62,'m4ish',0,'m4ish','m4ish05',NULL,NULL),('KID50444',63,'m4wog',0,'m4wog','m4wog56',NULL,NULL),('KID52090',64,'m4xvs',0,'m4xvs','m4xvs38',NULL,NULL),('KID54041',65,'m4obo',0,'m4obo','m4obo78',NULL,NULL),('KID54610',66,'m4wbh',0,'m4wbh','m4wbh50',NULL,NULL),('KID56303',67,'m4bga',0,'m4bga','m4bga16',NULL,NULL),('KID56944',68,'m4kva',0,'m4kva','m4kva95',NULL,NULL),('KID57507',69,'m4his',0,'m4his','m4his58',NULL,NULL),('KID57740',70,'m4bdy',0,'m4bdy','m4bdy44',NULL,NULL),('KID57944',71,'m4moj',0,'m4moj','m4moj65',NULL,NULL),('KID57984',72,'m4xie',0,'m4xie','m4xie26',NULL,NULL),('KID60004',73,'m4rhg',0,'m4rhg','m4rhg22',NULL,NULL),('KID60414',74,'m4aod',0,'m4aod','m4aod45',NULL,NULL),('KID60451',75,'m4aws',0,'m4aws','m4aws43',NULL,NULL),('KID62505',76,'m4jzb',0,'m4jzb','m4jzb40',NULL,NULL),('KID62816',77,'m4rcr',0,'m4rcr','m4rcr76',NULL,NULL),('KID63160',78,'m4vtf',0,'m4vtf','m4vtf31',NULL,NULL),('KID63177',79,'m4wdf',0,'m4wdf','m4wdf09',NULL,NULL),('KID64117',80,'m4afa',0,'m4afa','m4afa34',NULL,NULL),('KID65172',81,'m4iho',0,'m4iho','m4iho68',NULL,NULL),('KID66400',82,'m4cxg',0,'m4cxg','m4cxg31',NULL,NULL),('KID66863',83,'m4ivi',0,'m4ivi','m4ivi95',NULL,NULL),('KID68661',84,'m4haw',0,'m4haw','m4haw55',NULL,NULL),('KID69629',85,'m4bbf',0,'m4bbf','m4bbf10',NULL,NULL),('KID70680',86,'m4mrt',0,'m4mrt','m4mrt66',NULL,NULL),('KID71106',87,'m4soo',0,'m4soo','m4soo49',NULL,NULL),('KID71644',88,'m4iiy',0,'m4iiy','m4iiy34',NULL,NULL),('KID71925',89,'m4jgr',0,'m4jgr','m4jgr22',NULL,NULL),('KID71988',90,'m4rri',0,'m4rri','m4rri99',NULL,NULL),('KID73153',91,'m4oen',0,'m4oen','m4oen05',NULL,NULL),('KID74418',92,'m4yzj',0,'m4yzj','m4yzj17',NULL,NULL),('KID76430',93,'m4nlj',0,'m4nlj','m4nlj12',NULL,NULL),('KID76696',94,'m4ifr',0,'m4ifr','m4ifr02',NULL,NULL),('KID77160',95,'m4frk',0,'m4frk','m4frk88',NULL,NULL),('KID77576',96,'m4ytr',1,'m4ytr','m4ytr14',NULL,NULL),('KID77891',97,'m4elb',0,'m4elb','m4elb38',NULL,NULL),('KID79115',98,'m4jbd',0,'m4jbd','m4jbd04',NULL,NULL),('KID79548',99,'m4wks',0,'m4wks','m4wks47',NULL,NULL),('KID80253',100,'m4for',0,'m4for','m4for69',NULL,NULL),('KID82466',101,'m4akz',0,'m4akz','m4akz25',NULL,NULL),('KID82472',102,'m4ctv',0,'m4ctv','m4ctv75',NULL,NULL),('KID83014',103,'m4maw',100,'m4maw','m4maw63',NULL,NULL),('KID83015',104,'m4xyv',0,'m4xyv','m4xyv74',NULL,NULL),('KID84785',105,'m4fbw',0,'m4fbw','m4fbw02',NULL,NULL),('KID85143',106,'m4ccy',0,'m4ccy','m4ccy58',NULL,NULL),('KID87386',107,'m4dcv',0,'m4dcv','m4dcv37',NULL,NULL),('KID87388',108,'m4ote',0,'m4ote','m4ote11',NULL,NULL),('KID91369',109,'m4erp',0,'m4erp','m4erp17',NULL,NULL),('KID92232',110,'m4whn',0,'m4whn','m4whn37',NULL,NULL),('KID92468',111,'m4yfr',0,'m4yfr','m4yfr64',NULL,NULL),('KID93084',112,'m4wnk',0,'m4wnk','m4wnk93',NULL,NULL),('KID94934',113,'m4xxh',0,'m4xxh','m4xxh75',NULL,NULL),('KID95975',114,'m4ook',0,'m4ook','m4ook21',NULL,NULL),('KID97449',115,'m4ejr',0,'m4ejr','m4ejr69',NULL,NULL),('KID97450',116,'m4nwm',0,'m4nwm','m4nwm54',NULL,NULL),('KID98368',117,'m4kcw',0,'m4kcw','m4kcw12',NULL,NULL),('KID98369',118,'m4rgj',0,'m4rgj','m4rgj09',NULL,NULL),('KID98370',119,'m4bjb',0,'m4bjb','m4bjb22',NULL,NULL),('KID98371',120,'m4thc',0,'m4thc','m4thc53',NULL,NULL),('KID98372',121,'m4owp',0,'m4owp','m4owp03',NULL,NULL),('KID98373',122,'m4gby',0,'m4gby','m4gby95',NULL,NULL),('KID98374',123,'m4btv',0,'m4btv','m4btv09',NULL,NULL),('KID08385',124,'m4rgz',5,'m4rgz','m4rgz36',NULL,NULL),('KID88888',125,'m4slg',0,'m4slg','m4slg19',NULL,NULL),('KID88888',126,'m4wwo',0,'m4wwo','m4wwo03',NULL,NULL),('KID88888',127,'m4ahf',0,'m4ahf','m4ahf67',NULL,NULL),('KID98375',128,'m4dss',0,'m4dss','m4dss50',NULL,NULL),('KID98376',129,'m4yaw',0,'m4yaw','m4yaw74',NULL,NULL),('KID98377',130,'m8agr',5,'m8agr','m8agr47',NULL,NULL);
/*!40000 ALTER TABLE `mobiles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-16 19:23:07
