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
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `kid` varchar(9) NOT NULL,
  `client_id` varchar(10) NOT NULL,
  `client_pass` varchar(10) DEFAULT NULL,
  `create_on` datetime DEFAULT NULL,
  `create_user_id` int(3) DEFAULT NULL,
  `fenics_id` varchar(10) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  UNIQUE KEY `clientid_UNIQUE` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES ('KID77160','ABPBN0001','ABPBN0001','2016-11-09 23:41:44',NULL,NULL,0),('KID77160','ABPBN0002','ABPBN0002','2016-10-09 23:43:15',NULL,NULL,0),('KID77160','ABPBN0003','ABPBN0003','2017-05-21 20:22:07',1,NULL,0),('KID77160','ABPBN1999','ABPBN1999','2016-10-09 23:42:10',NULL,NULL,1),('KID21748','ATWGU0001','ATWGU0001','2016-10-09 23:41:44',NULL,NULL,0),('KID21748','ATWGU0002','ATWGU0002','2016-10-09 23:43:16',NULL,NULL,0),('KID21748','ATWGU1999','ATWGU1999','2016-10-09 23:42:10',NULL,NULL,1),('KID87386','AVNQR0001','AVNQR0001','2016-10-09 23:41:46',NULL,NULL,0),('KID87386','AVNQR0002','AVNQR0002','2017-06-03 22:24:47',1,NULL,0),('KID87386','AVNQR0003','AVNQR0003','2017-06-03 22:25:17',1,NULL,0),('KID87386','AVNQR0004','AVNQR0004','2017-06-03 22:25:17',1,NULL,0),('KID87386','AVNQR0005','AVNQR0005','2017-06-03 22:25:17',1,NULL,0),('KID87386','AVNQR0006','AVNQR0006','2017-06-03 22:25:17',1,NULL,0),('KID87386','AVNQR1999','AVNQR1999','2016-10-09 23:42:11',NULL,NULL,1),('KID83014','BXGNQ0001','BXGNQ0001','2016-10-09 23:41:43',NULL,NULL,0),('KID83014','BXGNQ0002','BXGNQ0002','2016-10-09 23:43:15',NULL,NULL,0),('KID83014','BXGNQ0003','BXGNQ0003','2016-10-09 23:44:25',NULL,NULL,0),('KID83014','BXGNQ1999','BXGNQ1999','2016-10-09 23:42:09',NULL,NULL,1),('KID74418','BYMUS0001','BYMUS0001','2016-10-09 23:41:44',NULL,NULL,0),('KID74418','BYMUS0002','BYMUS0002','2016-10-09 23:43:15',NULL,NULL,0),('KID74418','BYMUS1999','BYMUS1999','2016-10-09 23:42:10',NULL,NULL,1),('KID35321','CBOVD0001','CBOVD0001','2016-10-09 23:41:43',NULL,'cbo0001',0),('KID35321','CBOVD0002','CBOVD0002','2016-10-09 23:43:15',NULL,'cbo0002',0),('KID35321','CBOVD0003','CBOVD0003','2017-06-04 12:54:12',1,'cbo0003',0),('KID35321','CBOVD1999','CBOVD1999','2016-10-09 23:42:09',NULL,NULL,1),('KID46502','CGXXV0001','CGXXV0001','2016-10-09 23:41:46',NULL,NULL,0),('KID46502','CGXXV1999','CGXXV1999','2016-10-09 23:42:11',NULL,NULL,1),('KID97450','CJHKCO0999','CJHKCO0999','2017-05-21 21:34:31',2,NULL,1),('KID97450','CJHKCO1999','CJHKCO1999','2017-05-21 21:34:31',2,NULL,1),('KID71106','CNPJH0001','CNPJH0001','2016-10-09 23:41:45',NULL,NULL,0),('KID71106','CNPJH0002','CNPJH0002','2016-10-09 23:43:16',NULL,NULL,0),('KID71106','CNPJH0003','CNPJH0003','2017-05-09 19:57:54',1,NULL,0),('KID71106','CNPJH1999','CNPJH1999','2016-10-09 23:42:11',NULL,NULL,1),('KID65172','CQXOT0001','CQXOT0001','2016-10-09 23:41:46',NULL,NULL,0),('KID65172','CQXOT1999','CQXOT1999','2016-10-09 23:42:12',NULL,NULL,1),('KID66400','DFSUD0001','DFSUD0001','2016-10-09 23:41:44',NULL,NULL,0),('KID66400','DFSUD1999','DFSUD1999','2016-10-09 23:42:10',NULL,NULL,1),('KID98371','DHQRBY0001','DHQRBY0001','2017-05-25 07:59:06',1,NULL,0),('KID98371','DHQRBY0002','DHQRBY0002','2017-05-25 07:59:06',1,NULL,0),('KID98371','DHQRBY0999','DHQRBY0999','2017-05-25 07:45:06',1,NULL,1),('KID98371','DHQRBY1999','DHQRBY1999','2017-05-25 07:45:06',1,NULL,1),('KID31971','DMYVC0001','DMYVC0001','2016-10-09 23:41:46',NULL,NULL,0),('KID31971','DMYVC1999','DMYVC1999','2016-10-09 23:42:12',NULL,NULL,1),('KID37133','DZYIN0001','DZYIN0001','2016-10-09 23:41:46',NULL,NULL,0),('KID37133','DZYIN1999','DZYIN1999','2016-10-09 23:42:12',NULL,NULL,1),('KID14835','EFTVU0001','EFTVU0001','2016-10-09 23:41:46',NULL,NULL,0),('KID14835','EFTVU1999','EFTVU1999','2016-10-09 23:42:12',NULL,NULL,1),('KID54041','ERPTF0001','ERPTF0001','2016-10-09 23:41:44',NULL,NULL,0),('KID54041','ERPTF0002','ERPTF0002','2016-10-09 23:43:15',NULL,NULL,0),('KID54041','ERPTF0003','ERPTF0003','2017-05-09 20:04:07',1,NULL,0),('KID54041','ERPTF1999','ERPTF1999','2016-10-09 23:42:10',NULL,NULL,1),('KID09154','FHKUE0001','FHKUE0001','2016-10-09 23:41:43',NULL,NULL,0),('KID09154','FHKUE0002','FHKUE0002','2016-10-09 23:43:15',NULL,NULL,0),('KID09154','FHKUE1999','FHKUE1999','2016-10-09 23:42:10',NULL,NULL,1),('KID45353','FQPKI0001','FQPKI0001','2016-10-09 23:41:46',NULL,NULL,0),('KID45353','FQPKI1999','FQPKI1999','2016-10-09 23:42:12',NULL,NULL,1),('KID73153','FUGNG0001','FUGNG0001','2016-10-09 23:41:45',NULL,NULL,0),('KID73153','FUGNG0002','FUGNG0002','2016-10-09 23:43:16',NULL,NULL,0),('KID73153','FUGNG1999','FUGNG1999','2016-10-09 23:42:11',NULL,NULL,1),('KID82472','FXQDO0001','FXQDO0001','2016-10-09 23:41:46',NULL,NULL,0),('KID82472','FXQDO1999','FXQDO1999','2016-10-09 23:42:12',NULL,NULL,1),('KID57507','GBEQD0001','GBEQD0001','2016-10-09 23:41:43',NULL,NULL,0),('KID57507','GBEQD0002','GBEQD0002','2016-10-09 23:43:15',NULL,NULL,0),('KID57507','GBEQD1999','GBEQD1999','2016-10-09 23:42:09',NULL,NULL,1),('KID28129','GBYYE0001','GBYYE0001','2016-10-09 23:41:46',NULL,NULL,0),('KID28129','GBYYE1999','GBYYE1999','2016-10-09 23:42:12',NULL,NULL,1),('KID64117','HMHPH0001','HMHPH0001','2016-10-09 23:41:46',NULL,NULL,0),('KID64117','HMHPH1999','HMHPH1999','2016-10-09 23:42:12',NULL,NULL,1),('KID70680','HNOJW0001','HNOJW0001','2016-10-09 23:41:47',NULL,NULL,0),('KID70680','HNOJW1999','HNOJW1999','2016-10-09 23:42:12',NULL,NULL,1),('KID16930','HVWVZ0001','HVWVZ0001','2016-10-09 23:41:44',NULL,NULL,0),('KID16930','HVWVZ0002','HVWVZ0002','2016-10-09 23:43:15',NULL,NULL,0),('KID16930','HVWVZ1999','HVWVZ1999','2016-10-09 23:42:10',NULL,NULL,1),('KID15852','IFHOI0001','IFHOI0001','2016-10-09 23:41:46',NULL,NULL,0),('KID15852','IFHOI1999','IFHOI1999','2016-10-09 23:42:11',NULL,NULL,1),('KID79115','IMWNJ0001','IMWNJ0001','2016-10-09 23:41:44',NULL,NULL,0),('KID79115','IMWNJ0002','IMWNJ0002','2017-06-03 22:33:15',1,NULL,0),('KID79115','IMWNJ0003','IMWNJ0003','2017-06-03 22:33:15',1,NULL,0),('KID79115','IMWNJ0004','IMWNJ0004','2017-06-03 22:33:15',1,NULL,0),('KID79115','IMWNJ0005','IMWNJ0005','2017-06-03 22:33:15',1,NULL,0),('KID79115','IMWNJ1999','IMWNJ1999','2016-10-09 23:42:10',NULL,NULL,1),('KID84785','itj0001','itj0001','2016-10-09 23:41:18',NULL,NULL,0),('KID84785','itj0002','itj0002','2016-09-25 21:44:53',NULL,NULL,0),('KID84785','itj01999','itj01999','2016-09-25 22:24:45',NULL,NULL,1),('KID84785','ITJZY0001','ITJZY0001','2016-10-09 23:41:45',NULL,NULL,0),('KID84785','ITJZY1999','ITJZY1999','2016-10-09 23:42:11',NULL,NULL,1),('KID48845','IYCUT0001','IYCUT0001','2016-10-09 23:41:46',NULL,NULL,0),('KID48845','IYCUT1999','IYCUT1999','2016-10-09 23:42:11',NULL,NULL,1),('KID71644','JAHGD0001','JAHGD0001','2016-10-09 23:41:44',NULL,NULL,0),('KID71644','JAHGD1999','JAHGD1999','2016-10-09 23:42:10',NULL,NULL,1),('KID19837','JAOAN0001','JAOAN0001','2016-10-09 23:41:43',NULL,NULL,0),('KID19837','JAOAN1999','JAOAN1999','2016-10-09 23:42:10',NULL,NULL,1),('KID06724','JFIQC0001','JFIQC0001','2016-10-09 23:41:46',NULL,NULL,0),('KID06724','JFIQC1999','JFIQC1999','2016-10-09 23:42:12',NULL,NULL,1),('KID16879','JFZJH0001','JFZJH0001','2016-10-09 23:41:44',NULL,NULL,0),('KID16879','JFZJH0002','JFZJH0002','2016-10-09 23:43:15',NULL,NULL,0),('KID16879','JFZJH1999','JFZJH1999','2016-10-09 23:42:10',NULL,NULL,1),('KID36461','JLYOL0001','JLYOL0001','2016-10-09 23:41:45',NULL,NULL,0),('KID36461','JLYOL0002','JLYOL0002','2016-10-09 23:43:16',NULL,NULL,0),('KID36461','JLYOL1999','JLYOL1999','2016-10-09 23:42:11',NULL,NULL,1),('KID48053','JROKE0001','JROKE0001','2016-10-09 23:41:45',NULL,NULL,0),('KID48053','JROKE0002','JROKE0002','2016-10-09 23:43:16',NULL,NULL,0),('KID48053','JROKE1999','JROKE1999','2016-10-09 23:42:10',NULL,NULL,1),('KID24500','JVADI0001','JVADI0001','2016-10-09 23:41:45',NULL,NULL,0),('KID24500','JVADI0002','JVADI0002','2016-10-09 23:43:16',NULL,NULL,0),('KID24500','JVADI1999','JVADI1999','2016-10-09 23:42:11',NULL,NULL,1),('KID76696','JXBZI0001','JXBZI0001','2016-10-09 23:41:45',NULL,NULL,0),('KID76696','JXBZI0002','JXBZI0002','2016-10-09 23:43:16',NULL,NULL,0),('KID76696','JXBZI1999','JXBZI1999','2016-10-09 23:42:11',NULL,NULL,1),('KID25897','JYZVJ0001','JYZVJ0001','2016-10-09 23:41:45',NULL,NULL,0),('KID25897','JYZVJ0002','JYZVJ0002','2016-10-09 23:43:16',NULL,NULL,0),('KID25897','JYZVJ1999','JYZVJ1999','2016-10-09 23:42:11',NULL,NULL,1),('KID77576','KAKCD0001','KAKCD0001','2016-10-09 23:41:42',NULL,NULL,0),('KID77576','KAKCD0002','KAKCD0002','2016-10-09 23:43:15',NULL,NULL,0),('KID77576','KAKCD0003','KAKCD0003','2016-10-09 23:44:25',NULL,NULL,0),('KID77576','KAKCD0004','KAKCD0004','2017-06-04 12:53:41',1,NULL,0),('KID77576','KAKCD1999','KAKCD1999','2016-10-09 23:42:09',NULL,NULL,1),('KID14815','KEQKU0001','KEQKU0001','2016-10-09 23:41:46',NULL,NULL,0),('KID14815','KEQKU1999','KEQKU1999','2016-10-09 23:42:11',NULL,NULL,1),('KID24326','KFDMX0001','KFDMX0001','2016-10-09 23:41:45',NULL,NULL,0),('KID24326','KFDMX0002','KFDMX0002','2016-10-09 23:43:16',NULL,NULL,0),('KID24326','KFDMX1999','KFDMX1999','2016-10-09 23:42:10',NULL,NULL,1),('KID28748','KIVVP0001','KIVVP0001','2016-10-09 23:41:45',NULL,NULL,0),('KID28748','KIVVP0002','KIVVP0002','2016-10-09 23:43:16',NULL,NULL,0),('KID28748','KIVVP1999','KIVVP1999','2016-10-09 23:42:10',NULL,NULL,1),('KID94934','KQHCQ0001','KQHCQ0001','2016-10-09 23:41:45',NULL,NULL,0),('KID94934','KQHCQ0002','KQHCQ0002','2016-10-09 23:43:16',NULL,NULL,0),('KID94934','KQHCQ1999','KQHCQ1999','2016-10-09 23:42:11',NULL,NULL,1),('KID08385','KRVQH0001','KRVQH0001','2016-10-09 23:41:43',NULL,NULL,0),('KID08385','KRVQH0002','KRVQH0002','2016-10-09 23:43:15',NULL,NULL,0),('KID08385','KRVQH1999','KRVQH1999','2016-10-09 23:42:09',NULL,NULL,1),('KID62816','KYYBW0001','KYYBW0001','2016-10-09 23:41:45',NULL,NULL,0),('KID62816','KYYBW0002','KYYBW0002','2016-10-09 23:43:16',NULL,NULL,0),('KID62816','KYYBW1999','KYYBW1999','2016-10-09 23:42:11',NULL,NULL,1),('KID69629','LEJHA0001','LEJHA0001','2016-10-09 23:41:44',NULL,NULL,0),('KID69629','LEJHA1999','LEJHA1999','2016-10-09 23:42:10',NULL,NULL,1),('KID12094','LGDIY0001','LGDIY0001','2016-10-09 23:41:47',NULL,NULL,0),('KID12094','LGDIY0002','LGDIY0002','2016-10-09 23:43:16',NULL,NULL,0),('KID12094','LGDIY0003','LGDIY0003','2016-10-09 23:44:25',NULL,NULL,0),('KID12094','LGDIY1999','LGDIY1999','2016-10-09 23:42:13',NULL,NULL,1),('KID54610','LPBHE0001','LPBHE0001','2016-10-09 23:41:44',NULL,NULL,0),('KID54610','LPBHE1999','LPBHE1999','2016-10-09 23:42:10',NULL,NULL,1),('KID62505','LQQJX0001','LQQJX0001','2016-10-09 23:41:43',NULL,NULL,0),('KID62505','LQQJX0002','LQQJX0002','2016-10-09 23:43:15',NULL,NULL,0),('KID62505','LQQJX1999','LQQJX1999','2016-10-09 23:42:09',NULL,NULL,1),('KID63160','LWAPO0001','LWAPO0001','2016-10-09 23:41:46',NULL,NULL,0),('KID63160','LWAPO1999','LWAPO1999','2016-10-09 23:42:11',NULL,NULL,1),('KID57984','LXYFY0001','LXYFY0001','2016-10-09 23:41:45',NULL,NULL,0),('KID57984','LXYFY1999','LXYFY1999','2016-10-09 23:42:11',NULL,NULL,1),('KID48263','LZEQJ0001','LZEQJ0001','2016-10-09 23:41:44',NULL,NULL,0),('KID48263','LZEQJ1999','LZEQJ1999','2016-10-09 23:42:10',NULL,NULL,1),('KID57944','MCPVZ0001','MCPVZ0001','2016-10-09 23:41:45',NULL,NULL,0),('KID57944','MCPVZ0002','MCPVZ0002','2016-10-09 23:43:16',NULL,NULL,0),('KID57944','MCPVZ1999','MCPVZ1999','2016-10-09 23:42:11',NULL,NULL,1),('KID52090','MIVZR0001','MIVZR0001','2016-10-09 23:41:45',NULL,NULL,0),('KID52090','MIVZR1999','MIVZR1999','2016-10-09 23:42:11',NULL,NULL,1),('KID00824','MMMRG0001','MMMRG0001','2016-10-09 23:41:47',NULL,NULL,0),('KID00824','MMMRG1999','MMMRG1999','2016-10-09 23:42:12',NULL,NULL,1),('KID06320','NFGGL0001','NFGGL0001','2016-10-09 23:41:43',NULL,NULL,0),('KID06320','NFGGL0002','NFGGL0002','2016-10-09 23:43:15',NULL,NULL,0),('KID06320','NFGGL0003','NFGGL0003','2016-10-09 23:44:25',NULL,NULL,0),('KID06320','NFGGL1999','NFGGL1999','2016-10-09 23:42:09',NULL,NULL,1),('KID40357','NMNML0001','NMNML0001','2016-10-09 23:41:46',NULL,NULL,0),('KID40357','NMNML1999','NMNML1999','2016-10-09 23:42:12',NULL,NULL,1),('KID30141','OAAOW0001','OAAOW0001','2016-10-09 23:41:47',NULL,NULL,0),('KID30141','OAAOW1999','OAAOW1999','2016-10-09 23:42:12',NULL,NULL,1),('KID23214','OTMHT0001','OTMHT0001','2016-10-09 23:41:45',NULL,NULL,0),('KID23214','OTMHT1999','OTMHT1999','2016-10-09 23:42:11',NULL,NULL,1),('KID95866','OXKZO0001','OXKZO0001','2016-10-09 23:41:42',NULL,NULL,0),('KID95866','OXKZO0002','OXKZO0002','2016-10-09 23:43:14',NULL,NULL,0),('KID95866','OXKZO0003','OXKZO0003','2016-10-09 23:44:25',NULL,NULL,0),('KID95866','OXKZO1999','OXKZO1999','2016-10-09 23:42:09',NULL,NULL,1),('KID77891','PJNPN0001','PJNPN0001','2016-10-09 23:41:42',NULL,NULL,0),('KID77891','PJNPN0002','PJNPN0002','2016-10-09 23:43:14',NULL,NULL,0),('KID77891','PJNPN0003','PJNPN0003','2016-10-09 23:44:24',NULL,NULL,0),('KID77891','PJNPN1999','PJNPN1999','2016-10-09 23:42:09',NULL,NULL,1),('KID16319','PMXOE0001','PMXOE0001','2016-10-09 23:41:45',NULL,NULL,0),('KID16319','PMXOE1999','PMXOE1999','2016-10-09 23:42:11',NULL,NULL,1),('KID31088','PUKHU0001','PUKHU0001','2016-10-09 23:41:46',NULL,NULL,0),('KID31088','PUKHU1999','PUKHU1999','2016-10-09 23:42:12',NULL,NULL,1),('KID76430','PXWSF0001','PXWSF0001','2016-10-09 23:41:45',NULL,NULL,0),('KID76430','PXWSF0002','PXWSF0002','2016-10-09 23:43:16',NULL,NULL,0),('KID76430','PXWSF0003','PXWSF0003','2016-10-09 23:44:25',NULL,NULL,0),('KID76430','PXWSF1999','PXWSF1999','2016-10-09 23:42:11',NULL,NULL,1),('KID57740','QLHZF0001','QLHZF0001','2016-10-09 23:41:45',NULL,NULL,0),('KID57740','QLHZF0002','QLHZF0002','2016-10-09 23:43:16',NULL,NULL,0),('KID57740','QLHZF1999','QLHZF1999','2016-10-09 23:42:11',NULL,NULL,1),('KID05015','QUJVK0001','QUJVK0001','2016-10-09 23:41:43',NULL,NULL,0),('KID05015','QUJVK1999','QUJVK1999','2016-10-09 23:42:10',NULL,NULL,1),('KID83015','QYAHRK0999','QYAHRK0999','2017-05-30 07:29:40',1,NULL,1),('KID83015','QYAHRK1999','QYAHRK1999','2017-05-30 07:29:40',1,NULL,1),('KID37266','RCSID0001','RCSID0001','2016-10-09 23:41:47',NULL,NULL,0),('KID37266','RCSID0002','RCSID0002','2016-10-09 23:43:17',NULL,NULL,0),('KID37266','RCSID0003','RCSID0003','2016-10-09 23:44:25',NULL,NULL,0),('KID37266','RCSID1999','RCSID1999','2016-10-09 23:42:13',NULL,NULL,1),('KID85143','RFSHM0001','RFSHM0001','2016-10-09 23:41:44',NULL,NULL,0),('KID85143','RFSHM0002','RFSHM0002','2016-10-09 23:43:15',NULL,NULL,0),('KID85143','RFSHM1999','RFSHM1999','2016-10-09 23:42:10',NULL,NULL,1),('KID02907','RGPPS0001','RGPPS0001','2016-10-09 23:41:43',NULL,NULL,0),('KID02907','RGPPS0002','RGPPS0002','2016-10-09 23:43:15',NULL,NULL,0),('KID02907','RGPPS1999','RGPPS1999','2016-10-09 23:42:09',NULL,NULL,1),('KID16915','RLMGZ0001','RLMGZ0001','2016-10-09 23:41:45',NULL,NULL,0),('KID16915','RLMGZ0002','RLMGZ0002','2016-10-09 23:43:16',NULL,NULL,0),('KID16915','RLMGZ1999','RLMGZ1999','2016-10-09 23:42:10',NULL,NULL,1),('KID82466','RUNSB0001','RUNSB0001','2016-10-09 23:41:47',NULL,NULL,0),('KID82466','RUNSB0002','RUNSB0002','2016-10-09 23:43:17',NULL,NULL,0),('KID82466','RUNSB0003','RUNSB0003','2016-10-09 23:44:25',NULL,NULL,0),('KID82466','RUNSB1999','RUNSB1999','2016-10-09 23:42:13',NULL,NULL,1),('KID10552','RWIOH0001','RWIOH0001','2016-10-09 23:41:44',NULL,NULL,0),('KID10552','RWIOH0002','RWIOH0002','2016-10-09 23:43:15',NULL,NULL,0),('KID10552','RWIOH1999','RWIOH1999','2016-10-09 23:42:10',NULL,NULL,1),('KID71988','SKIZO0001','SKIZO0001','2016-10-09 23:41:46',NULL,NULL,0),('KID71988','SKIZO1999','SKIZO1999','2016-10-09 23:42:12',NULL,NULL,1),('KID91369','SLPHY0001','SLPHY0001','2016-10-09 23:41:46',NULL,NULL,0),('KID91369','SLPHY1999','SLPHY1999','2016-10-09 23:42:12',NULL,NULL,1),('KID60004','SLXXO0001','SLXXO0001','2016-10-09 23:41:44',NULL,'slx0001',0),('KID60004','SLXXO0002','SLXXO0002','2017-06-03 22:22:36',1,'slx0002',0),('KID60004','SLXXO0003','SLXXO0003','2017-06-03 22:22:36',1,'slx0003',0),('KID60004','SLXXO0004','SLXXO0004','2017-06-03 22:22:36',1,'slx0004',0),('KID60004','SLXXO1999','SLXXO1999','2016-10-09 23:42:10',NULL,'slx0005',1),('KID95975','SPUXI0001','SPUXI0001','2016-10-09 23:41:44',NULL,NULL,0),('KID95975','SPUXI0002','SPUXI0002','2016-10-09 23:43:16',NULL,NULL,0),('KID95975','SPUXI1999','SPUXI1999','2016-10-09 23:42:10',NULL,NULL,1),('KID98368','SVIHT0001','SVIHT0001','2016-10-09 23:41:47',NULL,NULL,0),('KID98368','SVIHT1999','SVIHT1999','2016-10-09 23:42:13',NULL,NULL,1),('KID66863','TERCF0001','TERCF0001','2016-10-09 23:41:47',NULL,NULL,0),('KID66863','TERCF1999','TERCF1999','2016-10-09 23:42:12',NULL,NULL,1),('KID40831','TGEOP0001','TGEOP0001','2016-10-09 23:41:46',NULL,NULL,0),('KID40831','TGEOP1999','TGEOP1999','2016-10-09 23:42:12',NULL,NULL,1),('KID29537','TUHDM0001','TUHDM0001','2016-10-09 23:41:43',NULL,NULL,0),('KID29537','TUHDM0002','TUHDM0002','2016-10-09 23:43:15',NULL,NULL,0),('KID29537','TUHDM1999','TUHDM1999','2016-10-09 23:42:09',NULL,NULL,1),('KID13032','UYUXB0001','UYUXB0001','2016-10-09 23:41:45',NULL,NULL,0),('KID13032','UYUXB1999','UYUXB1999','2016-10-09 23:42:11',NULL,NULL,1),('KID25144','VCILY0001','VCILY0001','2016-10-09 23:41:46',NULL,NULL,0),('KID25144','VCILY1999','VCILY1999','2016-10-09 23:42:11',NULL,NULL,1),('KID56944','VINJH0001','VINJH0001','2016-10-09 23:41:46',NULL,NULL,0),('KID56944','VINJH1999','VINJH1999','2016-10-09 23:42:12',NULL,NULL,1),('KID68661','VPKMJ0001','VPKMJ0001','2016-10-09 23:41:46',NULL,NULL,0),('KID68661','VPKMJ1999','VPKMJ1999','2016-10-09 23:42:12',NULL,NULL,1),('KID63177','VVDIL0001','VVDIL0001','2016-10-09 23:41:47',NULL,NULL,0),('KID63177','VVDIL1999','VVDIL1999','2016-10-09 23:42:12',NULL,NULL,1),('KID35925','VWDVC0001','VWDVC0001','2016-10-09 23:41:45',NULL,NULL,0),('KID35925','VWDVC0002','VWDVC0002','2016-10-09 23:43:16',NULL,NULL,0),('KID35925','VWDVC0003','VWDVC0003','2016-10-09 23:44:25',NULL,NULL,0),('KID35925','VWDVC1999','VWDVC1999','2016-10-09 23:42:11',NULL,NULL,1),('KID79548','VZBCM0001','VZBCM0001','2016-10-09 23:41:47',NULL,NULL,0),('KID79548','VZBCM0002','VZBCM0002','2016-10-09 23:43:17',NULL,NULL,0),('KID79548','VZBCM0003','VZBCM0003','2016-10-09 23:44:25',NULL,NULL,0),('KID79548','VZBCM1999','VZBCM1999','2016-10-09 23:42:13',NULL,NULL,1),('KID92232','WEKEB0001','WEKEB0001','2016-10-09 23:41:46',NULL,NULL,0),('KID92232','WEKEB1999','WEKEB1999','2016-10-09 23:42:12',NULL,NULL,1),('KID09563','XXGWP0001','XXGWP0001','2016-10-09 23:41:46',NULL,NULL,0),('KID09563','XXGWP1999','XXGWP1999','2016-10-09 23:42:12',NULL,NULL,1),('KID97449','XYMMS0001','XYMMS0001','2016-10-09 23:41:45',NULL,NULL,0),('KID97449','XYMMS0002','XYMMS0002','2016-10-09 23:43:16',NULL,NULL,0),('KID97449','XYMMS0003','XYMMS0003','2016-10-09 23:44:25',NULL,NULL,0),('KID97449','XYMMS1999','XYMMS1999','2016-10-09 23:42:11',NULL,NULL,1),('KID56303','XYOUJ0001','XYOUJ0001','2016-10-09 23:41:43',NULL,NULL,0),('KID56303','XYOUJ0002','XYOUJ0002','2016-10-09 23:43:15',NULL,NULL,0),('KID56303','XYOUJ0003','XYOUJ0003','2016-10-09 23:44:25',NULL,NULL,0),('KID56303','XYOUJ1999','XYOUJ1999','2016-10-09 23:42:09',NULL,NULL,1),('KID92468','YAQDF0001','YAQDF0001','2016-10-09 23:41:42',NULL,'yaq0001',0),('KID92468','YAQDF0002','YAQDF0002','2016-10-09 23:43:14',NULL,'yaq0002',0),('KID92468','YAQDF0003','YAQDF0003','2017-05-19 22:19:21',1,'yaq0003',0),('KID92468','YAQDF0004','YAQDF0004','2017-05-21 20:36:49',2,'yaq0004',0),('KID92468','YAQDF0005','YAQDF0005','2017-05-21 20:52:12',2,'yaq0005',0),('KID92468','YAQDF0006','YAQDF0006','2017-05-21 20:52:12',2,'yaq0006',0),('KID92468','YAQDF0007','YAQDF0007','2017-05-21 20:52:36',2,NULL,0),('KID92468','YAQDF0008','YAQDF0008','2017-05-31 21:11:13',1,NULL,0),('KID92468','YAQDF0009','YAQDF0009','2017-06-03 20:23:47',1,'yaq0009',0),('KID92468','YAQDF0010','YAQDF0010','2017-06-04 12:52:56',1,NULL,0),('KID92468','YAQDF1999','YAQDF1999','2016-10-09 23:42:09',NULL,NULL,1),('KID18298','YBZXG0001','YBZXG0001','2016-10-09 23:41:45',NULL,NULL,0),('KID18298','YBZXG0002','YBZXG0002','2016-10-09 23:43:16',NULL,NULL,0),('KID18298','YBZXG0003','YBZXG0003','2016-10-09 23:44:25',NULL,NULL,0),('KID18298','YBZXG1999','YBZXG1999','2016-10-09 23:42:10',NULL,NULL,1),('KID87388','YHWWZ0001','YHWWZ0001','2016-10-09 23:41:43',NULL,NULL,0),('KID87388','YHWWZ0002','YHWWZ0002','2016-10-09 23:43:15',NULL,NULL,0),('KID87388','YHWWZ1999','YHWWZ1999','2016-10-09 23:42:09',NULL,NULL,1),('KID98370','YLTXPD0999','YLTXPD0999','2017-05-14 21:34:26',1,NULL,1),('KID98370','YLTXPD1999','YLTXPD1999','2017-05-14 21:34:26',1,NULL,1),('KID60414','YQLBW0001','YQLBW0001','2016-10-09 23:41:42',NULL,NULL,0),('KID60414','YQLBW0002','YQLBW0002','2016-10-09 23:43:14',NULL,NULL,0),('KID60414','YQLBW0003','YQLBW0003','2016-10-09 23:44:25',NULL,NULL,0),('KID60414','YQLBW1999','YQLBW1999','2016-10-09 23:42:09',NULL,NULL,1),('KID42357','YTWBV0001','YTWBV0001','2016-10-09 23:41:42',NULL,NULL,0),('KID42357','YTWBV0002','YTWBV0002','2016-10-09 23:43:14',NULL,NULL,0),('KID42357','YTWBV0003','YTWBV0003','2016-10-09 23:44:25',NULL,NULL,0),('KID42357','YTWBV1999','YTWBV1999','2016-10-09 23:42:09',NULL,NULL,1),('KID50444','YYYYY0001','YYYYY0001','2016-10-09 23:41:47',NULL,NULL,0),('KID50444','YYYYY0002','YYYYY0002','2016-10-09 23:43:30',NULL,NULL,0),('KID50444','YYYYY0003','YYYYY0003','2016-10-09 23:44:25',NULL,NULL,0),('KID50444','YYYYY1999','YYYYY1999','2016-10-09 23:42:13',NULL,NULL,1),('KID80253','YZOBI0001','YZOBI0001','2016-10-09 23:41:44',NULL,NULL,0),('KID80253','YZOBI1999','YZOBI1999','2016-10-09 23:42:10',NULL,NULL,1),('KID98369','ZAXAEM0999','ZAXAEM0999','2017-05-14 20:16:36',1,NULL,1),('KID98369','ZAXAEM1999','ZAXAEM1999','2017-05-14 20:16:36',1,NULL,1),('KID60451','ZMMCW0001','ZMMCW0001','2016-10-09 23:41:43',NULL,NULL,0),('KID60451','ZMMCW0002','ZMMCW0002','2016-10-09 23:43:15',NULL,NULL,0),('KID60451','ZMMCW0003','ZMMCW0003','2016-10-09 23:44:25',NULL,NULL,0),('KID60451','ZMMCW1999','ZMMCW1999','2016-10-09 23:42:09',NULL,NULL,1),('KID93084','ZRTLC0001','ZRTLC0001','2016-10-09 23:41:46',NULL,NULL,0),('KID93084','ZRTLC1999','ZRTLC1999','2016-10-09 23:42:12',NULL,NULL,1),('KID20749','ZXNJJ0001','ZXNJJ0001','2016-10-09 23:41:45',NULL,NULL,0),('KID20749','ZXNJJ0002','ZXNJJ0002','2016-10-09 23:43:16',NULL,NULL,0),('KID20749','ZXNJJ0003','ZXNJJ0003','2016-10-09 23:44:25',NULL,NULL,0),('KID20749','ZXNJJ1999','ZXNJJ1999','2016-10-09 23:42:10',NULL,NULL,1),('KID71925','ZYUYG0001','ZYUYG0001','2016-10-09 23:41:47',NULL,NULL,0),('KID71925','ZYUYG1999','ZYUYG1999','2016-10-09 23:42:12',NULL,NULL,1);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-05 10:22:31
