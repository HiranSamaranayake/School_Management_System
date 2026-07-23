-- ============================================================================
-- EDUSPHERE SCHOOL MANAGEMENT SAAS - FULL MYSQL DATABASE IMPORT FILE
-- Compatible with phpMyAdmin, MySQL 8.0+ & MariaDB (XAMPP Default)
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;
CREATE DATABASE IF NOT EXISTS `edusphere_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `edusphere_db`;

-- Drop existing tables if re-importing
DROP TABLE IF EXISTS `audit_logs`;
DROP TABLE IF EXISTS `exam_results`;
DROP TABLE IF EXISTS `exams`;
DROP TABLE IF EXISTS `attendance`;
DROP TABLE IF EXISTS `teacher_allocations`;
DROP TABLE IF EXISTS `student_enrollments`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `classes`;
DROP TABLE IF EXISTS `teachers`;
DROP TABLE IF EXISTS `subjects`;
DROP TABLE IF EXISTS `academic_years`;
DROP TABLE IF EXISTS `role_permissions`;
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `schools`;

-- 1. Schools Table
CREATE TABLE `schools` (
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
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Roles Table
CREATE TABLE `roles` (
  `role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `role_code` VARCHAR(50) NOT NULL UNIQUE,
  `role_name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Permissions Table
CREATE TABLE `permissions` (
  `permission_id` INT AUTO_INCREMENT PRIMARY KEY,
  `permission_key` VARCHAR(100) NOT NULL UNIQUE,
  `module` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Role Permissions
CREATE TABLE `role_permissions` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Users Table
CREATE TABLE `users` (
  `user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `status` ENUM('Active', 'Disabled', 'Pending') DEFAULT 'Active',
  `avatar` TEXT DEFAULT NULL,
  `last_login` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Academic Years
CREATE TABLE `academic_years` (
  `academic_year_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `year_name` VARCHAR(50) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM('Active', 'Archived', 'Draft') DEFAULT 'Draft',
  `is_current` TINYINT(1) DEFAULT 0,
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Subjects Table
CREATE TABLE `subjects` (
  `subject_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `subject_code` VARCHAR(30) NOT NULL,
  `subject_name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) DEFAULT 'Core',
  `description` TEXT DEFAULT NULL,
  `status` ENUM('Active', 'Inactive') DEFAULT 'Active',
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Teachers Table
CREATE TABLE `teachers` (
  `teacher_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `user_id` INT DEFAULT NULL,
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
  `avatar` TEXT DEFAULT NULL,
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Classes Table
CREATE TABLE `classes` (
  `class_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `academic_year_id` INT DEFAULT 1,
  `class_teacher_id` INT DEFAULT NULL,
  `grade_level` VARCHAR(50) NOT NULL,
  `section` VARCHAR(50) NOT NULL,
  `class_name` VARCHAR(100) NOT NULL,
  `medium` VARCHAR(30) DEFAULT 'English',
  `capacity` INT DEFAULT 40,
  `enrolled_count` INT DEFAULT 0,
  `status` ENUM('Active', 'Inactive') DEFAULT 'Active',
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Students Table
CREATE TABLE `students` (
  `student_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `user_id` INT DEFAULT NULL,
  `admission_no` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `medium` VARCHAR(30) DEFAULT 'English',
  `admission_date` DATE NOT NULL,
  `grade_level` VARCHAR(50) NOT NULL,
  `class_name` VARCHAR(100) DEFAULT NULL,
  `class_id` INT DEFAULT NULL,
  `address` TEXT DEFAULT NULL,
  `phone` VARCHAR(30) DEFAULT NULL,
  `guardian_name` VARCHAR(150) NOT NULL,
  `guardian_relationship` VARCHAR(50) NOT NULL,
  `guardian_phone` VARCHAR(30) NOT NULL,
  `guardian_email` VARCHAR(150) DEFAULT NULL,
  `portal_account` TINYINT(1) DEFAULT 1,
  `status` ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
  `avatar` TEXT DEFAULT NULL,
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Teacher Allocations
CREATE TABLE `teacher_allocations` (
  `allocation_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `teacher_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `academic_year` VARCHAR(20) DEFAULT '2026',
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Attendance Table
CREATE TABLE `attendance` (
  `attendance_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `class_id` INT DEFAULT NULL,
  `attendance_date` DATE NOT NULL,
  `status` ENUM('Present', 'Absent', 'Late', 'Excused') NOT NULL DEFAULT 'Present',
  `remarks` VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Exams Table
CREATE TABLE `exams` (
  `exam_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `exam_name` VARCHAR(150) NOT NULL,
  `term` VARCHAR(50) NOT NULL,
  `academic_year` VARCHAR(20) DEFAULT '2026',
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `status` ENUM('Draft', 'Scheduled', 'Ongoing', 'Completed', 'Published') DEFAULT 'Draft',
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Exam Results Table
CREATE TABLE `exam_results` (
  `result_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `exam_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `subject_id` INT DEFAULT NULL,
  `marks` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `grade` VARCHAR(10) NOT NULL DEFAULT 'F',
  `remarks` VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. Audit Logs Table
CREATE TABLE `audit_logs` (
  `log_id` INT AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `user` VARCHAR(150) NOT NULL,
  `module` VARCHAR(50) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- SEED DATA INSERTS
-- ----------------------------------------------------------------------------

INSERT INTO `schools` (`school_id`, `code`, `name`, `tagline`, `email`, `phone`, `address`, `website`, `current_academic_year`, `primary_color`) VALUES
(1, 'GIC001', 'Greenfield International College', 'Excellence in Holistic Education', 'contact@greenfield.edu.lk', '+94 11 258 9641', '148 Havelock Road, Colombo 05, Sri Lanka', 'https://greenfield.edu.lk', '2026', '#4f46e5');

INSERT INTO `roles` (`role_id`, `role_code`, `role_name`, `description`) VALUES
(1, 'ROLE-ADMIN', 'School Administrator', 'Full administrative access across all school modules'),
(2, 'ROLE-TEACHER', 'Teacher', 'Access to assigned classes, marks entry, and attendance'),
(3, 'ROLE-STUDENT', 'Student', 'Read-only access to personal results and attendance');

INSERT INTO `users` (`user_id`, `school_id`, `role_id`, `first_name`, `last_name`, `email`, `password_hash`, `status`, `last_login`) VALUES
(1, 1, 1, 'James', 'Fernando', 'admin@greenfield.edu.lk', '$2y$10$4.a5d5E8jK2x/2pG2N9Ope9G2B1N0M9P8O7N6M5L4K3J2I1H0G', 'Active', NOW()),
(2, 1, 2, 'Aruni', 'Jayasinghe', 'aruni.j@greenfield.edu.lk', '$2y$10$4.a5d5E8jK2x/2pG2N9Ope9G2B1N0M9P8O7N6M5L4K3J2I1H0G', 'Active', NOW()),
(3, 1, 2, 'Bandula', 'Gunawardena', 'bandula.g@greenfield.edu.lk', '$2y$10$4.a5d5E8jK2x/2pG2N9Ope9G2B1N0M9P8O7N6M5L4K3J2I1H0G', 'Active', NOW());

INSERT INTO `academic_years` (`academic_year_id`, `school_id`, `year_name`, `start_date`, `end_date`, `status`, `is_current`) VALUES
(1, 1, '2026 Academic Year', '2026-01-05', '2026-12-15', 'Active', 1),
(2, 1, '2025 Academic Year', '2025-01-06', '2025-12-12', 'Archived', 0),
(3, 1, '2027 Academic Year', '2027-01-04', '2027-12-17', 'Draft', 0);

INSERT INTO `subjects` (`subject_id`, `school_id`, `subject_code`, `subject_name`, `category`, `status`) VALUES
(1, 1, 'MAT001', 'Mathematics', 'Core', 'Active'),
(2, 1, 'ENG001', 'English Language & Literature', 'Languages', 'Active'),
(3, 1, 'SCI001', 'General Science', 'Science', 'Active'),
(4, 1, 'ICT001', 'Information & Communication Technology', 'Technology', 'Active'),
(5, 1, 'HIS001', 'History & Social Studies', 'Humanities', 'Active'),
(6, 1, 'SIN001', 'Sinhala Language', 'Languages', 'Active'),
(7, 1, 'PHY001', 'Advanced Physics', 'Science', 'Active'),
(8, 1, 'CHE001', 'Advanced Chemistry', 'Science', 'Active');

INSERT INTO `teachers` (`teacher_id`, `school_id`, `teacher_reg_no`, `nic_no`, `first_name`, `last_name`, `email`, `phone`, `gender`, `date_of_birth`, `qualification`, `joining_date`, `address`, `status`, `avatar`) VALUES
(1, 1, 'TR-2021-089', '847291038V', 'Aruni', 'Jayasinghe', 'aruni.j@greenfield.edu.lk', '+94 77 123 4567', 'Female', '1984-05-14', 'M.Sc. Education, B.Sc. Mathematics', '2021-01-10', '24/B, Flower Road, Colombo 07', 'Active', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'),
(2, 1, 'TR-2018-042', '791823910V', 'Bandula', 'Gunawardena', 'bandula.g@greenfield.edu.lk', '+94 71 987 6543', 'Male', '1979-11-22', 'B.Sc. Physics (Hons)', '2018-05-15', '105, Station Road, Nugegoda', 'Active', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'),
(3, 1, 'TR-2022-115', '916301928V', 'Champa', 'Ranasinghe', 'champa.r@greenfield.edu.lk', '+94 75 444 3322', 'Female', '1991-03-08', 'B.A. English Literature', '2022-09-01', '42, Temple Road, Maharagama', 'Active', 'https://images.unsplash.com/photo-1580894732468-058401e14295?w=150'),
(4, 1, 'TR-2020-077', '882391049V', 'Dinesh', 'Weerasinghe', 'dinesh.w@greenfield.edu.lk', '+94 70 888 1122', 'Male', '1988-08-30', 'B.Sc. Computer Science', '2020-02-01', '88/1, Kandy Road, Kiribathgoda', 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150');

INSERT INTO `classes` (`class_id`, `school_id`, `grade_level`, `section`, `class_name`, `medium`, `capacity`, `enrolled_count`, `class_teacher_id`) VALUES
(1, 1, 'Grade 10', 'Science', 'Grade 10 - Science', 'English', 45, 42, 1),
(2, 1, 'Grade 11', 'Science', 'Grade 11 - Science', 'English', 45, 44, 4),
(3, 1, 'Grade 9', 'A', 'Grade 9 - A', 'English', 42, 40, 2),
(4, 1, 'Grade 6', 'A', 'Grade 6 - A', 'English', 40, 36, 3),
(5, 1, 'Grade 6', 'B', 'Grade 6 - B', 'Sinhala', 40, 38, 1),
(6, 1, 'Grade 12', 'Biological Science', 'Grade 12 - Bio', 'English', 35, 31, 2);

INSERT INTO `students` (`student_id`, `school_id`, `admission_no`, `first_name`, `last_name`, `date_of_birth`, `gender`, `medium`, `admission_date`, `grade_level`, `class_name`, `class_id`, `address`, `phone`, `guardian_name`, `guardian_relationship`, `guardian_phone`, `guardian_email`, `status`, `avatar`) VALUES
(1, 1, 'GIC-2024-001', 'Nimal', 'Perera', '2010-04-12', 'Male', 'English', '2024-01-10', 'Grade 10', 'Grade 10 - Science', 1, '45/A, High Level Road, Nugegoda', '+94 77 234 5678', 'Sunil Perera', 'Father', '+94 77 999 8877', 'sunil.perera@gmail.com', 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
(2, 1, 'GIC-2024-042', 'Kavindi', 'Fernando', '2010-09-25', 'Female', 'English', '2024-01-12', 'Grade 10', 'Grade 10 - Science', 1, '12, Baseline Road, Kirulapone', '+94 71 888 2211', 'Rohan Fernando', 'Father', '+94 71 333 4455', 'rohan.f@hotmail.com', 'Active', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'),
(3, 1, 'GIC-2023-118', 'Sahan', 'Silva', '2009-02-18', 'Male', 'English', '2023-01-08', 'Grade 11', 'Grade 11 - Science', 2, '88, Marine Drive, Bambalapitiya', '+94 75 111 0022', 'Anusha Silva', 'Mother', '+94 75 222 3344', 'anusha.silva@yahoo.com', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
(4, 1, 'GIC-2024-089', 'Dinithi', 'Jayawardena', '2011-06-30', 'Female', 'English', '2024-01-15', 'Grade 9', 'Grade 9 - A', 3, '302, Havelock Gardens, Colombo 06', '+94 70 555 4433', 'Mahesh Jayawardena', 'Father', '+94 70 999 1122', 'mahesh.j@gmail.com', 'Active', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
(5, 1, 'GIC-2022-015', 'Kasun', 'Bandara', '2008-11-05', 'Male', 'Sinhala', '2022-01-10', 'Grade 12', 'Grade 12 - Bio', 6, '14/2, Lake Road, Battaramulla', '+94 77 666 5544', 'Dhammika Bandara', 'Father', '+94 77 111 2233', 'bandara.d@gmail.com', 'Active', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150');

INSERT INTO `attendance` (`attendance_id`, `school_id`, `student_id`, `class_id`, `attendance_date`, `status`, `remarks`) VALUES
(1, 1, 1, 1, '2026-07-24', 'Present', ''),
(2, 1, 2, 1, '2026-07-24', 'Present', ''),
(3, 1, 3, 2, '2026-07-24', 'Present', ''),
(4, 1, 4, 3, '2026-07-24', 'Late', 'Traffic delay'),
(5, 1, 5, 6, '2026-07-24', 'Absent', 'Sick leave');

INSERT INTO `exams` (`exam_id`, `school_id`, `exam_name`, `term`, `start_date`, `end_date`, `status`) VALUES
(1, 1, 'First Term Examination 2026', 'First Term', '2026-03-15', '2026-03-25', 'Published'),
(2, 1, 'Mid-Term Evaluation 2026', 'Second Term', '2026-06-20', '2026-06-28', 'Ongoing');

INSERT INTO `exam_results` (`result_id`, `school_id`, `exam_id`, `student_id`, `subject_id`, `marks`, `grade`, `remarks`) VALUES
(1, 1, 1, 1, 1, 92.00, 'A+', 'Outstanding performance'),
(2, 1, 1, 1, 2, 88.00, 'A+', 'Excellent essay writing'),
(3, 1, 1, 1, 3, 85.00, 'A+', 'Strong practical score'),
(4, 1, 1, 1, 4, 95.00, 'A+', 'Top in class'),
(5, 1, 1, 2, 1, 78.00, 'A', 'Very good'),
(6, 1, 1, 2, 2, 91.00, 'A+', 'Top score in literature');

INSERT INTO `audit_logs` (`log_id`, `school_id`, `timestamp`, `user`, `module`, `action`, `description`, `ip_address`) VALUES
(1, 1, NOW(), 'James Fernando', 'Auth', 'User Login', 'Successfully authenticated from browser session', '192.168.1.45'),
(2, 1, NOW(), 'Aruni Jayasinghe', 'Attendance', 'Attendance Submitted', 'Recorded attendance for Grade 10 - Science', '192.168.1.88');

SET FOREIGN_KEY_CHECKS = 1;
