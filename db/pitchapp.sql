-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 12, 2015 at 02:08 PM
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `competition`
--

INSERT INTO `competition` (`id`, `name`, `image_url`, `organizer`, `entrants`, `description`, `location`, `date`, `start_time`, `end_time`) VALUES
(1, 'NinjaComp 2015', '/img/startup.png', 'NinjaComps', 0, 'NinjaComp is a competition to recognize and reward startups and the entrepreneurs behind them. Held as part of Global Entrepreneurship Week, NinjaComp will recognize the top 50 startups each year and award prizes to help them grow their business.', 'Cape Town, ZA', '2015-10-31', '19:00:00', '20:00:00'),
(5, 'JinjaHack', '/img/startup3.png', 'JinjaHack', 1, 'Hack your way through the Jinja challenges and win a case of Jinja Beer!', 'Flenterskloof', '2015-10-31', '12:00:00', '15:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `entrants`
--

CREATE TABLE IF NOT EXISTS `entrants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startup_id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `entrants`
--

INSERT INTO `entrants` (`id`, `startup_id`, `competition_id`) VALUES
(2, 10, 1);

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
  `val_prop` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `business_model` int(11) NOT NULL,
  `advantage` int(11) NOT NULL,
  `innovation` int(11) NOT NULL,
  `pitch` int(11) NOT NULL,
  `scale` int(11) NOT NULL,
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `startup`
--

INSERT INTO `startup` (`id`, `name`, `image_url`, `location`, `industry`, `sector`, `employees`, `stage`, `turnover`) VALUES
(1, 'Buber', '/img/startup3.png', 'Cape Town, ZA', 'Tech', 'B2C', 10, 'Startup', 0),
(10, 'Scooby Doo', '/img/judy.jpg', 'USA', 'Ghost Hunting', 'B2B', 5, 'Medium', 6000000);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
