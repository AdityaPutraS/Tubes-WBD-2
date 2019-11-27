-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: ws_bank
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

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
-- Table structure for table `akun_virtual`
--

DROP TABLE IF EXISTS `akun_virtual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `akun_virtual` (
  `no_virtual` varchar(20) NOT NULL,
  `no_rekening` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`no_virtual`),
  KEY `FK_Rekening` (`no_rekening`),
  CONSTRAINT `FK_Rekening` FOREIGN KEY (`no_rekening`) REFERENCES `nasabah` (`no_rekening`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `akun_virtual`
--

LOCK TABLES `akun_virtual` WRITE;
/*!40000 ALTER TABLE `akun_virtual` DISABLE KEYS */;
INSERT INTO `akun_virtual` VALUES ('13500008','13500001'),('13500004','13517013'),('13500005','13517013'),('13500006','13517013'),('13500007','13517013');
/*!40000 ALTER TABLE `akun_virtual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nasabah`
--

DROP TABLE IF EXISTS `nasabah`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nasabah` (
  `id_nasabah` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `no_rekening` varchar(20) NOT NULL,
  `saldo` double DEFAULT NULL,
  PRIMARY KEY (`id_nasabah`),
  UNIQUE KEY `no_rekening` (`no_rekening`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nasabah`
--

LOCK TABLES `nasabah` WRITE;
/*!40000 ALTER TABLE `nasabah` DISABLE KEYS */;
INSERT INTO `nasabah` VALUES (1,'aditya','13517013',95000),(2,'user2','13500001',0),(3,'user3','13500002',10),(4,'user4','13500003',1000);
/*!40000 ALTER TABLE `nasabah` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksi`
--

DROP TABLE IF EXISTS `transaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaksi` (
  `id_transaksi` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `no_rek_pengirim` varchar(20) NOT NULL,
  `no_rek_penerima` varchar(20) NOT NULL,
  `jumlah` double NOT NULL,
  `waktu` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_transaksi`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksi`
--

LOCK TABLES `transaksi` WRITE;
/*!40000 ALTER TABLE `transaksi` DISABLE KEYS */;
INSERT INTO `transaksi` VALUES (1,'13517013','13500001',20000,'2019-11-27 09:14:48'),(2,'13517013','13500002',30000,'2019-11-27 09:14:48'),(3,'13517013','13500003',15000,'2019-11-27 09:14:48'),(4,'13517013','13500004',10000,'2019-11-27 09:14:48'),(5,'13517013','13500008',8000,'2019-11-27 09:14:48'),(6,'13500001','13517013',1000,'2019-11-27 09:14:48'),(7,'13500002','13517013',2000,'2019-11-27 09:14:48'),(8,'13500003','13517013',3000,'2019-11-27 09:14:48'),(9,'13500004','13517013',4000,'2019-11-27 09:14:48'),(10,'13500008','13517013',5000,'2019-11-27 09:14:50'),(11,'13500001','13500004',20000,'2019-11-25 00:00:00');
/*!40000 ALTER TABLE `transaksi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-27 22:41:42
