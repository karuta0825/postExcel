-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: kms
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
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;--
-- Table structure for table `servers`
--
DROP TABLE IF EXISTS `servers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;CREATE TABLE `servers` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `ip` varchar(15) NOT NULL,
    `name` varchar(10) NOT NULL,
    `type` varchar(5) NOT NULL,
    `version` varchar(2) NOT NULL,
    `connect_db` varchar(45) DEFAULT NULL,
    `capacity` int(4) DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 68 DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;--
-- Dumping data for table `servers`
--
LOCK TABLES `servers` WRITE;
/*!40000 ALTER TABLE `servers` DISABLE KEYS */;
INSERT INTO
    `servers`
VALUES
    (1, '192.168.100.101', 'AP1-1', 'AP', 'ES', 'DB1-1', 90),(2, '192.168.100.10', 'AP1-2', 'AP', 'ES', 'DB1-1', 80),(3, '192.168.100.118', 'AP4-3', 'AP', 'ES', 'DB4-1', 80),(4, '192.168.100.112', 'AP3-2', 'AP', 'ES', 'DB3-1', 80),(5, '192.168.100.108', 'AP2-3', 'AP', 'ES', 'DB2-1', 80),(6, '192.168.100.105', 'AP5-4', 'AP', 'ES', 'DB5-1', 80),(7, '192.168.100.116', 'AP4-1', 'AP', 'ES', 'DB4-1', 80),(8, '192.168.100.114', 'AP3-4', 'AP', 'ES', 'DB3-1', 80),(9, '192.168.100.103', 'AP1-3', 'AP', 'ES', 'DB1-1', 40),(
        10,
        '192.168.100.120',
        'AP4-5',
        'AP',
        'ES',
        'DB4-1',
        80
    ),(
        11,
        '192.168.100.110',
        'AP2-5',
        'AP',
        'ES',
        'DB2-1',
        80
    ),(
        12,
        '192.168.100.111',
        'AP5-1',
        'AP',
        'ES',
        'DB5-1',
        80
    ),(
        13,
        '192.168.100.106',
        'AP2-1',
        'AP',
        'ES',
        'DB2-1',
        80
    ),(
        14,
        '192.168.110.104',
        'AP1-4',
        'AP',
        'ES',
        'DB1-1',
        80
    ),(
        15,
        '192.168.110.119',
        'AP4-4',
        'AP',
        'ES',
        'DB4-1',
        80
    ),(
        16,
        '192.168.110.113',
        'AP3-3',
        'AP',
        'ES',
        'DB3-1',
        80
    ),(
        17,
        '192.168.100.109',
        'AP2-4',
        'AP',
        'ES',
        'DB2-1',
        80
    ),(
        18,
        '192.168.110.105',
        'AP5-5',
        'AP',
        'ES',
        'DB5-1',
        80
    ),(
        19,
        '192.168.110.117',
        'AP4-2',
        'AP',
        'ES',
        'DB4-1',
        80
    ),(
        20,
        '192.168.110.115',
        'AP3-5',
        'AP',
        'ES',
        'DB3-1',
        80
    ),(
        21,
        '192.168.110.105',
        'AP1-5',
        'AP',
        'ES',
        'DB1-1',
        80
    ),(
        22,
        '192.168.110.109',
        'AP5-2',
        'AP',
        'ES',
        'DB5-1',
        80
    ),(
        23,
        '192.168.100.111',
        'AP3-1',
        'AP',
        'ES',
        'DB3-1',
        80
    ),(
        24,
        '192.168.110.111',
        'AP5-3',
        'AP',
        'ES',
        'DB5-1',
        80
    ),(
        25,
        '192.168.110.107',
        'AP2-2',
        'AP',
        'ES',
        'DB2-1',
        80
    ),(26, '192.168.150.101', 'DB1-1', 'DB', 'ES', '', 200),(27, '192.168.150.102', 'DB4-1', 'DB', 'ES', '', 200),(28, '192.168.150.103', 'DB3-1', 'DB', 'ES', '', 200),(29, '192.168.150.104', 'DB2-1', 'DB', 'ES', '', 200),(30, '192.168.150.105', 'DB5-1', 'DB', 'ES', '', 200),(
        32,
        '192.168.200.102',
        'LAP4-2',
        'AP',
        'LM',
        'LDB4-1',
        80
    ),(
        33,
        '192.168.200.103',
        'LAP3-1',
        'AP',
        'LM',
        'LDB3-1',
        80
    ),(
        34,
        '192.168.200.104',
        'LAP2-2',
        'AP',
        'LM',
        'LDB2-1',
        80
    ),(
        35,
        '192.168.200.105',
        'LAP5-3',
        'AP',
        'LM',
        'LDB5-1',
        80
    ),(
        36,
        '192.168.200.106',
        'LAP3-5',
        'AP',
        'LM',
        'LDB3-1',
        80
    ),(
        37,
        '192.168.200.107',
        'LAP3-3',
        'AP',
        'LM',
        'LDB3-1',
        80
    ),(
        38,
        '192.168.200.108',
        'LAP1-2',
        'AP',
        'LM',
        'LDB1-1',
        40
    ),(
        39,
        '192.168.200.109',
        'LAP4-4',
        'AP',
        'LM',
        'LDB4-1',
        80
    ),(
        40,
        '192.168.200.110',
        'LAP2-4',
        'AP',
        'LM',
        'LDB2-1',
        80
    ),(
        41,
        '192.168.200.111',
        'LAP4-5',
        'AP',
        'LM',
        'LDB4-1',
        80
    ),(
        42,
        '192.168.200.112',
        'LAP1-5',
        'AP',
        'LM',
        'LDB1-1',
        80
    ),(
        43,
        '192.168.210.101',
        'LAP1-3',
        'AP',
        'LM',
        'LDB1-1',
        10
    ),(
        44,
        '192.168.210.102',
        'LAP4-3',
        'AP',
        'LM',
        'LDB4-1',
        80
    ),(
        45,
        '192.168.210.103',
        'LAP3-2',
        'AP',
        'LM',
        'LDB3-1',
        80
    ),(
        46,
        '192.168.210.104',
        'LAP2-3',
        'AP',
        'LM',
        'LDB2-1',
        80
    ),(
        47,
        '192.168.210.105',
        'LAP5-4',
        'AP',
        'LM',
        'LDB5-1',
        80
    ),(
        48,
        '192.168.210.106',
        'LAP4-1',
        'AP',
        'LM',
        'LDB4-1',
        80
    ),(
        49,
        '192.168.210.107',
        'LAP3-4',
        'AP',
        'LM',
        'LDB3-1',
        80
    ),(
        50,
        '192.168.210.108',
        'LAP1-4',
        'AP',
        'LM',
        'LDB1-1',
        40
    ),(
        51,
        '192.168.210.109',
        'LAP5-1',
        'AP',
        'LM',
        'LDB5-1',
        80
    ),(
        52,
        '192.168.210.110',
        'LAP2-5',
        'AP',
        'LM',
        'LDB2-1',
        80
    ),(
        53,
        '192.168.210.111',
        'LAP5-2',
        'AP',
        'LM',
        'LDB5-1',
        80
    ),(
        54,
        '192.168.210.112',
        'LAP2-1',
        'AP',
        'LM',
        'LDB2-1',
        30
    ),(55, '192.168.250.101', 'LDB1-1', 'DB', 'LM', '', 200),(56, '192.168.250.102', 'LDB4-1', 'DB', 'LM', '', 200),(57, '192.168.250.103', 'LDB3-1', 'DB', 'LM', '', 200),(59, '192.168.250.105', 'LDB5-1', 'DB', 'LM', '', 200),(
        60,
        '192.158.10.10',
        'LAP1-1',
        'AP',
        'LM',
        'LDB1-1',
        60
    ),(
        62,
        '192.12.123.31',
        'LAP5-5',
        'AP',
        'LM',
        'LDB5-1',
        80
    ),(63, '192.168.11.34', 'WEB1-1', 'WEB', 'LM', '', 400),(64, '192.156.11.11', 'WEB0-1', 'WEB', 'ES', '', 400),(67, '191.12.12.11', 'APNEW', 'AP', 'LM', 'LDB1-1', 12);
    /*!40000 ALTER TABLE `servers` ENABLE KEYS */;UNLOCK TABLES;
    /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
    /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
    /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
    /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
    /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
    /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
    /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
    /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;-- Dump completed on 2017-07-23 22:28:43