-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 24-Fev-2023 às 15:50
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
  `cep_adress` varchar(15) NOT NULL,
  `number_adress` varchar(15) NOT NULL,
  `id_zone_adress` int NOT NULL,
  `street_adress` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `name` (`name`),
  KEY `fk_id_zone_adress` (`id_zone_adress`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `entities`
--

INSERT INTO `entities` (`id`, `code`, `name`, `phone`, `name_manager`, `phone_manager`, `district_adress`, `cep_adress`, `number_adress`, `id_zone_adress`, `street_adress`) VALUES
(1, '44001', 'Semec GERÊNCIA DE AMINISTRAÇÃO', '(86)988', 'Raphael', '', '', '0', '0', 2, ''),
(2, '', '', '', '', '', '', '0', '0', 1, ''),
(3, '44003', 'Semec GERÊNCIA DE ASSISTÊNCIA AO EDUCANDO', '(86)999', 'Hermanoteu', '', '', '0', '0', 3, ''),
(4, '44004', 'GABINETE', '(86) 999', 'Lurdes', '', '', '0', '0', 4, ''),
(5, '44005', 'GERÊNCIA DE INFORMÁTICA', '(86) 988', 'Theresa', '', '', '0', '0', 2, ''),
(6, '44009', 'Semec Gerência de Manutenção e Conserva', '(86)999', 'Pedro', '(86)945', 'Bairro Alencar', '65465', '546', 2, 'Rua Lizandro'),
(7, '44016', 'Semec Gerência de Gestão Escolar', '(86)9494', 'Luis', '', '', '48541', '0', 1, ''),
(8, '44032', 'CMEI ABC', '(86) 98754-6456', 'Marcos', '(00) 00000-0000', 'Centro', '64000-300', '0', 4, 'Avenida Campos Sales'),
(9, '44033', 'CMEI Danielzinho', '(86)999', 'José Marcos', '', '', '64000', '0', 3, 'Rua Aureolino'),
(10, '44064', 'CMEI Geovane Prado', '(86)999', 'Ricardo', '', '', '64000', '0', 1, 'Rua Elizandro Marques');

-- --------------------------------------------------------

--
-- Estrutura da tabela `external_scheduling`
--

DROP TABLE IF EXISTS `external_scheduling`;
CREATE TABLE IF NOT EXISTS `external_scheduling` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_machine_es` int DEFAULT NULL,
  `problem` text NOT NULL,
  `date_scheduling` date NOT NULL,
  `id_user_es` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `id_entity_es` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_machine_es` (`id_machine_es`),
  KEY `fk_id_user_es` (`id_user_es`),
  KEY `fk_id_entity_se` (`id_entity_es`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `external_scheduling`
--

INSERT INTO `external_scheduling` (`id`, `id_machine_es`, `problem`, `date_scheduling`, `id_user_es`, `comment`, `id_entity_es`) VALUES
(2, 19, 'estabilizador queimado', '2023-01-26', 2, 'njibhjb', 3),
(3, 13, 'faafssf', '2023-01-27', 3, 'afsdfas', 4),
(4, 1, 'ok', '2023-01-30', 1, 'nao ok', 1),
(5, 3, 'EEEEE', '2023-01-30', 3, 'EEEE', 3),
(13, NULL, 'fadfsa', '2023-02-10', 3, NULL, 10),
(14, 21, 'dois que nao sabe', '2023-02-06', 1, '?', 8),
(15, 2, 'hibuv', '2023-02-14', 2, NULL, 3),
(16, 3, '000', '2023-02-17', 2, '000', 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `historic_machines`
--

DROP TABLE IF EXISTS `historic_machines`;
CREATE TABLE IF NOT EXISTS `historic_machines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_machine_h` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_entity_h` int NOT NULL,
  `action` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_machine_h` (`id_machine_h`),
  KEY `fk_id_entity_h` (`id_entity_h`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `historic_machines`
--

INSERT INTO `historic_machines` (`id`, `id_machine_h`, `date`, `id_entity_h`, `action`) VALUES
(1, 18, '0000-00-00 00:00:00', 5, 'Adicionado'),
(2, 19, '2023-01-24 11:28:55', 4, 'Adicionado'),
(4, 7, '2023-01-24 11:48:53', 1, 'Atualizado'),
(5, 8, '2023-01-24 12:35:50', 1, 'Atualizado'),
(6, 15, '2023-01-31 08:04:28', 4, 'Atualizado'),
(7, 15, '2023-01-31 08:05:19', 2, 'Atualizado'),
(8, 15, '2023-01-31 08:05:54', 5, 'Atualizado'),
(9, 8, '2023-02-02 07:36:46', 6, 'Atualizado'),
(10, 5, '2023-02-02 08:47:01', 10, 'Atualizado'),
(11, 1, '2023-02-02 11:01:31', 8, 'Atualizado'),
(12, 21, '2023-02-07 08:16:25', 2, 'Adicionado'),
(13, 22, '2023-02-07 12:11:26', 8, 'Adicionado'),
(14, 1, '2023-02-04 09:13:47', 3, 'Atualizado'),
(15, 1, '2023-02-04 09:15:20', 4, 'Atualizado'),
(16, 1, '2023-02-23 10:19:56', 9, 'Atualizado'),
(17, 1, '2023-02-24 08:00:12', 10, 'Atualizado');

-- --------------------------------------------------------

--
-- Estrutura da tabela `input_equipment`
--

DROP TABLE IF EXISTS `input_equipment`;
CREATE TABLE IF NOT EXISTS `input_equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_machine_ie` int NOT NULL,
  `problem` text NOT NULL,
  `date_input` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_exit` datetime DEFAULT NULL,
  `service_performed` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `id_user_ie` int DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `id_entity_ie` int NOT NULL,
  `peripheral` varchar(5) NOT NULL DEFAULT 'NÃO',
  `responsable` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone_responsable` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_second_user_ie` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_machine_ie` (`id_machine_ie`),
  KEY `fk_id_user_ie` (`id_user_ie`),
  KEY `fk_id_entity_ie` (`id_entity_ie`),
  KEY `fk_id_secund_user_ie` (`id_second_user_ie`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `input_equipment`
--

INSERT INTO `input_equipment` (`id`, `id_machine_ie`, `problem`, `date_input`, `date_exit`, `service_performed`, `id_user_ie`, `comment`, `id_entity_ie`, `peripheral`, `responsable`, `phone_responsable`, `id_second_user_ie`) VALUES
(33, 3, 'Voce nao sabe nem eu', '2023-02-17 12:18:00', '2023-02-17 12:19:40', 'Rapaz eu ja disse que nao sei', 3, 'Nao sei nem o que comentar', 3, 'NÃO', 'Irineu VOce Nao Sabe', '(86) 99999-9999', 2),
(34, 19, 'dffgddddddddddddddddddddddddddg', '2023-02-17 12:59:00', '2023-02-17 13:04:15', 'kjjjjjjjjjjjjjjjjjjj', 2, NULL, 4, 'SIM', 'Pedro Araujo', '(86) 99999-9999', NULL),
(35, 13, 'nao identificado', '2023-02-23 08:23:00', '2023-02-04 07:25:44', 'nao identificado', 1, NULL, 4, 'SIM', 'Otilio Paulo', '(86) 988', 3),
(36, 22, 'hd danificado', '2023-01-31 11:24:00', '2023-02-23 12:38:00', 'troca de hd', 2, NULL, 8, 'SIM', 'Almir', '(86) 3232', 1),
(37, 3, 'dasdasdasdasd', '2023-02-24 10:20:00', '2023-02-24 10:47:26', 'VHGVHIUHI', 2, NULL, 3, 'NÃO', 'ewadsasasa', '(86) 66666-6666', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `machines`
--

DROP TABLE IF EXISTS `machines`;
CREATE TABLE IF NOT EXISTS `machines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `num_serial` varchar(100) NOT NULL,
  `model` text NOT NULL,
  `description` text NOT NULL,
  `id_type_m` int NOT NULL,
  `id_entities_m` int NOT NULL,
  `id_status_m` int NOT NULL,
  `maintenance` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `num_serial` (`num_serial`),
  KEY `fk_id_type_m` (`id_type_m`),
  KEY `fk_id_entities_m` (`id_entities_m`),
  KEY `fk_id_status_m` (`id_status_m`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `machines`
--

INSERT INTO `machines` (`id`, `num_serial`, `model`, `description`, `id_type_m`, `id_entities_m`, `id_status_m`, `maintenance`) VALUES
(1, 'EBN4648822', 'INTEL HARDCORDE', 'desc', 1, 10, 1, 0),
(2, 'INT-001', 'Multi PRC 110', '4gb ram, i5 6754', 5, 3, 2, 0),
(3, 'ACER-TES-001', 'ACER 001', '8gb Ram i9 8989', 3, 3, 0, 0),
(5, 'POS-140', 'Positivo 140', 'Celeron 3040, 2gb Ram', 1, 10, 0, 0),
(7, 'I-82346', 'IBM 9547', '1gb Ram', 1, 1, 0, 0),
(8, 'J73246', 'IBM-23615', '2gb Ram', 1, 6, 1, 0),
(9, 'PO-5554', 'Positivo 5554', '1gb Ram', 5, 2, 0, 0),
(13, 'GH-3256', 'GigaByte 2671', '8gb Ram', 6, 4, 2, 0),
(14, 'D45335', 'D4324', 'gfggdffg', 3, 1, 0, 0),
(15, 'E234', 'E432', '', 5, 5, 1, 0),
(16, 'D43224', 'D43223', '8gb', 2, 1, 0, 0),
(17, 'Y5453', '31211231', '3232', 6, 2, 2, 0),
(18, 'IU-573', 'Inietdn38233', '8gb i879', 1, 5, 0, 0),
(19, 'POL08328', '32141332', '565464564', 4, 4, 0, 0),
(21, 'BLG5404100', 'I5-10400F ', '2.9GHZ, INTEL', 1, 2, 2, 0),
(22, 'TLH9545581', 'fsdfsf', 'sads', 2, 8, 1, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `service_internal`
--

DROP TABLE IF EXISTS `service_internal`;
CREATE TABLE IF NOT EXISTS `service_internal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_machine_si` int DEFAULT NULL,
  `id_entity_si` int NOT NULL,
  `problem` text NOT NULL,
  `id_user_si` int NOT NULL,
  `service_performed` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_machine_si` (`id_machine_si`),
  KEY `fk_id_user_si` (`id_user_si`),
  KEY `fk_id_entity_si` (`id_entity_si`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `service_internal`
--

INSERT INTO `service_internal` (`id`, `id_machine_si`, `id_entity_si`, `problem`, `id_user_si`, `service_performed`) VALUES
(6, 15, 2, '', 3, ''),
(7, NULL, 3, 'agdfsgdf', 3, 'fdsgsdgsdg'),
(8, 18, 5, '', 2, 'um ai '),
(9, NULL, 2, '', 2, 'sei la'),
(10, NULL, 1, '', 1, ''),
(11, 19, 4, '', 2, ''),
(12, NULL, 8, 'yt', 2, 'desf');

-- --------------------------------------------------------

--
-- Estrutura da tabela `status_machine`
--

DROP TABLE IF EXISTS `status_machine`;
CREATE TABLE IF NOT EXISTS `status_machine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `color` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `status_machine`
--

INSERT INTO `status_machine` (`id`, `name`, `color`) VALUES
(0, 'INATIVO', '#6F425D'),
(1, 'ATIVO', '#005B55'),
(2, 'AGUARDANDO', '#3B5178');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `type_machine`
--

INSERT INTO `type_machine` (`id`, `name`) VALUES
(1, 'Computador Desktop'),
(4, 'Estabilizador'),
(2, 'Impressora'),
(6, 'Nobreak'),
(5, 'Notebook'),
(3, 'Projetor');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `nickname`, `password`, `realname`) VALUES
(1, 'user01', '123', 'primeiro'),
(2, 'user02', '456', 'segundo'),
(3, 'user03', '789', 'terceiro');

-- --------------------------------------------------------

--
-- Estrutura da tabela `zone`
--

DROP TABLE IF EXISTS `zone`;
CREATE TABLE IF NOT EXISTS `zone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `color` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `zone`
--

INSERT INTO `zone` (`id`, `name`, `color`) VALUES
(1, 'LESTE', '#493964'),
(2, 'NORTE', '#316579'),
(3, 'SUDESTE', '#419BBC'),
(4, 'SUL', '#4C8076');

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `entities`
--
ALTER TABLE `entities`
  ADD CONSTRAINT `fk_id_zone_adress` FOREIGN KEY (`id_zone_adress`) REFERENCES `zone` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `external_scheduling`
--
ALTER TABLE `external_scheduling`
  ADD CONSTRAINT `fk_id_entity_se` FOREIGN KEY (`id_entity_es`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_id_machine_es` FOREIGN KEY (`id_machine_es`) REFERENCES `machines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_user_es` FOREIGN KEY (`id_user_es`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `historic_machines`
--
ALTER TABLE `historic_machines`
  ADD CONSTRAINT `fk_id_entity_h` FOREIGN KEY (`id_entity_h`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_machine_h` FOREIGN KEY (`id_machine_h`) REFERENCES `machines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `input_equipment`
--
ALTER TABLE `input_equipment`
  ADD CONSTRAINT `fk_id_entity_ie` FOREIGN KEY (`id_entity_ie`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_machine_ie` FOREIGN KEY (`id_machine_ie`) REFERENCES `machines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_secund_user_ie` FOREIGN KEY (`id_second_user_ie`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_id_user_ie` FOREIGN KEY (`id_user_ie`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `machines`
--
ALTER TABLE `machines`
  ADD CONSTRAINT `fk_id_entities_m` FOREIGN KEY (`id_entities_m`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_status_m` FOREIGN KEY (`id_status_m`) REFERENCES `status_machine` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_type_m` FOREIGN KEY (`id_type_m`) REFERENCES `type_machine` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Limitadores para a tabela `service_internal`
--
ALTER TABLE `service_internal`
  ADD CONSTRAINT `fk_id_entity_si` FOREIGN KEY (`id_entity_si`) REFERENCES `entities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_machine_si` FOREIGN KEY (`id_machine_si`) REFERENCES `machines` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_user_si` FOREIGN KEY (`id_user_si`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
