-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2019 at 09:01 AM
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
-- Database: `wbd`
--

-- --------------------------------------------------------

--
-- Table structure for table `film`
--

CREATE TABLE `film` (
  `film_id` int(11) NOT NULL,
  `title` varchar(30) COLLATE utf8_bin NOT NULL,
  `film_picture` varchar(80) COLLATE utf8_bin NOT NULL,
  `genre` varchar(60) COLLATE utf8_bin NOT NULL,
  `durasi` int(11) NOT NULL,
  `released_date` date NOT NULL,
  `detail` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `film`
--

INSERT INTO `film` (`film_id`, `title`, `film_picture`, `genre`, `durasi`, `released_date`, `detail`) VALUES
(1, 'Weathering With You (天気の子)', 'tenki no ko.jpg', 'Drama, Fantasy, Romance, Slice of Life', 114, '2019-11-16', 'The summer of his high school freshman year, Hodaka runs away from his remote island home to Tokyo, and quickly finds himself pushed to his financial and personal limits. The weather is unusually gloomy and rainy every day, as if to suggest his future. He lives his days in isolation, but finally finds work as a writer for a mysterious occult magazine. Then one day, Hodaka meets Hina on a busy street corner. This bright and strong-willed girl possesses a strange and wonderful ability: the power to stop the rain and clear the sky...'),
(2, 'Avengers: Endgame', 'avengers endgame.jpeg', 'Action, Adventure, Fantasy, Superhero, Science Fiction', 182, '2019-09-20', 'Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.'),
(3, 'Gundala', 'gundala.jpg', 'Action, Drama, Superhero', 123, '2019-08-29', 'Indonesia\'s preeminent comic book superhero and his alter ego Sancaka enter the cinematic universe to battle the wicked Pengkor and his diabolical squad of orphan assassins.'),
(4, 'Midsommar', 'midsommar.jpeg', 'Drama, Horror, Mystery', 187, '2019-09-07', 'A couple travel to Sweden to visit their friend\'s rural hometown for its fabled midsummer festival, but what begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.'),
(5, 'One Piece: Stampede', 'stampede.jpeg', 'Fantasy, Action', 101, '2019-09-18', 'The world\'s boldest buccaneers set sail for the great Pirate Festival, where the Straw Hats join a mad-dash race to find Gol D.Roger\'s treasure. There\'s just one little problem. An old member of Roger\'s crew has a sinister score to settle. All bets are off when the most iconic pirates of One Piece history band together for a swashbuckling showdown, the likes of which have never been seen!'),
(6, 'Twiceland', 'twiceland.jpeg', 'Documentary', 110, '2018-12-07', 'The girl group Twice\'s big-screen film is the movie version of their world tour \'Twiceland Zone 2: Fantasy Park\'.'),
(7, 'Ad Astra', 'ad astra.jpeg', 'Adventure, Drama, Mystery', 123, '2019-09-20', 'Astronaut Roy McBride undertakes a mission across an unforgiving solar system to uncover the truth about his missing father and his doomed expedition that now, 30 years later, threatens the universe.');

-- --------------------------------------------------------

--
-- Table structure for table `film_review`
--

CREATE TABLE `film_review` (
  `user_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text COLLATE utf8_bin NOT NULL,
  `id_transaksi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `film_review`
--

INSERT INTO `film_review` (`user_id`, `film_id`, `rating`, `review`, `id_transaksi`) VALUES
(1, 2, 8, ' adadawd', 0),
(2, 1, 5, 'Lumayan lah', 1),
(3, 1, 10, 'Best film ever in the history of anime. 10/10 bakal nonton lagi karena saya sangat suka film ini.', 2),
(3, 2, 2, 'meh', 3),
(3, 3, 10, 'Best ever', 4),
(4, 431582, 10, ' Bagus parah', 102);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `user_id` int(11) NOT NULL,
  `cookies` varchar(40) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user_id`, `cookies`) VALUES
(1, 'wTutpxkEGQh5Cxfu6sNXM9LyBndwIiWh9aSYItBC'),
(3, 'vwIIMjCdnvVg5yiZ8BLrlTu6eiVOyjr9LdqrMGRR'),
(4, 'dtvDuI8I2pOMAWUGShBItr7mQs9NHQ3VbmsCd9Sw');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `available_seat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `film_id`, `date`, `time`, `available_seat`) VALUES
(1, 1, '2019-11-23', '18:30:00', 30),
(2, 1, '2019-09-30', '23:30:00', 25),
(3, 3, '2019-09-14', '17:00:00', 30),
(4, 3, '2019-09-30', '18:30:00', 6),
(5, 2, '2019-09-25', '15:06:00', 5),
(6, 6, '2019-11-05', '15:02:00', 40),
(7, 3, '2019-09-09', '15:02:00', 0),
(8, 7, '2019-09-20', '12:00:00', 5),
(9, 7, '2019-09-21', '12:31:26', 53),
(10, 4, '2019-09-08', '10:21:22', 10),
(11, 5, '2019-09-21', '13:31:26', 50),
(12, 5, '2019-10-01', '17:31:26', 50),
(13, 3, '1970-01-02', '10:00:00', 30),
(42, 3, '1970-01-01', '10:00:00', 30),
(43, 3, '1970-01-02', '10:00:00', 30),
(44, 3, '1970-01-03', '10:00:00', 30),
(45, 3, '1970-01-04', '10:00:00', 30),
(46, 3, '1970-01-05', '10:00:00', 30),
(47, 3, '1970-01-06', '10:00:00', 30),
(48, 3, '1970-01-07', '10:00:00', 30),
(77, 3, '1970-01-02', '10:00:00', 30),
(78, 3, '1970-01-03', '10:00:00', 30),
(79, 3, '1970-01-04', '10:00:00', 30),
(80, 3, '1970-01-05', '10:00:00', 30),
(81, 3, '1970-01-06', '10:00:00', 30),
(82, 3, '1970-01-07', '10:00:00', 30),
(83, 3, '2019-01-15', '10:00:00', 30),
(84, 3, '2019-01-16', '10:00:00', 30),
(85, 3, '2019-01-17', '10:00:00', 30),
(86, 3, '2019-01-18', '10:00:00', 30),
(87, 3, '2019-01-19', '10:00:00', 30),
(88, 3, '2019-01-20', '10:00:00', 30),
(89, 3, '2019-01-21', '10:00:00', 30),
(112, 321746, '2019-11-18', '10:00:00', 30),
(113, 321746, '2019-11-19', '10:00:00', 30),
(114, 321746, '2019-11-20', '10:00:00', 30),
(115, 321746, '2019-11-21', '10:00:00', 30),
(116, 321746, '2019-11-22', '10:00:00', 30),
(117, 321746, '2019-11-23', '10:00:00', 30),
(118, 321746, '2019-11-24', '10:00:00', 30),
(119, 384756, '2019-11-21', '10:00:00', 30),
(120, 384756, '2019-11-22', '10:00:00', 30),
(121, 384756, '2019-11-23', '10:00:00', 30),
(122, 384756, '2019-11-24', '10:00:00', 30),
(123, 384756, '2019-11-25', '10:00:00', 30),
(124, 384756, '2019-11-26', '10:00:00', 30),
(125, 384756, '2019-11-27', '10:00:00', 30),
(126, 384756, '2019-11-21', '10:00:00', 30),
(127, 384756, '2019-11-22', '10:00:00', 30),
(128, 384756, '2019-11-23', '10:00:00', 30),
(129, 384756, '2019-11-24', '10:00:00', 30),
(130, 384756, '2019-11-25', '10:00:00', 30),
(131, 384756, '2019-11-26', '10:00:00', 30),
(132, 384756, '2019-11-27', '10:00:00', 30),
(133, 384756, '2019-11-21', '10:00:00', 30),
(134, 384756, '2019-11-22', '10:00:00', 30),
(135, 384756, '2019-11-23', '10:00:00', 30),
(136, 384756, '2019-11-24', '10:00:00', 30),
(137, 384756, '2019-11-25', '10:00:00', 30),
(138, 384756, '2019-11-26', '10:00:00', 30),
(139, 384756, '2019-11-27', '10:00:00', 30),
(140, 384756, '2019-11-21', '10:00:00', 30),
(141, 384756, '2019-11-22', '10:00:00', 30),
(142, 384756, '2019-11-23', '10:00:00', 30),
(143, 384756, '2019-11-24', '10:00:00', 30),
(144, 384756, '2019-11-25', '10:00:00', 30),
(145, 384756, '2019-11-26', '10:00:00', 30),
(146, 384756, '2019-11-27', '10:00:00', 30),
(147, 384756, '2019-11-21', '10:00:00', 30),
(148, 384756, '2019-11-22', '10:00:00', 30),
(149, 384756, '2019-11-23', '10:00:00', 30),
(150, 384756, '2019-11-24', '10:00:00', 30),
(151, 384756, '2019-11-25', '10:00:00', 30),
(152, 384756, '2019-11-26', '10:00:00', 30),
(153, 384756, '2019-11-27', '10:00:00', 30),
(154, 384756, '2019-11-21', '10:00:00', 30),
(155, 384756, '2019-11-22', '10:00:00', 30),
(156, 384756, '2019-11-23', '10:00:00', 30),
(157, 384756, '2019-11-24', '10:00:00', 30),
(158, 384756, '2019-11-25', '10:00:00', 30),
(159, 384756, '2019-11-26', '10:00:00', 30),
(160, 384756, '2019-11-27', '10:00:00', 30),
(161, 412061, '2019-11-22', '10:00:00', 30),
(162, 412061, '2019-11-23', '10:00:00', 30),
(163, 412061, '2019-11-24', '10:00:00', 30),
(164, 412061, '2019-11-25', '10:00:00', 30),
(165, 412061, '2019-11-26', '10:00:00', 30),
(166, 412061, '2019-11-27', '10:00:00', 30),
(167, 412061, '2019-11-28', '10:00:00', 30),
(168, 412061, '2019-11-22', '10:00:00', 30),
(169, 412061, '2019-11-23', '10:00:00', 30),
(170, 412061, '2019-11-24', '10:00:00', 30),
(171, 412061, '2019-11-25', '10:00:00', 30),
(172, 412061, '2019-11-26', '10:00:00', 30),
(173, 412061, '2019-11-27', '10:00:00', 30),
(174, 412061, '2019-11-28', '10:00:00', 30),
(175, 78108, '2019-11-23', '10:00:00', 30),
(176, 78108, '2019-11-24', '10:00:00', 30),
(177, 78108, '2019-11-25', '10:00:00', 30),
(178, 78108, '2019-11-26', '10:00:00', 30),
(179, 78108, '2019-11-27', '10:00:00', 30),
(180, 78108, '2019-11-28', '10:00:00', 30),
(181, 78108, '2019-11-29', '10:00:00', 30),
(182, 78108, '2019-11-23', '10:00:00', 30),
(183, 78108, '2019-11-24', '10:00:00', 30),
(184, 78108, '2019-11-25', '10:00:00', 30),
(185, 78108, '2019-11-26', '10:00:00', 30),
(186, 78108, '2019-11-27', '10:00:00', 30),
(187, 78108, '2019-11-28', '10:00:00', 30),
(188, 78108, '2019-11-29', '10:00:00', 30),
(189, 384756, '2019-11-21', '10:00:00', 30),
(190, 384756, '2019-11-22', '10:00:00', 30),
(191, 384756, '2019-11-23', '10:00:00', 30),
(192, 384756, '2019-11-24', '10:00:00', 30),
(193, 384756, '2019-11-25', '10:00:00', 30),
(194, 384756, '2019-11-26', '10:00:00', 30),
(195, 384756, '2019-11-27', '10:00:00', 30),
(196, 384756, '2019-11-21', '10:00:00', 30),
(197, 384756, '2019-11-22', '10:00:00', 30),
(198, 384756, '2019-11-23', '10:00:00', 30),
(199, 384756, '2019-11-24', '10:00:00', 30),
(200, 384756, '2019-11-25', '10:00:00', 30),
(201, 384756, '2019-11-26', '10:00:00', 30),
(202, 384756, '2019-11-27', '10:00:00', 30),
(203, 78108, '2019-11-23', '10:00:00', 30),
(204, 78108, '2019-11-24', '10:00:00', 30),
(205, 78108, '2019-11-25', '10:00:00', 30),
(206, 78108, '2019-11-26', '10:00:00', 30),
(207, 78108, '2019-11-27', '10:00:00', 30),
(208, 78108, '2019-11-28', '10:00:00', 30),
(209, 78108, '2019-11-29', '10:00:00', 30),
(210, 582083, '2019-11-27', '10:00:00', 30),
(211, 582083, '2019-11-28', '10:00:00', 30),
(212, 582083, '2019-11-29', '10:00:00', 30),
(213, 582083, '2019-11-30', '10:00:00', 30),
(214, 582083, '2019-12-01', '10:00:00', 30),
(215, 582083, '2019-12-02', '10:00:00', 30),
(216, 582083, '2019-12-03', '10:00:00', 30),
(217, 582083, '2019-11-27', '10:00:00', 30),
(218, 582083, '2019-11-28', '10:00:00', 30),
(219, 582083, '2019-11-29', '10:00:00', 30),
(220, 582083, '2019-11-30', '10:00:00', 30),
(221, 582083, '2019-12-01', '10:00:00', 30),
(222, 582083, '2019-12-02', '10:00:00', 30),
(223, 582083, '2019-12-03', '10:00:00', 30),
(224, 580413, '2019-11-27', '10:00:00', 30),
(225, 580413, '2019-11-28', '10:00:00', 30),
(226, 580413, '2019-11-29', '10:00:00', 30),
(227, 580413, '2019-11-30', '10:00:00', 30),
(228, 580413, '2019-12-01', '10:00:00', 30),
(229, 580413, '2019-12-02', '10:00:00', 30),
(230, 580413, '2019-12-03', '10:00:00', 30),
(231, 580413, '2019-11-27', '10:00:00', 30),
(232, 580413, '2019-11-28', '10:00:00', 30),
(233, 580413, '2019-11-29', '10:00:00', 30),
(234, 580413, '2019-11-30', '10:00:00', 30),
(235, 580413, '2019-12-01', '10:00:00', 30),
(236, 580413, '2019-12-02', '10:00:00', 30),
(237, 580413, '2019-12-03', '10:00:00', 30),
(238, 582083, '2019-11-27', '10:00:00', 30),
(239, 582083, '2019-11-28', '10:00:00', 30),
(240, 582083, '2019-11-29', '10:00:00', 30),
(241, 582083, '2019-11-30', '10:00:00', 30),
(242, 582083, '2019-12-01', '10:00:00', 30),
(243, 582083, '2019-12-02', '10:00:00', 30),
(244, 582083, '2019-12-03', '10:00:00', 30),
(245, 582083, '2019-11-27', '10:00:00', 30),
(246, 582083, '2019-11-28', '10:00:00', 30),
(247, 582083, '2019-11-29', '10:00:00', 30),
(248, 582083, '2019-11-30', '10:00:00', 30),
(249, 582083, '2019-12-01', '10:00:00', 30),
(250, 582083, '2019-12-02', '10:00:00', 30),
(251, 582083, '2019-12-03', '10:00:00', 30),
(252, 78108, '2019-11-23', '10:00:00', 30),
(253, 78108, '2019-11-24', '10:00:00', 30),
(254, 78108, '2019-11-25', '10:00:00', 30),
(255, 78108, '2019-11-26', '10:00:00', 30),
(256, 78108, '2019-11-27', '10:00:00', 30),
(257, 78108, '2019-11-28', '10:00:00', 30),
(258, 78108, '2019-11-29', '10:00:00', 30),
(259, 78108, '2019-11-23', '10:00:00', 30),
(260, 78108, '2019-11-24', '10:00:00', 30),
(261, 78108, '2019-11-25', '10:00:00', 30),
(262, 78108, '2019-11-26', '10:00:00', 30),
(263, 78108, '2019-11-27', '10:00:00', 30),
(264, 78108, '2019-11-28', '10:00:00', 30),
(265, 78108, '2019-11-29', '10:00:00', 30),
(266, 78108, '2019-11-23', '10:00:00', 30),
(267, 78108, '2019-11-24', '10:00:00', 30),
(268, 78108, '2019-11-25', '10:00:00', 30),
(269, 78108, '2019-11-26', '10:00:00', 30),
(270, 78108, '2019-11-27', '10:00:00', 30),
(271, 78108, '2019-11-28', '10:00:00', 30),
(272, 78108, '2019-11-29', '10:00:00', 30),
(273, 78108, '2019-11-23', '10:00:00', 30),
(274, 78108, '2019-11-24', '10:00:00', 30),
(275, 78108, '2019-11-25', '10:00:00', 30),
(276, 78108, '2019-11-26', '10:00:00', 30),
(277, 78108, '2019-11-27', '10:00:00', 30),
(278, 78108, '2019-11-28', '10:00:00', 30),
(279, 78108, '2019-11-29', '10:00:00', 30),
(280, 78108, '2019-11-23', '10:00:00', 30),
(281, 78108, '2019-11-24', '10:00:00', 30),
(282, 78108, '2019-11-25', '10:00:00', 30),
(283, 78108, '2019-11-26', '10:00:00', 30),
(284, 78108, '2019-11-27', '10:00:00', 30),
(285, 78108, '2019-11-28', '10:00:00', 30),
(286, 78108, '2019-11-29', '10:00:00', 30),
(287, 78108, '2019-11-23', '10:00:00', 30),
(288, 78108, '2019-11-24', '10:00:00', 30),
(289, 78108, '2019-11-25', '10:00:00', 30),
(290, 78108, '2019-11-26', '10:00:00', 30),
(291, 78108, '2019-11-27', '10:00:00', 30),
(292, 78108, '2019-11-28', '10:00:00', 30),
(293, 78108, '2019-11-29', '10:00:00', 30),
(294, 78108, '2019-11-23', '10:00:00', 30),
(295, 78108, '2019-11-24', '10:00:00', 30),
(296, 78108, '2019-11-25', '10:00:00', 30),
(297, 78108, '2019-11-26', '10:00:00', 30),
(298, 78108, '2019-11-27', '10:00:00', 30),
(299, 78108, '2019-11-28', '10:00:00', 30),
(300, 78108, '2019-11-29', '10:00:00', 30),
(301, 78108, '2019-11-23', '10:00:00', 30),
(302, 78108, '2019-11-24', '10:00:00', 30),
(303, 78108, '2019-11-25', '10:00:00', 30),
(304, 78108, '2019-11-26', '10:00:00', 30),
(305, 78108, '2019-11-27', '10:00:00', 30),
(306, 78108, '2019-11-28', '10:00:00', 30),
(307, 78108, '2019-11-29', '10:00:00', 30),
(308, 78108, '2019-11-23', '10:00:00', 30),
(309, 78108, '2019-11-24', '10:00:00', 30),
(310, 78108, '2019-11-25', '10:00:00', 30),
(311, 78108, '2019-11-26', '10:00:00', 30),
(312, 78108, '2019-11-27', '10:00:00', 30),
(313, 78108, '2019-11-28', '10:00:00', 30),
(314, 78108, '2019-11-29', '10:00:00', 30),
(315, 78108, '2019-11-23', '10:00:00', 30),
(316, 78108, '2019-11-24', '10:00:00', 30),
(317, 78108, '2019-11-25', '10:00:00', 30),
(318, 78108, '2019-11-26', '10:00:00', 30),
(319, 78108, '2019-11-27', '10:00:00', 30),
(320, 78108, '2019-11-28', '10:00:00', 30),
(321, 78108, '2019-11-29', '10:00:00', 30),
(322, 78108, '2019-11-23', '10:00:00', 30),
(323, 78108, '2019-11-24', '10:00:00', 30),
(324, 78108, '2019-11-25', '10:00:00', 30),
(325, 78108, '2019-11-26', '10:00:00', 30),
(326, 78108, '2019-11-27', '10:00:00', 30),
(327, 78108, '2019-11-28', '10:00:00', 30),
(328, 78108, '2019-11-29', '10:00:00', 30),
(329, 78108, '2019-11-23', '10:00:00', 30),
(330, 78108, '2019-11-24', '10:00:00', 30),
(331, 78108, '2019-11-25', '10:00:00', 30),
(332, 78108, '2019-11-26', '10:00:00', 30),
(333, 78108, '2019-11-27', '10:00:00', 30),
(334, 78108, '2019-11-28', '10:00:00', 30),
(335, 78108, '2019-11-29', '10:00:00', 30),
(336, 78108, '2019-11-23', '10:00:00', 30),
(337, 78108, '2019-11-24', '10:00:00', 30),
(338, 78108, '2019-11-25', '10:00:00', 30),
(339, 78108, '2019-11-26', '10:00:00', 30),
(340, 78108, '2019-11-27', '10:00:00', 30),
(341, 78108, '2019-11-28', '10:00:00', 30),
(342, 78108, '2019-11-29', '10:00:00', 30),
(343, 78108, '2019-11-23', '10:00:00', 30),
(344, 78108, '2019-11-24', '10:00:00', 30),
(345, 78108, '2019-11-25', '10:00:00', 30),
(346, 78108, '2019-11-26', '10:00:00', 30),
(347, 78108, '2019-11-27', '10:00:00', 30),
(348, 78108, '2019-11-28', '10:00:00', 30),
(349, 78108, '2019-11-29', '10:00:00', 30),
(350, 565235, '2019-11-21', '10:00:00', 30),
(351, 565235, '2019-11-22', '10:00:00', 30),
(352, 565235, '2019-11-23', '10:00:00', 30),
(353, 565235, '2019-11-24', '10:00:00', 30),
(354, 565235, '2019-11-25', '10:00:00', 30),
(355, 565235, '2019-11-26', '10:00:00', 30),
(356, 565235, '2019-11-27', '10:00:00', 30),
(357, 565235, '2019-11-21', '10:00:00', 30),
(358, 565235, '2019-11-22', '10:00:00', 30),
(359, 565235, '2019-11-23', '10:00:00', 30),
(360, 565235, '2019-11-24', '10:00:00', 30),
(361, 565235, '2019-11-25', '10:00:00', 30),
(362, 565235, '2019-11-26', '10:00:00', 30),
(363, 565235, '2019-11-27', '10:00:00', 30),
(364, 431582, '2019-12-04', '10:00:00', 30),
(365, 431582, '2019-12-05', '10:00:00', 30),
(366, 431582, '2019-12-06', '10:00:00', 30),
(367, 431582, '2019-12-07', '10:00:00', 30),
(368, 431582, '2019-12-08', '10:00:00', 30),
(369, 431582, '2019-12-09', '10:00:00', 30),
(370, 431582, '2019-12-10', '10:00:00', 30),
(371, 431582, '2019-12-04', '10:00:00', 30),
(372, 431582, '2019-12-05', '10:00:00', 30),
(373, 431582, '2019-12-06', '10:00:00', 30),
(374, 431582, '2019-12-07', '10:00:00', 30),
(375, 431582, '2019-12-08', '10:00:00', 30),
(376, 431582, '2019-12-09', '10:00:00', 30),
(377, 431582, '2019-12-10', '10:00:00', 30),
(378, 431582, '2019-12-04', '10:00:00', 30),
(379, 431582, '2019-12-05', '10:00:00', 30),
(380, 431582, '2019-12-06', '10:00:00', 30),
(381, 431582, '2019-12-07', '10:00:00', 30),
(382, 431582, '2019-12-08', '10:00:00', 30),
(383, 431582, '2019-12-09', '10:00:00', 30),
(384, 431582, '2019-12-10', '10:00:00', 30),
(385, 431582, '2019-12-04', '10:00:00', 30),
(386, 431582, '2019-12-05', '10:00:00', 30),
(387, 431582, '2019-12-06', '10:00:00', 30),
(388, 431582, '2019-12-07', '10:00:00', 30),
(389, 431582, '2019-12-08', '10:00:00', 30),
(390, 431582, '2019-12-09', '10:00:00', 30),
(391, 431582, '2019-12-10', '10:00:00', 30),
(392, 431582, '2019-12-04', '10:00:00', 30),
(393, 431582, '2019-12-05', '10:00:00', 30),
(394, 431582, '2019-12-06', '10:00:00', 30),
(395, 431582, '2019-12-07', '10:00:00', 30),
(396, 431582, '2019-12-08', '10:00:00', 30),
(397, 431582, '2019-12-09', '10:00:00', 30),
(398, 431582, '2019-12-10', '10:00:00', 30),
(399, 510883, '2019-11-27', '10:00:00', 30),
(400, 510883, '2019-11-28', '10:00:00', 30),
(401, 510883, '2019-11-29', '10:00:00', 30),
(402, 510883, '2019-11-30', '10:00:00', 30),
(403, 510883, '2019-12-01', '10:00:00', 30),
(404, 510883, '2019-12-02', '10:00:00', 30),
(405, 510883, '2019-12-03', '10:00:00', 30),
(406, 510883, '2019-11-27', '10:00:00', 30),
(407, 510883, '2019-11-28', '10:00:00', 30),
(408, 510883, '2019-11-29', '10:00:00', 30),
(409, 510883, '2019-11-30', '10:00:00', 30),
(410, 510883, '2019-12-01', '10:00:00', 30),
(411, 510883, '2019-12-02', '10:00:00', 30),
(412, 510883, '2019-12-03', '10:00:00', 30),
(413, 642036, '2019-11-28', '10:00:00', 30),
(414, 642036, '2019-11-29', '10:00:00', 30),
(415, 642036, '2019-11-30', '10:00:00', 30),
(416, 642036, '2019-12-01', '10:00:00', 30),
(417, 642036, '2019-12-02', '10:00:00', 30),
(418, 642036, '2019-12-03', '10:00:00', 30),
(419, 642036, '2019-12-04', '10:00:00', 30),
(420, 642036, '2019-11-28', '10:00:00', 30),
(421, 642036, '2019-11-29', '10:00:00', 30),
(422, 642036, '2019-11-30', '10:00:00', 30),
(423, 642036, '2019-12-01', '10:00:00', 30),
(424, 642036, '2019-12-02', '10:00:00', 30),
(425, 642036, '2019-12-03', '10:00:00', 30),
(426, 642036, '2019-12-04', '10:00:00', 30),
(427, 565235, '2019-11-21', '10:00:00', 30),
(428, 565235, '2019-11-22', '10:00:00', 30),
(429, 565235, '2019-11-23', '10:00:00', 30),
(430, 565235, '2019-11-24', '10:00:00', 30),
(431, 565235, '2019-11-25', '10:00:00', 30),
(432, 565235, '2019-11-26', '10:00:00', 30),
(433, 565235, '2019-11-27', '10:00:00', 30),
(434, 600039, '2019-11-21', '10:00:00', 30),
(435, 600039, '2019-11-22', '10:00:00', 30),
(436, 600039, '2019-11-23', '10:00:00', 30),
(437, 600039, '2019-11-24', '10:00:00', 30),
(438, 600039, '2019-11-25', '10:00:00', 30),
(439, 600039, '2019-11-26', '10:00:00', 30),
(440, 600039, '2019-11-27', '10:00:00', 30),
(441, 600039, '2019-11-21', '10:00:00', 30),
(442, 600039, '2019-11-22', '10:00:00', 30),
(443, 600039, '2019-11-23', '10:00:00', 30),
(444, 600039, '2019-11-24', '10:00:00', 30),
(445, 600039, '2019-11-25', '10:00:00', 30),
(446, 600039, '2019-11-26', '10:00:00', 30),
(447, 600039, '2019-11-27', '10:00:00', 30),
(448, 580413, '2019-11-27', '10:00:00', 30),
(449, 580413, '2019-11-28', '10:00:00', 30),
(450, 580413, '2019-11-29', '10:00:00', 30),
(451, 580413, '2019-11-30', '10:00:00', 30),
(452, 580413, '2019-12-01', '10:00:00', 30),
(453, 580413, '2019-12-02', '10:00:00', 30),
(454, 580413, '2019-12-03', '10:00:00', 30),
(455, 580413, '2019-11-27', '10:00:00', 30),
(456, 580413, '2019-11-28', '10:00:00', 30),
(457, 580413, '2019-11-29', '10:00:00', 30),
(458, 580413, '2019-11-30', '10:00:00', 30),
(459, 580413, '2019-12-01', '10:00:00', 30),
(460, 580413, '2019-12-02', '10:00:00', 30),
(461, 580413, '2019-12-03', '10:00:00', 30);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `film_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `seat` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`film_id`, `schedule_id`, `seat`, `user_id`, `id_transaksi`) VALUES
(580413, 237, 5, 4, 124),
(580413, 237, 7, 4, 125);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(60) COLLATE utf8_bin NOT NULL,
  `email` varchar(60) COLLATE utf8_bin NOT NULL,
  `phone_number` varchar(12) COLLATE utf8_bin NOT NULL,
  `password` varchar(40) COLLATE utf8_bin NOT NULL,
  `profile_picture` varchar(80) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `phone_number`, `password`, `profile_picture`) VALUES
(1, 'AdityaPutraS', 'adityaputra159@gmail.com', '089123456789', 'test1234', NULL),
(2, 'antonio wahyu', 'antonio@email.com', '123456789012', 'abcde', 'animeKids.jpeg'),
(3, 'mingtaros', 'mingtaros@mail.com', '123456789013', '1234', 'animeKids.jpeg'),
(4, 'mahantiindah', 'mahantiindah@gmail.com', '08123', 'MIR160601', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`film_id`);

--
-- Indexes for table `film_review`
--
ALTER TABLE `film_review`
  ADD PRIMARY KEY (`user_id`,`film_id`),
  ADD KEY `review_film_id` (`film_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `schedule_film_id` (`film_id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`film_id`,`schedule_id`,`seat`),
  ADD KEY `ticket_user_id` (`user_id`),
  ADD KEY `ticket_schedule_id` (`schedule_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `film`
--
ALTER TABLE `film`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=462;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `film_review`
--
ALTER TABLE `film_review`
  ADD CONSTRAINT `review_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_schedule_id` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
