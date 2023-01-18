-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 18-Jan-2023 às 13:37
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dmei_sys`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `entities`
--

DROP TABLE IF EXISTS `entities`;
CREATE TABLE IF NOT EXISTS `entities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `name_manager` varchar(100) NOT NULL,
  `phone_manager` varchar(50) NOT NULL,
  `district_adress` varchar(50) NOT NULL,
  `cep_adress` int NOT NULL,
  `number_adress` int NOT NULL,
  `zone_adress` varchar(50) NOT NULL,
  `street_adress` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `external_scheduling`
--

DROP TABLE IF EXISTS `external_scheduling`;
CREATE TABLE IF NOT EXISTS `external_scheduling` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_machine_es` int NOT NULL,
  `problem` text NOT NULL,
  `date_ scheduling` date NOT NULL,
  `id_ user_es` int NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_machine_es` (`id_machine_es`),
  KEY `fk_id_user_es` (`id_ user_es`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `historic_machines`
--

DROP TABLE IF EXISTS `historic_machines`;
CREATE TABLE IF NOT EXISTS `historic_machines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_machine` int NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_machine` (`id_machine`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `input_equipment`
--

DROP TABLE IF EXISTS `input_equipment`;
CREATE TABLE IF NOT EXISTS `input_equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_machine_ie` int NOT NULL,
  `problem` text NOT NULL,
  `date_input` date NOT NULL,
  `date_exit` date NOT NULL,
  `service_performed` text NOT NULL,
  `id_ user_ie` int NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_machine_ie` (`id_machine_ie`),
  KEY `fk_id_user_ie` (`id_ user_ie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `machines`
--

DROP TABLE IF EXISTS `machines`;
CREATE TABLE IF NOT EXISTS `machines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `num_serial` int NOT NULL,
  `model` text NOT NULL,
  `description` text NOT NULL,
  `id_type` int NOT NULL,
  `id_entity` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`num_serial`),
  KEY `fk_id_type` (`id_type`),
  KEY `fk_id_entities` (`id_entity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `service_internal`
--

DROP TABLE IF EXISTS `service_internal`;
CREATE TABLE IF NOT EXISTS `service_internal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_machine_si` int NOT NULL,
  `problem` text NOT NULL,
  `id_ user_si` int NOT NULL,
  `service_performed` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_machine_si` (`id_machine_si`),
  KEY `fk_id_user_si` (`id_ user_si`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `type_machine`
--

DROP TABLE IF EXISTS `type_machine`;
CREATE TABLE IF NOT EXISTS `type_machine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `realname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `nickname`, `password`, `realname`) VALUES
(1, 'usuario1', '123', 'primeiro'),
(2, 'usuario2', '456', 'segundo');

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `external_scheduling`
--
ALTER TABLE `external_scheduling`
  ADD CONSTRAINT `fk_id_machine_es` FOREIGN KEY (`id_machine_es`) REFERENCES `machines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_user_es` FOREIGN KEY (`id_ user_es`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `historic_machines`
--
ALTER TABLE `historic_machines`
  ADD CONSTRAINT `fk_id_maquine` FOREIGN KEY (`id_machine`) REFERENCES `machines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `input_equipment`
--
ALTER TABLE `input_equipment`
  ADD CONSTRAINT `fk_id_machine_ie` FOREIGN KEY (`id_machine_ie`) REFERENCES `machines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_user_ie` FOREIGN KEY (`id_ user_ie`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `machines`
--
ALTER TABLE `machines`
  ADD CONSTRAINT `fk_id_entities` FOREIGN KEY (`id_entity`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_type` FOREIGN KEY (`id_type`) REFERENCES `type_machine` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `service_internal`
--
ALTER TABLE `service_internal`
  ADD CONSTRAINT `fk_id_machine_si` FOREIGN KEY (`id_machine_si`) REFERENCES `machines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_user_si` FOREIGN KEY (`id_ user_si`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
