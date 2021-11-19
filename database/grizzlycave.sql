-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Gostitelj: 127.0.0.1
-- Čas nastanka: 19. nov 2021 ob 13.49
-- Različica strežnika: 10.4.11-MariaDB
-- Različica PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Zbirka podatkov: `grizzlycave`
--

-- --------------------------------------------------------

--
-- Struktura tabele `files`
--

CREATE TABLE `files` (
  `file_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `filesize` int(11) NOT NULL,
  `filetype` varchar(64) NOT NULL,
  `user_id` int(11) NOT NULL,
  `folder_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `lastchange` datetime NOT NULL,
  `file_location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabele `folders`
--

CREATE TABLE `folders` (
  `folder_id` int(11) NOT NULL,
  `foldername` varchar(64) NOT NULL,
  `parentfolder_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `modified_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabele `packets`
--

CREATE TABLE `packets` (
  `packet_id` int(11) NOT NULL,
  `file_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `edit_permit` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabele `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indeksi zavrženih tabel
--

--
-- Indeksi tabele `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `folder_id` (`folder_id`),
  ADD KEY `created_at` (`created_at`);
ALTER TABLE `files` ADD FULLTEXT KEY `filename` (`filename`);

--
-- Indeksi tabele `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`folder_id`),
  ADD KEY `parentfolder_id` (`parentfolder_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksi tabele `packets`
--
ALTER TABLE `packets`
  ADD PRIMARY KEY (`packet_id`),
  ADD KEY `file_id` (`file_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indeksi tabele `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT zavrženih tabel
--

--
-- AUTO_INCREMENT tabele `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT tabele `folders`
--
ALTER TABLE `folders`
  MODIFY `folder_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT tabele `packets`
--
ALTER TABLE `packets`
  MODIFY `packet_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT tabele `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Omejitve tabel za povzetek stanja
--

--
-- Omejitve za tabelo `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `files_ibfk_2` FOREIGN KEY (`folder_id`) REFERENCES `folders` (`folder_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omejitve za tabelo `folders`
--
ALTER TABLE `folders`
  ADD CONSTRAINT `folders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `folders_ibfk_2` FOREIGN KEY (`parentfolder_id`) REFERENCES `folders` (`folder_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omejitve za tabelo `packets`
--
ALTER TABLE `packets`
  ADD CONSTRAINT `packets_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `files` (`file_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `packets_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
