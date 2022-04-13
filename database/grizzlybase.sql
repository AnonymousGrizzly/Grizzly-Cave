-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2022 at 05:43 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grizzlybase`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `file_id` int(11) NOT NULL,
  `filename` varchar(64) NOT NULL,
  `filesize` int(11) NOT NULL,
  `filetype` varchar(64) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `modified_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  `folder_id` int(11) DEFAULT NULL,
  `sanitized_name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`file_id`, `filename`, `filesize`, `filetype`, `deleted`, `modified_at`, `created_at`, `user_id`, `folder_id`, `sanitized_name`) VALUES
(17, 'polar-bear.svg', 45803, 'image/svg+xml', 0, '2022-03-21 17:33:59', '2022-03-21 17:33:59', 21, NULL, '71235ded5de2d50ead44d31f22b28920.svg'),
(18, 'ZANR__ZGODOVINSKI_ROMAN_4_1.docx', 23065, 'application/vnd.openxmlformats-officedocument.wordprocessingml.d', 0, '2022-04-08 20:43:44', '2022-04-08 20:43:44', 21, NULL, '99780fc756e5e215a4354bb267154265.docx'),
(19, 'ZANR__ZGODOVINSKI_ROMAN_4_1.docx', 23065, 'application/vnd.openxmlformats-officedocument.wordprocessingml.d', 0, '2022-04-08 20:43:56', '2022-04-08 20:43:56', 21, NULL, '56930b3ee25356a9252d07169605520b.docx'),
(20, 'ZANR__ZGODOVINSKI_ROMAN_4_1.docx', 23065, 'application/vnd.openxmlformats-officedocument.wordprocessingml.d', 0, '2022-04-08 20:45:22', '2022-04-08 20:45:22', 21, NULL, 'a1ad0114ea732c9b945b572a1377a277.docx'),
(21, 'ZANR__ZGODOVINSKI_ROMAN_4_1.docx', 23065, 'application/vnd.openxmlformats-officedocument.wordprocessingml.d', 0, '2022-04-08 20:45:46', '2022-04-08 20:45:46', 17, NULL, 'a1ad0114ea732c9b945b572a1377a277.docx'),
(22, 'anastazija_earrape.mp3', 596328, 'audio/mpeg', 0, '2022-04-08 20:56:19', '2022-04-08 20:56:19', 17, NULL, '2f8b9712af6d2cc293a82cc936c596b9.mp3'),
(23, 'anastazija_earrape.mp3', 596328, 'audio/mpeg', 1, '2022-04-08 20:57:13', '2022-04-08 20:57:13', 21, NULL, '2f8b9712af6d2cc293a82cc936c596b9.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `folder_id` int(11) NOT NULL,
  `foldername` varchar(64) NOT NULL,
  `parentfolder_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `modified_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `folders`
--

INSERT INTO `folders` (`folder_id`, `foldername`, `parentfolder_id`, `created_at`, `deleted`, `modified_at`, `user_id`) VALUES
(9, 'neki', NULL, '2022-03-20 18:06:42', 0, '2022-03-20 18:06:42', 21);

-- --------------------------------------------------------

--
-- Table structure for table `packets`
--

CREATE TABLE `packets` (
  `packet_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `sender_id` int(11) NOT NULL,
  `edit_perm` tinyint(1) NOT NULL DEFAULT 1,
  `created_packet` datetime NOT NULL DEFAULT current_timestamp(),
  `short_message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created`, `modified`) VALUES
(17, 'Neva', 'neva.accetto@yahoo.com', '$2y$10$udKDaaflc1YADdImOrCUJeSYR53sk8wba9gJGizBPKi/5Qh3Zq7UO', '2022-03-19 12:34:12', '2022-03-19 11:34:12'),
(21, 'Test1', 'test1@gmail.com', '$2y$10$7mmfaE339gV/nvg.Cc6PcuxtSRcmSbozrxzXK/CoyTBBkTlZMbF6O', '2022-03-20 18:06:33', '2022-03-20 17:06:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `folder_id` (`folder_id`);

--
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`folder_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parentfolder_id` (`parentfolder_id`);

--
-- Indexes for table `packets`
--
ALTER TABLE `packets`
  ADD PRIMARY KEY (`packet_id`),
  ADD KEY `file_id` (`file_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `folders`
--
ALTER TABLE `folders`
  MODIFY `folder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `packets`
--
ALTER TABLE `packets`
  MODIFY `packet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_2` FOREIGN KEY (`folder_id`) REFERENCES `folders` (`folder_id`),
  ADD CONSTRAINT `files_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `folders`
--
ALTER TABLE `folders`
  ADD CONSTRAINT `folders_ibfk_2` FOREIGN KEY (`parentfolder_id`) REFERENCES `folders` (`folder_id`),
  ADD CONSTRAINT `folders_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `packets`
--
ALTER TABLE `packets`
  ADD CONSTRAINT `packets_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `packets_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `packets_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
