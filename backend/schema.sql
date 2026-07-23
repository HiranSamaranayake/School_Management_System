-- ============================================================================
-- EduSphere School SaaS Platform - Complete MySQL Database Schema
-- Compatible with MySQL 8.0+ / MariaDB 10.4+ (XAMPP Compatible)
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `edusphere_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `edusphere_db`;

-- ----------------------------------------------------------------------------
-- 1. Schools (Multi-Tenant Workspaces)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `schools` (
  `school_id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `tagline` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `address` TEXT NOT NULL,
  `website` VARCHAR(150) DEFAULT NULL,
  `current_academic_year` VARCHAR(20) DEFAULT '2026',
  `timezone` VARCHAR(50) DEFAULT 'Asia/Colombo',
  `country` VARCHAR(50) DEFAULT 'Sri Lanka',
  `primary_color` VARCHAR(10) DEFAULT '#4f46e5',
  `secondary_color` VARCHAR(10) DEFAULT '#3730a3',
  `logo_url` TEXT DEFAULT NULL,
  `status` ENUM('Active', 'Suspended', 'Inactive') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. Roles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `role_code` VARCHAR(50) NOT NULL UNIQUE,
  `role_name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Permissions
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `permissions` (
  `permission_id` INT AUTO_INCREMENT PRIMARY KEY,
  `permission_key` VARCHAR(100) NOT NULL UNIQUE,
  `module` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. Role Permissions Matrix
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  CONSTRAINT `fk_rp_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rp_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. Users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `status` ENUM('Active', 'Disabled', 'Pending') DEFAULT 'Active',
  `avatar_url` TEXT DEFAULT NULL,
  `last_login_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_school_user_email` (`school_id`, `email`),
  CONSTRAINT `fk_users_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. Academic Years
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `academic_years` (
  `academic_year_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `year_name` VARCHAR(50) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM('Active', 'Archived', 'Draft') DEFAULT 'Draft',
  `is_current` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_ay_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. Teachers
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `teachers` (
  `teacher_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `user_id` INT DEFAULT NULL UNIQUE,
  `teacher_reg_no` VARCHAR(50) NOT NULL,
  `nic_no` VARCHAR(20) DEFAULT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `gender` ENUM('Female', 'Male', 'Other') NOT NULL,
  `date_of_birth` DATE DEFAULT NULL,
  `qualification` TEXT DEFAULT NULL,
  `joining_date` DATE NOT NULL,
  `address` TEXT DEFAULT NULL,
  `status` ENUM('Active', 'On Leave', 'Inactive') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_school_teacher_reg` (`school_id`, `teacher_reg_no`),
  CONSTRAINT `fk_teachers_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_teachers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. Classes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `classes` (
  `class_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `academic_year_id` INT NOT NULL,
  `class_teacher_id` INT DEFAULT NULL,
  `grade_level` VARCHAR(50) NOT NULL,
  `section` VARCHAR(50) NOT NULL,
  `class_name` VARCHAR(100) NOT NULL,
  `medium` VARCHAR(30) DEFAULT 'English',
  `capacity` INT DEFAULT 40,
  `status` ENUM('Active', 'Inactive') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_classes_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_classes_ay` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`academic_year_id`),
  CONSTRAINT `fk_classes_teacher` FOREIGN KEY (`class_teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. Students
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `students` (
  `student_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `user_id` INT DEFAULT NULL UNIQUE,
  `admission_no` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `medium` VARCHAR(30) DEFAULT 'English',
  `admission_date` DATE NOT NULL,
  `grade_level` VARCHAR(50) NOT NULL,
  `current_class_id` INT DEFAULT NULL,
  `address` TEXT DEFAULT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `guardian_name` VARCHAR(150) NOT NULL,
  `guardian_relationship` VARCHAR(50) NOT NULL,
  `guardian_phone` VARCHAR(30) NOT NULL,
  `guardian_email` VARCHAR(150) DEFAULT NULL,
  `portal_account` TINYINT(1) DEFAULT 1,
  `status` ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_school_admission` (`school_id`, `admission_no`),
  CONSTRAINT `fk_students_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_students_class` FOREIGN KEY (`current_class_id`) REFERENCES `classes` (`class_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 10. Student Enrollments History
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `student_enrollments` (
  `enrollment_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `academic_year_id` INT NOT NULL,
  `enrolled_date` DATE NOT NULL,
  `status` ENUM('Active', 'Promoted', 'Retained', 'Transferred') DEFAULT 'Active',
  CONSTRAINT `fk_se_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_se_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_se_ay` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 11. Subjects
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subjects` (
  `subject_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `subject_code` VARCHAR(30) NOT NULL,
  `subject_name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) DEFAULT 'Core',
  `description` TEXT DEFAULT NULL,
  `status` ENUM('Active', 'Inactive') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_school_subject_code` (`school_id`, `subject_code`),
  CONSTRAINT `fk_subjects_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 12. Teacher Allocations
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `teacher_allocations` (
  `allocation_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `teacher_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `academic_year_id` INT NOT NULL,
  `status` ENUM('Active', 'Inactive') DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_ta_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ta_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ta_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ta_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ta_ay` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`academic_year_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 13. Attendance
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `attendance` (
  `attendance_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `academic_year_id` INT NOT NULL,
  `attendance_date` DATE NOT NULL,
  `status` ENUM('Present', 'Absent', 'Late', 'Excused') NOT NULL DEFAULT 'Present',
  `remarks` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_student_daily_attendance` (`student_id`, `attendance_date`),
  CONSTRAINT `fk_att_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_att_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_att_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 14. Exams
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `exams` (
  `exam_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `academic_year_id` INT NOT NULL,
  `exam_name` VARCHAR(150) NOT NULL,
  `term` VARCHAR(50) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM('Draft', 'Scheduled', 'Ongoing', 'Completed', 'Published') DEFAULT 'Draft',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_exams_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_exams_ay` FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years` (`academic_year_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 15. Exam Results
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `exam_results` (
  `result_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `exam_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `marks` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `grade` VARCHAR(10) NOT NULL DEFAULT 'F',
  `remarks` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_exam_student_subject` (`exam_id`, `student_id`, `subject_id`),
  CONSTRAINT `fk_er_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_er_exam` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_er_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_er_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 16. Audit Logs
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `log_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `user_id` INT DEFAULT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `module` VARCHAR(50) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_al_school` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SEED DEMO DATA FOR GREENFIELD INTERNATIONAL COLLEGE (GIC001)
-- ============================================================================

INSERT INTO `schools` (`school_id`, `code`, `name`, `tagline`, `email`, `phone`, `address`, `website`, `current_academic_year`, `primary_color`)
VALUES (1, 'GIC001', 'Greenfield International College', 'Excellence in Holistic Education', 'contact@greenfield.edu.lk', '+94 11 258 9641', '148 Havelock Road, Colombo 05, Sri Lanka', 'https://greenfield.edu.lk', '2026', '#4f46e5');

INSERT INTO `roles` (`role_id`, `role_code`, `role_name`, `description`) VALUES
(1, 'ROLE-ADMIN', 'School Administrator', 'Full administrative permissions'),
(2, 'ROLE-TEACHER', 'Teacher', 'Class, attendance & examination access'),
(3, 'ROLE-STUDENT', 'Student', 'Read-only student portal access');

INSERT INTO `permissions` (`permission_id`, `permission_key`, `module`, `description`) VALUES
(1, 'students.view', 'Students', 'View student directory'),
(2, 'students.create', 'Students', 'Add new student'),
(3, 'students.update', 'Students', 'Edit student record'),
(4, 'students.delete', 'Students', 'Delete student record'),
(5, 'teachers.view', 'Teachers', 'View teacher registry'),
(6, 'teachers.manage', 'Teachers', 'Add or edit teacher record'),
(7, 'attendance.manage', 'Attendance', 'Record or update daily attendance'),
(8, 'examinations.manage', 'Examinations', 'Publish exam marks & report cards'),
(9, 'reports.view', 'Reports', 'View executive analytics'),
(10, 'settings.manage', 'Administration', 'Manage school & security settings');

-- Grant all permissions to School Admin role
INSERT INTO `role_permissions` (`role_id`, `permission_id`)
SELECT 1, `permission_id` FROM `permissions`;

-- Seed Admin User (Password: demo1234 -> hashed)
INSERT INTO `users` (`user_id`, `school_id`, `role_id`, `first_name`, `last_name`, `email`, `password_hash`, `status`)
VALUES (1, 1, 1, 'James', 'Fernando', 'admin@greenfield.edu.lk', '$2y$10$e8w.x7V7Q0m4/jH2Jq4Zxe3t/hN5Rz3u5E0H1L2M3N4O5P6Q7R8S9T', 'Active');
