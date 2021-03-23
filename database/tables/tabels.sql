    //students details
    drop table if exists students ;
CREATE  TABLE IF NOT EXISTS `students` (
  `id` varchar(36),
  `code` VARCHAR(50) NOT NULL UNIQUE ,
  `first_name` VARCHAR(255) NOT NULL,
  `USN_number` varchar(20) not null,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `father_name` varchar(50),
  `motner_name` varchar(50),
  `emergency_contact` VARCHAR(50),
  `student_instructor` varchar(36),
  `total_percentage` int,
  `DOB` DATETIME ,
  `branch` VARCHAR(255) NOT NULL,
  `adhar_number` varchar(12),
  `semister` int,
  `gender` varchar(32),
  `is_deleted` TINYINT UNSIGNED DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));

  //  roles for role based accessability
        drop table if exists roles;
        CREATE  TABLE IF NOT EXISTS `roles` (
        `role_id` INT unsigned auto_increment,
        `category` varchar(50),
        primary key(`role_id`)
        );                          


      // user table for login validation
drop table if exists user;
create table if not exists `user` (
`user_id` varchar(36),
`user_name` varchar(50),
`passwd` varchar(20),
`email` varchar(50),
`role_id` int,
`is_enable` TINYINT UNSIGNED DEFAULT 1,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`));


// teachers table for teachers table

drop table if exists teacher;
create table if not exists `teacher`(
`teachers_id` varchar(36),
`teacher_code` varchar(50),
`first_name` varchar(50) not null,
  `last_name` varchar(50) not null,
  `father_name` varchar(50),
  `motner_name` varchar(50),
  `emergency_contact` VARCHAR(50),
  `branch` varchar(50),
  `DOB` DATETIME not null ,
  `qualification` varchar(50),
  `phone` numeric,
  `gender` varchar(10),
  `email` varchar(50) not null,
  `is_deleted` TINYINT UNSIGNED DEFAULT 0,
  `sub_assigned` varchar(50),
   `permanent_address` varchar(100) not null,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`teachers_id`));

  -- for workload assigned to teachers
DROP TABLE IF EXISTS `activity`;
CREATE TABLE if not exists `activity`(
`activity_id` varchar(36),
`activity_title` varchar(50) ,
`activity_details` varchar(200),
`Schedule_date` DATETIME,
`due_date` DATETIME,
`assigned_to` varchar(36),
`assigned_by` varchar(36),
`activity_priority` varchar(30),
`status` varchar(30),
`activity_type` varchar(20),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  primary key(`activity_id`)
);

-- for workload asigned to students
DROP TABLE IF EXISTS `activity_details`;
CREATE TABLE IF NOT EXISTS `activity_details`(
`activity_detail_id` varchar(36) ,
`activity_id` varchar(36),
`activity_detail_title` varchar(50),
`activity_detail_details` varchar(200),
`assigned_student_id` varchar(36),
`schedule_date` DATETIME,
`due_date` datetime,
`assigned_by` varchar(36),
`status` varchar(30),
`activity_det_priority` varchar(30),
`activity_type` varchar(20),
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  primary key(`activity_detail_id`)
);

-- for maintaining subjcts
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE IF NOT EXISTS `subjects` (
`subject_id` bigint unsigned auto_increment,
`branch` varchar(50),
`semister` int,
`subject_name` varchar(100),
`subject_assigned_to` bigint,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  primary key(`subject_id`)
)

-- for student marks for internals
DROP TABLE IF  EXISTS `student_marks`;
CREATE TABLE IF NOT EXISTS `student_marks` (
`subject_marks_id` bigint unsigned auto_increment,
`subject_id` bigint,
`marks_obtained` int,
`maximum_marks` int,
`exam_type` varchar(30),
 `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  primary key(`subject_marks_id`)
)

-- to store semister percentages
DROP TABLE IF  EXISTS `semister_percentage`;
CREATE TABLE IF NOT EXISTS `semister_percentage` (
`semister_percentage_id` varchar(36),
`class` VARCHAR(10),
`percentage_obtained` int,
`student_id` varchar(36),
 `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  primary key(`semister_percentage_id`)
);



CREATE TABLE IF NOT EXISTS `circulars` (
`circular_id` varchar(36),
`circular_detail` varchar(1000),
`circular_title` varchar(50),
`circular_specifiedto` varchar(30),
`circular_to_role` int,
`circular_url` varchar(250),
`circular_startDate` datetime,
`circular_endDate` datetime,
`created_at` DATETIME NOT NULL,		
`updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key(`circular_id`)
);