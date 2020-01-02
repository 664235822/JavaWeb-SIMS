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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='管理员菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminMenu`
--

LOCK TABLES `AdminMenu` WRITE;
/*!40000 ALTER TABLE `AdminMenu` DISABLE KEYS */;
INSERT INTO `AdminMenu` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(14),(15),(17),(18),(23),(27),(28),(29),(34),(35),(36),(37),(38);
/*!40000 ALTER TABLE `AdminMenu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attendance`
--

DROP TABLE IF EXISTS `Attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sId` int(11) DEFAULT NULL COMMENT '学生id',
  `AttendanceType` int(11) DEFAULT NULL COMMENT '考勤类型',
  `AttendanceTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '考勤时间',
  `subId` int(11) DEFAULT NULL COMMENT '科目id',
  `classId` int(11) DEFAULT NULL COMMENT '班级id',
  PRIMARY KEY (`id`),
  KEY `fk_atl_stu_id_idx` (`sId`),
  KEY `fk_atl_sub_id_idx` (`subId`),
  KEY `fk_atl_cla_id_idx` (`classId`),
  KEY `fk_alt_alttype_id_idx` (`AttendanceType`),
  CONSTRAINT `fk_alt_alttype_id` FOREIGN KEY (`AttendanceType`) REFERENCES `AttendanceType` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_atl_cla_id` FOREIGN KEY (`classId`) REFERENCES `Class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_atl_stu_id` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_atl_sub_id` FOREIGN KEY (`subId`) REFERENCES `Subject` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='考勤表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendance`
--

LOCK TABLES `Attendance` WRITE;
/*!40000 ALTER TABLE `Attendance` DISABLE KEYS */;
INSERT INTO `Attendance` VALUES (4,2,2,'2019-12-26 14:22:50',29,2),(5,2,1,'2019-12-26 14:22:50',53,2),(6,19,1,'2019-12-31 11:07:47',28,4),(7,23,2,'2019-12-31 14:06:12',54,15);
/*!40000 ALTER TABLE `Attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AttendanceType`
--

DROP TABLE IF EXISTS `AttendanceType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AttendanceType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `AttendanceType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='考勤类型';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AttendanceType`
--

LOCK TABLES `AttendanceType` WRITE;
/*!40000 ALTER TABLE `AttendanceType` DISABLE KEYS */;
INSERT INTO `AttendanceType` VALUES (1,'签到'),(2,'迟到'),(3,'缺勤'),(4,NULL);
/*!40000 ALTER TABLE `AttendanceType` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `Character`
--

LOCK TABLES `Character` WRITE;
/*!40000 ALTER TABLE `Character` DISABLE KEYS */;
INSERT INTO `Character` VALUES (1,'管理员'),(2,'教师'),(3,'学生');
/*!40000 ALTER TABLE `Character` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='班级表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Class`
--

LOCK TABLES `Class` WRITE;
/*!40000 ALTER TABLE `Class` DISABLE KEYS */;
INSERT INTO `Class` VALUES (2,'201802','二班','admin','2019-12-11 11:06:33',1),(4,'201902','二班','admin','2019-12-11 11:06:32',2),(5,'201903','三班','admin','2019-12-11 11:06:32',2),(6,'202001','一班','admin','2019-12-11 11:06:32',3),(7,'202002','二班','admin','2019-12-11 11:06:32',3),(8,'202003','3班','admin','2019-12-11 11:06:32',3),(9,'202004','4班','admin','2019-12-11 11:06:32',3),(15,'201803','实验班','admin','2019-12-25 12:31:28',1),(16,'201804','奥利给速成班','admin','2019-12-25 12:31:49',1),(17,'201904','aaa','admin','2019-12-31 15:06:47',2),(18,'201905','222','admin','2019-12-31 15:07:05',2);
/*!40000 ALTER TABLE `Class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Grade`
--

DROP TABLE IF EXISTS `Grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gradeCode` int(11) DEFAULT NULL COMMENT '年级编号',
  `gradeName` varchar(45) DEFAULT NULL COMMENT '年级名称',
  `createMessage` varchar(45) DEFAULT NULL COMMENT '创建人',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='年级表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grade`
--

LOCK TABLES `Grade` WRITE;
/*!40000 ALTER TABLE `Grade` DISABLE KEYS */;
INSERT INTO `Grade` VALUES (1,2018,'2018级','admin','2019-12-11 11:06:28'),(2,2019,'2019级','admin','2019-12-11 16:59:07'),(3,2020,'2020级','admin','2019-12-11 16:59:07'),(4,2021,'2021级','admin','2019-12-25 12:43:52'),(7,2022,'2020级','admin','2019-12-26 15:15:22'),(23,2023,'实验班','admin','2019-12-30 09:27:50'),(24,2024,'2056级','admin','2019-12-30 09:28:11'),(25,2025,'实验01级','admin','2019-12-31 09:19:46'),(26,2026,'实验02级','admin','2019-12-31 09:19:55'),(27,2027,'实验03级','admin','2019-12-31 09:20:03'),(28,2028,'实验04级','admin','2019-12-31 09:20:14');
/*!40000 ALTER TABLE `Grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Habit`
--

DROP TABLE IF EXISTS `Habit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Habit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `col1` int(11) DEFAULT NULL,
  `col2` int(11) DEFAULT NULL,
  `col3` int(11) DEFAULT NULL,
  `col4` int(11) DEFAULT NULL,
  `col5` int(11) DEFAULT NULL,
  `col6` int(11) DEFAULT NULL,
  `col7` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Habit`
--

LOCK TABLES `Habit` WRITE;
/*!40000 ALTER TABLE `Habit` DISABLE KEYS */;
INSERT INTO `Habit` VALUES (1,'admin',9,0,0,0,0,0,0);
/*!40000 ALTER TABLE `Habit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Login`
--

DROP TABLE IF EXISTS `Login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL COMMENT '登录帐号(内置管理员帐号：admin、root)',
  `pwd` blob COMMENT '登录密码(内置管理员密码：123456)',
  `stateId` int(11) DEFAULT NULL COMMENT '角色(关联角色表)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_log_cha_id_idx` (`stateId`),
  CONSTRAINT `fk_log_cha_id` FOREIGN KEY (`stateId`) REFERENCES `Character` (`stateId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8 COMMENT='登陆';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Login`
--

LOCK TABLES `Login` WRITE;
/*!40000 ALTER TABLE `Login` DISABLE KEYS */;
INSERT INTO `Login` VALUES (1,'admin',_binary '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',1),(2,'root',_binary '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',1),(10,'t123466',_binary '*B56D0FFDDFA080CA55C5F24A9AFA2C3D751C38FE',2),(15,'t123431',_binary '*171FBD2925C6E250252AABF7DE3A069CDED2F9EE',2),(16,'t123430',_binary '*0769D1BF642196F16C6BB5ADF0E51045C3E5E204',2),(154,'1823001001',_binary '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',3),(155,'1823001002',_binary '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',3),(157,'S2019576743316',_binary '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',3),(168,'t747740',_binary '*97A38FFBA1939C221A7E4055645653B09F0F3180',2),(169,'t116480',_binary '*AFD71914B72AA69E84A7DF1794571C52D2ACF634',2),(170,'S2019577435169',_binary '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',3),(171,'t206422',_binary '*B012E8731FF1DF44F3D8B26837708985278C3CED',2),(172,'t687433',_binary '*ADB9A674879745F64AE64EE0FCF6555B87EC9E84',2),(175,'t543948',_binary '*E2D94A794BAAC2CDBB8C47CE0645805E454C1E10',2),(176,'t545213',_binary '*1495A055082347B835CF380D9638652C48F4721C',2),(177,'t546682',_binary '*0E6C934850332DFD4911E6DC7D3B9894DCCB976C',2),(178,'t547666',_binary '*3A5C4C580B924F8439666A6F6B0587F35A1ABFBE',2),(179,'S2019577763077',_binary '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',3),(180,'S2019577763377',_binary '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9',3),(181,'t285475',_binary '*3A3D7A3FA6BB61DF7075D3F5D0742ED720B5928E',2);
/*!40000 ALTER TABLE `Login` ENABLE KEYS */;
UNLOCK TABLES;

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
  `icon` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Menu`
--

LOCK TABLES `Menu` WRITE;
/*!40000 ALTER TABLE `Menu` DISABLE KEYS */;
INSERT INTO `Menu` VALUES (1,'教师管理',0,NULL,NULL),(2,'权限管理',0,NULL,''),(3,'年级管理',0,NULL,''),(4,'班级管理',0,NULL,''),(5,'科目管理',0,NULL,''),(6,'学生管理',0,NULL,''),(7,'成绩管理',0,NULL,''),(8,'考勤管理',0,NULL,''),(9,'管理教师',1,'ShowTeachers.html','layui-icon-username'),(10,'添加教师用户',1,'AddTeacher.html','layui-icon-add-circle'),(14,'更改权限',2,'SetState.html','layui-icon-auz'),(15,'添加年级',3,'AddGrade.html','layui-icon-add-circle'),(17,'班级管理',4,'ShowClass.html','layui-icon-group'),(18,'添加班级信息',4,'AddClass.html','layui-icon-add-circle'),(23,'科目管理',5,'AddSubject.html','layui-icon-list'),(27,'查看科任老师信息',5,'ShowSubTeachers.html','layui-icon-search'),(28,'管理学生',6,'ShowStudents.html','layui-icon-friends'),(29,'添加学生',6,'AddStudent.html','layui-icon-add-circle'),(34,'查看成绩',7,'ShowResult.html','layui-icon-search'),(35,'录入成绩',7,'AddResult.html','layui-icon-edit'),(36,'考勤管理',8,'ManageAttendance.html','layui-icon-survey'),(37,'查看考勤',8,'ShowAttendance.html','layui-icon-log'),(38,'添加考勤',8,'AddAttendance.html','layui-icon-add-circle');
/*!40000 ALTER TABLE `Menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Result`
--

DROP TABLE IF EXISTS `Result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subId` int(11) DEFAULT NULL COMMENT '科目id（关联科目）',
  `sId` int(11) DEFAULT NULL COMMENT '学生id',
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `result` double DEFAULT '0' COMMENT '学生成绩',
  PRIMARY KEY (`id`),
  KEY `fk_res_sub_id_idx` (`subId`),
  KEY `fk_res_stu_id_idx` (`sId`),
  CONSTRAINT `fk_res_stu_id` FOREIGN KEY (`sId`) REFERENCES `Student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_res_sub_id` FOREIGN KEY (`subId`) REFERENCES `Subject` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COMMENT='成绩表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Result`
--

LOCK TABLES `Result` WRITE;
/*!40000 ALTER TABLE `Result` DISABLE KEYS */;
INSERT INTO `Result` VALUES (33,28,3,'2019-12-30 14:56:29',100),(34,28,19,'2019-12-30 14:56:38',99),(35,28,3,'2019-12-30 19:09:47',100),(36,28,3,'2019-12-30 19:09:47',89);
/*!40000 ALTER TABLE `Result` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `fk_stu_log_code` FOREIGN KEY (`code`) REFERENCES `Login` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='学生表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES (2,'1823001001','张诗禹二',20,'女','1234568','12345678912','123',4),(3,'1823001002','张诗禹三',20,'女','1234569','12345678913','123',4),(19,'S2019576743316','叶七',22,'女','5489726','15489658741','',2),(22,'S2019577763077','张世杰',20,'男','1487325','17849254369','四川乐山',4),(23,'S2019577763377','马化腾',18,'男','5497561','17895423604','北京',15);
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StudentMenu`
--

DROP TABLE IF EXISTS `StudentMenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `StudentMenu` (
  `menuId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='学生菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StudentMenu`
--

LOCK TABLES `StudentMenu` WRITE;
/*!40000 ALTER TABLE `StudentMenu` DISABLE KEYS */;
INSERT INTO `StudentMenu` VALUES (5),(6),(7),(8),(27),(28),(34),(37);
/*!40000 ALTER TABLE `StudentMenu` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COMMENT='科目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subject`
--

LOCK TABLES `Subject` WRITE;
/*!40000 ALTER TABLE `Subject` DISABLE KEYS */;
INSERT INTO `Subject` VALUES (28,'5','英语','admin','2019-12-24 11:26:17',4),(29,'6','数学','admin','2019-12-24 11:28:55',2),(53,'7','语文','admin','2019-12-27 10:25:15',1),(54,'8','地理','admin','2019-12-27 13:44:16',2);
/*!40000 ALTER TABLE `Subject` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `fk_tea_log_code` FOREIGN KEY (`code`) REFERENCES `Login` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8 COMMENT='教师表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher`
--

LOCK TABLES `Teacher` WRITE;
/*!40000 ALTER TABLE `Teacher` DISABLE KEYS */;
INSERT INTO `Teacher` VALUES (6,'t123466','朱洲二','男',22,'专科','计算机','13404098555','664235877','7664235822@qq.com','四川泸州','123'),(11,'t123431','朱洲三','女',22,'小学','计算机','13404098586','664235897','9764235822@qq.com','四川泸州','123'),(12,'t123430','朱洲一','男',22,'专科','计算机','13404098585','664235896','9664235822@qq.com','四川泸州','123'),(83,'t747740','我的','男',20,'博士','把你骨灰都给你扬了','12345678911','2131145','2583115662@qq.com','c',''),(84,'t116480','贵五','男',11,'小学','111','13689615779','1245676','1111@123.com','111','111'),(85,'t206422','沙六','男',22,'初中','11','12345678911','1111112','1111@163.com','11','11'),(86,'t687433','王铁汁','男',26,'博士','铁汁干就完了','17844656964','2581002680','251009301@qq.com','四川自贡','铁汁干就完了'),(89,'t543948','张欣怡','女',28,'本科','数学，物理','17865492364','1973465','1973465@qq.com','四川成都金牛区','世界有点大，我想去看看。'),(90,'t545213','王一帆','男',30,'本科','语文','17824669856','5648938','564893@qq.com','四川绵阳市和谐村一组','这个人很懒，什么都没有留下。'),(91,'t546682','雷军','男',35,'本科','化学，生物，物理','17859234669','2478463','2478463@qq.com','四川乐山峨边',''),(92,'t547666','张紫怡','女',38,'本科','英语','17869523465','6659428','6659428@qq.com','四川省自贡市',''),(93,'t285475','李大辉','男',32,'专科','生物','17845493265','340189','340189@qq.com','四川资中','');
/*!40000 ALTER TABLE `Teacher` ENABLE KEYS */;
UNLOCK TABLES;

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
  KEY `fk_teaCla_tea_id_idx` (`tId`),
  KEY `fk_teaCla_sub_id_idx` (`subId`),
  KEY `fk_teaCla_cla_id_idx` (`classId`),
  CONSTRAINT `fk_teaCla_cla_id` FOREIGN KEY (`classId`) REFERENCES `Class` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_teaCla_sub_id` FOREIGN KEY (`subId`) REFERENCES `Subject` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_teaCla_tea_id` FOREIGN KEY (`tId`) REFERENCES `Teacher` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='教师班级关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TeacherClass`
--

LOCK TABLES `TeacherClass` WRITE;
/*!40000 ALTER TABLE `TeacherClass` DISABLE KEYS */;
INSERT INTO `TeacherClass` VALUES (11,12,2,29),(12,11,4,53),(17,84,2,53),(23,85,6,54),(24,12,4,28),(26,86,4,29),(28,91,15,54),(29,92,15,54),(30,92,4,54);
/*!40000 ALTER TABLE `TeacherClass` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `TeacherMenu`
--

LOCK TABLES `TeacherMenu` WRITE;
/*!40000 ALTER TABLE `TeacherMenu` DISABLE KEYS */;
INSERT INTO `TeacherMenu` VALUES (1),(4),(5),(6),(7),(9),(17),(27),(28),(29),(34),(35);
/*!40000 ALTER TABLE `TeacherMenu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-02  9:39:21
