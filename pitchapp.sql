-- phpMyAdmin SQL Dump
-- version 4.4.13.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 14, 2015 at 11:20 PM
-- Server version: 5.6.27-0ubuntu1
-- PHP Version: 5.6.11-1ubuntu3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pitchapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `competition`
--

CREATE TABLE IF NOT EXISTS `competition` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `image_url` text NOT NULL,
  `organizer` varchar(60) NOT NULL,
  `entrants` int(11) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(60) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `competition`
--

INSERT INTO `competition` (`id`, `name`, `image_url`, `organizer`, `entrants`, `description`, `location`, `date`, `start_time`, `end_time`, `status`) VALUES
(1, 'NinjaComp 2015', '/img/startup.png', 'NinjaComps', 0, 'NinjaComp is a competition to recognize and reward startups and the entrepreneurs behind them. Held as part of Global Entrepreneurship Week, NinjaComp will recognize the top 50 startups each year and award prizes to help them grow their business.', 'Cape Town, ZA', '2015-10-31', '19:00:00', '20:00:00', 0),
(5, 'JinjaHack', '/img/startup3.png', 'JinjaHack', 1, 'Hack your way through the Jinja challenges and win a case of Jinja Beer!', 'Flenterskloof', '2015-10-31', '12:00:00', '15:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `criteria`
--

CREATE TABLE IF NOT EXISTS `criteria` (
  `id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `criteria`
--

INSERT INTO `criteria` (`id`, `competition_id`, `name`, `description`) VALUES
(1, 1, 'Value Proposition', 'What problem are you solving, for whom?'),
(2, 1, 'Product', 'How easy is it to use, how well is it built?'),
(3, 1, 'Business Model', 'How will you make money? How much? When?'),
(4, 1, 'Unfair advantage', 'Why the team needs to build this thing and why now? '),
(5, 1, 'Innovation', 'Why is this so cool?'),
(6, 1, 'Pitch', 'How good are you at convincing me that this is the best thing ever?'),
(7, 1, 'Scale', 'Majority market vs local vs US');

-- --------------------------------------------------------

--
-- Table structure for table `entrants`
--

CREATE TABLE IF NOT EXISTS `entrants` (
  `id` int(11) NOT NULL,
  `startup_id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  `judged` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `entrants`
--

INSERT INTO `entrants` (`id`, `startup_id`, `competition_id`, `judged`) VALUES
(6, 14, 5, 0),
(7, 15, 1, 0),
(8, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `judges`
--

CREATE TABLE IF NOT EXISTS `judges` (
  `id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `judges`
--

INSERT INTO `judges` (`id`, `competition_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL,
  `entrant_id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  `judge_id` int(11) NOT NULL,
  `criteria_id` int(11) NOT NULL,
  `points` int(20) NOT NULL,
  `feedback` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `entrant_id`, `competition_id`, `judge_id`, `criteria_id`, `points`, `feedback`) VALUES
(1, 8, 1, 1, 1, 4, ''),
(2, 8, 1, 1, 2, 4, ''),
(3, 8, 1, 1, 3, 0, ''),
(4, 8, 1, 1, 4, 3, ''),
(5, 8, 1, 1, 5, 3, ''),
(6, 8, 1, 1, 6, 0, ''),
(7, 8, 1, 1, 7, 4, ''),
(8, 8, 1, 1, 1, 2, ''),
(9, 8, 1, 1, 2, 3, ''),
(10, 8, 1, 1, 3, 3, ''),
(11, 8, 1, 1, 4, 3, ''),
(12, 8, 1, 1, 5, 3, ''),
(13, 8, 1, 1, 6, 2, ''),
(14, 8, 1, 1, 7, 3, '');

-- --------------------------------------------------------

--
-- Table structure for table `startup`
--

CREATE TABLE IF NOT EXISTS `startup` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `image_url` text NOT NULL,
  `location` varchar(60) NOT NULL,
  `industry` varchar(45) NOT NULL,
  `sector` varchar(3) NOT NULL,
  `employees` int(11) NOT NULL,
  `stage` varchar(30) NOT NULL,
  `turnover` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `startup`
--

INSERT INTO `startup` (`id`, `name`, `image_url`, `location`, `industry`, `sector`, `employees`, `stage`, `turnover`) VALUES
(1, 'Buber', '/img/startup3.png', 'Cape Town, ZA', 'Tech', 'B2C', 10, 'Startup', 0),
(14, 'Pokemonster', '/img/poke.jpg', 'Kyoto, Jpn', 'Manga', 'B2C', 121, 'Medium', 2300000),
(15, 'NinjaHeads', '/img/startup.gif', 'Tokyo, Jpn', 'Assassination', 'B2C', 2, 'Advanced', 1e15);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `type`) VALUES
(1, 'tar', 'tar', 2),
(2, 'aya', 'aya', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `competition`
--
ALTER TABLE `competition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `criteria`
--
ALTER TABLE `criteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `entrants`
--
ALTER TABLE `entrants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `judges`
--
ALTER TABLE `judges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `startup`
--
ALTER TABLE `startup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `competition`
--
ALTER TABLE `competition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `criteria`
--
ALTER TABLE `criteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `entrants`
--
ALTER TABLE `entrants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `judges`
--
ALTER TABLE `judges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `startup`
--
ALTER TABLE `startup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
