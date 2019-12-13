-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: SIMS
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
-- Table structure for table `AdminMenu`
--

DROP TABLE IF EXISTS `AdminMenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AdminMenu` (
  `menuid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`menuid`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='管理员菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Character`
--

DROP TABLE IF EXISTS `Character`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Character` (
  `stateId` int(11) NOT NULL AUTO_INCREMENT,
  `info` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`stateId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Class`
--

DROP TABLE IF EXISTS `Class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classCode` varchar(45) DEFAULT NULL COMMENT '班级编号',
  `className` varchar(45) DEFAULT NULL COMMENT '班级名称',
  `createMessage` varchar(45) DEFAULT NULL COMMENT '创建人',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gradeId` int(11) DEFAULT NULL COMMENT '年级ID(关联年级表)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `classCode_UNIQUE` (`classCode`),
  KEY `fk_cla_gra_id_idx` (`gradeId`),
  CONSTRAINT `fk_cla_gra_id` FOREIGN KEY (`gradeId`) REFERENCES `Grade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='班级表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Grade`
--

DROP TABLE IF EXISTS `Grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gradeCode` varchar(45) DEFAULT NULL COMMENT '年级编号',
  `gradeName` varchar(45) DEFAULT NULL COMMENT '年级名称',
  `createMessage` varchar(45) DEFAULT NULL COMMENT '创建人',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `gradeCode_UNIQUE` (`gradeCode`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='年级表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Login`
--

DROP TABLE IF EXISTS `Login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL COMMENT '登录帐号(内置管理员帐号：admin、root)',
  `pwd` varchar(500) DEFAULT NULL COMMENT '登录密码(内置管理员密码：123456)',
  `stateId` int(11) DEFAULT NULL COMMENT '角色(关联角色表)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_log_cha_id_idx` (`stateId`),
  CONSTRAINT `fk_log_cha_id` FOREIGN KEY (`stateId`) REFERENCES `Character` (`stateId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8 COMMENT='登陆';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Menu`
--

DROP TABLE IF EXISTS `Menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Menu` (
  `menuId` int(11) NOT NULL AUTO_INCREMENT,
  `menuName` varchar(45) DEFAULT NULL,
  `Parent` int(11) DEFAULT NULL COMMENT '父级',
  `url` varchar(45) DEFAULT NULL COMMENT '地址指向',
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Result`
--

DROP TABLE IF EXISTS `Result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subId` int(11) DEFAULT NULL COMMENT '科目id（关联科目）',
  `sid` int(11) DEFAULT NULL COMMENT '学生id',
  `stuCode` varchar(45) NOT NULL,
  `result` double DEFAULT '0' COMMENT '学生成绩',
  PRIMARY KEY (`id`),
  KEY `fk_res_sub_id_idx` (`subId`),
  KEY `fk_res_stu_id_idx` (`sid`),
  CONSTRAINT `fk_res_stu_id` FOREIGN KEY (`sid`) REFERENCES `Student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_res_sub_id` FOREIGN KEY (`subId`) REFERENCES `Subject` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='成绩表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` char(2) DEFAULT NULL,
  `QQ` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stuCode_UNIQUE` (`code`),
  UNIQUE KEY `stuQQ_UNIQUE` (`QQ`),
  UNIQUE KEY `stuPhone_UNIQUE` (`phone`),
  KEY `fk_stu_cla_id_idx` (`classId`),
  CONSTRAINT `fk_stu_cla_id` FOREIGN KEY (`classId`) REFERENCES `Class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_stu_log_code` FOREIGN KEY (`code`) REFERENCES `Login` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='学生表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `StudentMenu`
--

DROP TABLE IF EXISTS `StudentMenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudentMenu` (
  `menuId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COMMENT='学生菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Subject`
--

DROP TABLE IF EXISTS `Subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectCode` varchar(45) DEFAULT NULL COMMENT '编号',
  `subjectName` varchar(45) DEFAULT NULL COMMENT '名称',
  `createMessage` varchar(45) DEFAULT NULL COMMENT '创建人',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gradeId` int(11) DEFAULT NULL COMMENT '年级ID(关联年级表)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `subjectCode_UNIQUE` (`subjectCode`),
  KEY `fk_sub_gra_id_idx` (`gradeId`),
  CONSTRAINT `fk_sub_gra_id` FOREIGN KEY (`gradeId`) REFERENCES `Grade` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='科目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Teacher`
--

DROP TABLE IF EXISTS `Teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL COMMENT '登录帐号(关联登陆账号)',
  `name` varchar(45) DEFAULT NULL COMMENT '姓名',
  `sex` char(2) DEFAULT NULL COMMENT '性别',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `education` varchar(100) DEFAULT NULL COMMENT '学历',
  `goodAt` varchar(100) DEFAULT NULL COMMENT '擅长',
  `phone` varchar(45) DEFAULT NULL COMMENT '电话',
  `QQ` varchar(45) DEFAULT NULL COMMENT 'qq',
  `email` varchar(45) DEFAULT NULL COMMENT 'E-mail',
  `address` varchar(100) DEFAULT '不详' COMMENT '地址',
  `introduction` varchar(100) DEFAULT NULL COMMENT '个人简介',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tCode_UNIQUE` (`code`),
  UNIQUE KEY `tPhone_UNIQUE` (`phone`),
  UNIQUE KEY `tQQ_UNIQUE` (`QQ`),
  CONSTRAINT `fk_tea_log_code` FOREIGN KEY (`code`) REFERENCES `Login` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8 COMMENT='教师表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TeacherClass`
--

DROP TABLE IF EXISTS `TeacherClass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TeacherClass` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tId` int(11) DEFAULT NULL COMMENT '教师id（关联教师）',
  `classId` int(11) DEFAULT NULL COMMENT '班级id（关联班级）',
  `subId` int(11) DEFAULT NULL COMMENT '科目id（关联科目）',
  PRIMARY KEY (`id`),
  KEY `fk_teaCla_sub_id_idx` (`subId`),
  KEY `fk_teaCla_tea_id_idx` (`tId`),
  KEY `fk_teaCla_cla_id_idx` (`classId`),
  CONSTRAINT `fk_teaCla_cla_id` FOREIGN KEY (`classId`) REFERENCES `Class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_teaCla_sub_id` FOREIGN KEY (`subId`) REFERENCES `Subject` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_teaCla_tea_id` FOREIGN KEY (`tId`) REFERENCES `Teacher` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='教师班级关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TeacherMenu`
--

DROP TABLE IF EXISTS `TeacherMenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TeacherMenu` (
  `menuId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='教师菜单';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-13 19:21:22
