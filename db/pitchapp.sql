-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 14, 2015 at 11:10 AM
-- Server version: 5.6.19-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pitchapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `competition`
--

CREATE TABLE IF NOT EXISTS `competition` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `image_url` text NOT NULL,
  `organizer` varchar(60) NOT NULL,
  `entrants` int(11) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(60) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startup_id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `entrants`
--

INSERT INTO `entrants` (`id`, `startup_id`, `competition_id`) VALUES
(6, 14, 5),
(7, 15, 1),
(8, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `judges`
--

CREATE TABLE IF NOT EXISTS `judges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entrant_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entrant_id` int(11) NOT NULL,
  `judge_id` int(11) NOT NULL,
  `criteria_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `startup`
--

CREATE TABLE IF NOT EXISTS `startup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `image_url` text NOT NULL,
  `location` varchar(60) NOT NULL,
  `industry` varchar(45) NOT NULL,
  `sector` varchar(3) NOT NULL,
  `employees` int(11) NOT NULL,
  `stage` varchar(30) NOT NULL,
  `turnover` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `startup`
--

INSERT INTO `startup` (`id`, `name`, `image_url`, `location`, `industry`, `sector`, `employees`, `stage`, `turnover`) VALUES
(1, 'Buber', '/img/startup3.png', 'Cape Town, ZA', 'Tech', 'B2C', 10, 'Startup', 0),
(14, 'Pokemonster', '/img/poke.jpg', 'Kyoto, Jpn', 'Manga', 'B2C', 121, 'Medium', 2300000),
(15, 'NinjaHeads', '/img/startup.gif', 'Tokyo, Jpn', 'Assassination', 'B2C', 2, 'Advanced', 1e15);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
