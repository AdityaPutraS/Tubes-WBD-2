-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2019 at 09:20 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nyobanode`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun_virtual`
--

CREATE TABLE `akun_virtual` (
  `no_virtual` varchar(20) NOT NULL,
  `no_rekening` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `nasabah`
--

CREATE TABLE `nasabah` (
  `id_nasabah` int(10) UNSIGNED NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `no_rekening` varchar(20) NOT NULL,
  `saldo` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nasabah`
--

INSERT INTO `nasabah` (`id_nasabah`, `nama`, `no_rekening`, `saldo`) VALUES
(1, 'ajeng', '08123', 123789),
(2, 'cantik', '2345', 123);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL DEFAULT '0',
  `last_name` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id`, `first_name`, `last_name`) VALUES
(1, 'mahanti', 'indah'),
(2, 'ajeng', 'cantik');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(10) UNSIGNED NOT NULL,
  `id_pengguna` int(11) DEFAULT NULL,
  `nomor_virtual` varchar(20) DEFAULT NULL,
  `id_film` int(11) DEFAULT NULL,
  `jadwal` datetime DEFAULT NULL,
  `kursi` int(11) DEFAULT NULL,
  `waktu` datetime DEFAULT NULL,
  `status_transaksi` enum('Pending','Cancelled','Success') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_pengguna`, `nomor_virtual`, `id_film`, `jadwal`, `kursi`, `waktu`, `status_transaksi`) VALUES
(100, 4, '0', 582083, '2019-11-28 10:00:00', 10, '2019-11-27 14:55:56', 'Success'),
(101, 4, 'COBAPLISBISA', 582083, '2019-11-28 10:00:00', 10, '2019-11-27 14:57:44', 'Cancelled'),
(102, 4, 'COBAPLISBISA', 431582, '2019-12-10 10:00:00', 10, '2019-11-28 12:09:29', 'Success'),
(103, 4, 'COBAPLISBISA', 431582, '2019-12-10 10:00:00', 9, '2019-11-28 12:11:17', 'Cancelled'),
(124, 4, 'COBAPLISBISA', 580413, '2019-12-03 10:00:00', 5, '2019-11-28 14:25:05', 'Cancelled');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun_virtual`
--
ALTER TABLE `akun_virtual`
  ADD PRIMARY KEY (`no_virtual`),
  ADD KEY `FK_Rekening` (`no_rekening`);

--
-- Indexes for table `nasabah`
--
ALTER TABLE `nasabah`
  ADD PRIMARY KEY (`id_nasabah`),
  ADD UNIQUE KEY `no_rekening` (`no_rekening`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nasabah`
--
ALTER TABLE `nasabah`
  MODIFY `id_nasabah` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `akun_virtual`
--
ALTER TABLE `akun_virtual`
  ADD CONSTRAINT `FK_Rekening` FOREIGN KEY (`no_rekening`) REFERENCES `nasabah` (`no_rekening`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
