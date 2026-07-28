-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2026 at 02:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edusphere_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_years`
--

CREATE TABLE `academic_years` (
  `academic_year_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `year_name` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('Active','Archived','Draft') DEFAULT 'Draft',
  `is_current` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `academic_years`
--

INSERT INTO `academic_years` (`academic_year_id`, `school_id`, `year_name`, `start_date`, `end_date`, `status`, `is_current`) VALUES
(1, 1, '2026 Academic Year', '2026-01-05', '2026-12-15', 'Active', 1),
(2, 1, '2025 Academic Year', '2025-01-06', '2025-12-12', 'Archived', 0),
(3, 1, '2027 Academic Year', '2027-01-04', '2027-12-17', 'Draft', 0);

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `attendance_date` date NOT NULL,
  `status` enum('Present','Absent','Late','Excused') NOT NULL DEFAULT 'Present',
  `remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `school_id`, `student_id`, `class_id`, `attendance_date`, `status`, `remarks`) VALUES
(1, 1, 1, 1, '2026-07-24', 'Present', ''),
(2, 1, 2, 1, '2026-07-24', 'Present', ''),
(3, 1, 3, 2, '2026-07-24', 'Present', ''),
(4, 1, 4, 3, '2026-07-24', 'Late', 'Traffic delay'),
(5, 1, 5, 6, '2026-07-24', 'Absent', 'Sick leave');

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `log_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `user` varchar(150) NOT NULL,
  `module` varchar(50) NOT NULL,
  `action` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`log_id`, `school_id`, `timestamp`, `user`, `module`, `action`, `description`, `ip_address`) VALUES
(1, 1, '2026-07-24 00:42:06', 'James Fernando', 'Auth', 'User Login', 'Successfully authenticated from browser session', '192.168.1.45'),
(2, 1, '2026-07-24 00:42:06', 'Aruni Jayasinghe', 'Attendance', 'Attendance Submitted', 'Recorded attendance for Grade 10 - Science', '192.168.1.88');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `academic_year_id` int(11) DEFAULT 1,
  `class_teacher_id` int(11) DEFAULT NULL,
  `grade_level` varchar(50) NOT NULL,
  `section` varchar(50) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `medium` varchar(30) DEFAULT 'English',
  `capacity` int(11) DEFAULT 40,
  `enrolled_count` int(11) DEFAULT 0,
  `status` enum('Active','Inactive') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `school_id`, `academic_year_id`, `class_teacher_id`, `grade_level`, `section`, `class_name`, `medium`, `capacity`, `enrolled_count`, `status`) VALUES
(1, 1, 1, 1, 'Grade 10', 'Science', 'Grade 10 - Science', 'English', 45, 42, 'Active'),
(2, 1, 1, 4, 'Grade 11', 'Science', 'Grade 11 - Science', 'English', 45, 44, 'Active'),
(3, 1, 1, 2, 'Grade 9', 'A', 'Grade 9 - A', 'English', 42, 40, 'Active'),
(4, 1, 1, 3, 'Grade 6', 'A', 'Grade 6 - A', 'English', 40, 36, 'Active'),
(5, 1, 1, 1, 'Grade 6', 'B', 'Grade 6 - B', 'Sinhala', 40, 38, 'Active'),
(6, 1, 1, 2, 'Grade 12', 'Biological Science', 'Grade 12 - Bio', 'English', 35, 31, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `exam_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `exam_name` varchar(150) NOT NULL,
  `term` varchar(50) NOT NULL,
  `academic_year` varchar(20) DEFAULT '2026',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('Draft','Scheduled','Ongoing','Completed','Published') DEFAULT 'Draft'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`exam_id`, `school_id`, `exam_name`, `term`, `academic_year`, `start_date`, `end_date`, `status`) VALUES
(7, 1, 'Annual Final Term 2026', 'Term 1', '2026', '2026-07-24', '2026-08-07', ''),
(9, 1, 'Annual Final Term 2026', 'Term 1', '2026', '2026-07-24', '2026-08-07', '');

-- --------------------------------------------------------

--
-- Table structure for table `exam_results`
--

CREATE TABLE `exam_results` (
  `result_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `marks` decimal(5,2) NOT NULL DEFAULT 0.00,
  `grade` varchar(10) NOT NULL DEFAULT 'F',
  `remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exam_results`
--

INSERT INTO `exam_results` (`result_id`, `school_id`, `exam_id`, `student_id`, `subject_id`, `marks`, `grade`, `remarks`) VALUES
(1, 1, 1, 1, 1, 92.00, 'A+', 'Outstanding performance'),
(2, 1, 1, 1, 2, 88.00, 'A+', 'Excellent essay writing'),
(3, 1, 1, 1, 3, 85.00, 'A+', 'Strong practical score'),
(4, 1, 1, 1, 4, 95.00, 'A+', 'Top in class'),
(5, 1, 1, 2, 1, 78.00, 'A', 'Very good'),
(6, 1, 1, 2, 2, 91.00, 'A+', 'Top score in literature');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL,
  `permission_key` varchar(100) NOT NULL,
  `module` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_code` varchar(50) NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_code`, `role_name`, `description`) VALUES
(1, 'ROLE-ADMIN', 'School Administrator', 'Full administrative access across all school modules'),
(2, 'ROLE-TEACHER', 'Teacher', 'Access to assigned classes, marks entry, and attendance'),
(3, 'ROLE-STUDENT', 'Student', 'Read-only access to personal results and attendance');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `address` text NOT NULL,
  `website` varchar(150) DEFAULT NULL,
  `current_academic_year` varchar(20) DEFAULT '2026',
  `timezone` varchar(50) DEFAULT 'Asia/Colombo',
  `country` varchar(50) DEFAULT 'Sri Lanka',
  `primary_color` varchar(10) DEFAULT '#4f46e5',
  `secondary_color` varchar(10) DEFAULT '#3730a3',
  `logo_url` text DEFAULT NULL,
  `status` enum('Active','Suspended','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`school_id`, `code`, `name`, `tagline`, `email`, `phone`, `address`, `website`, `current_academic_year`, `timezone`, `country`, `primary_color`, `secondary_color`, `logo_url`, `status`, `created_at`) VALUES
(1, 'GIC001', 'Greenfield International College', 'Excellence in Holistic Education', 'contact@greenfield.edu.lk', '+94 11 258 9641', '148 Havelock Road, Colombo 05, Sri Lanka', 'https://greenfield.edu.lk', '2026', 'Asia/Colombo', 'Sri Lanka', '#4f46e5', '#3730a3', NULL, 'Active', '2026-07-23 19:12:06');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `admission_no` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `medium` varchar(30) DEFAULT 'English',
  `admission_date` date NOT NULL,
  `grade_level` varchar(50) NOT NULL,
  `class_name` varchar(100) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `guardian_name` varchar(150) NOT NULL,
  `guardian_relationship` varchar(50) NOT NULL,
  `guardian_phone` varchar(30) NOT NULL,
  `guardian_email` varchar(150) DEFAULT NULL,
  `portal_account` tinyint(1) DEFAULT 1,
  `status` enum('Active','Inactive','Suspended') DEFAULT 'Active',
  `avatar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `school_id`, `user_id`, `admission_no`, `first_name`, `last_name`, `date_of_birth`, `gender`, `medium`, `admission_date`, `grade_level`, `class_name`, `class_id`, `address`, `phone`, `guardian_name`, `guardian_relationship`, `guardian_phone`, `guardian_email`, `portal_account`, `status`, `avatar`) VALUES
(1, 1, NULL, 'GIC-2024-001', 'Nimal', 'Perera', '2010-04-12', 'Male', 'English', '2024-01-10', 'Grade 10', 'Grade 10 - Science', 1, '45/A, High Level Road, Nugegoda', '+94 77 234 5678', 'Sunil Perera', 'Father', '+94 77 999 8877', 'sunil.perera@gmail.com', 1, 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
(2, 1, NULL, 'GIC-2024-042', 'Kavindi', 'Fernando', '2010-09-25', 'Female', 'English', '2024-01-12', 'Grade 10', 'Grade 10 - Science', 1, '12, Baseline Road, Kirulapone', '+94 71 888 2211', 'Rohan Fernando', 'Father', '+94 71 333 4455', 'rohan.f@hotmail.com', 1, 'Active', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'),
(3, 1, NULL, 'GIC-2023-118', 'Sahan', 'Silva', '2009-02-18', 'Male', 'English', '2023-01-08', 'Grade 11', 'Grade 11 - Science', 2, '88, Marine Drive, Bambalapitiya', '+94 75 111 0022', 'Anusha Silva', 'Mother', '+94 75 222 3344', 'anusha.silva@yahoo.com', 1, 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
(4, 1, NULL, 'GIC-2024-089', 'Dinithi', 'Jayawardena', '2011-06-30', 'Female', 'English', '2024-01-15', 'Grade 9', 'Grade 9 - A', 3, '302, Havelock Gardens, Colombo 06', '+94 70 555 4433', 'Mahesh Jayawardena', 'Father', '+94 70 999 1122', 'mahesh.j@gmail.com', 1, 'Active', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
(5, 1, NULL, 'GIC-2022-015', 'Kasun', 'Bandara', '2008-11-05', 'Male', 'Sinhala', '2022-01-10', 'Grade 12', 'Grade 12 - Bio', 6, '14/2, Lake Road, Battaramulla', '+94 77 666 5544', 'Dhammika Bandara', 'Father', '+94 77 111 2233', 'bandara.d@gmail.com', 1, 'Active', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
(11, 1, NULL, 'GIC-2026-724', 'Hashen', 'Perera', '2012-05-18', 'Male', 'English', '2026-01-08', 'Grade 10', 'Grade 10 - Science', NULL, '148 , colombo 08', '0702345432', '', 'Father', '0702345432', 'hashennilupul@gmail.com', 1, 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `subject_code` varchar(30) NOT NULL,
  `subject_name` varchar(150) NOT NULL,
  `category` varchar(50) DEFAULT 'Core',
  `description` text DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `school_id`, `subject_code`, `subject_name`, `category`, `description`, `status`) VALUES
(1, 1, 'MAT001', 'Mathematics', 'Core', NULL, 'Active'),
(2, 1, 'ENG001', 'English Language & Literature', 'Languages', NULL, 'Active'),
(3, 1, 'SCI001', 'General Science', 'Science', NULL, 'Active'),
(4, 1, 'ICT001', 'Information & Communication Technology', 'Technology', NULL, 'Active'),
(5, 1, 'HIS001', 'History & Social Studies', 'Humanities', NULL, 'Active'),
(6, 1, 'SIN001', 'Sinhala Language', 'Languages', NULL, 'Active'),
(7, 1, 'PHY001', 'Advanced Physics', 'Science', NULL, 'Active'),
(8, 1, 'CHE001', 'Advanced Chemistry', 'Science', NULL, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `teacher_reg_no` varchar(50) NOT NULL,
  `nic_no` varchar(20) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `gender` enum('Female','Male','Other') NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `qualification` text DEFAULT NULL,
  `joining_date` date NOT NULL,
  `address` text DEFAULT NULL,
  `status` enum('Active','On Leave','Inactive') DEFAULT 'Active',
  `avatar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `school_id`, `user_id`, `teacher_reg_no`, `nic_no`, `first_name`, `last_name`, `email`, `phone`, `gender`, `date_of_birth`, `qualification`, `joining_date`, `address`, `status`, `avatar`) VALUES
(1, 1, NULL, 'TR-2021-089', '847291038V', 'Aruni', 'Jayasinghe', 'aruni.j@greenfield.edu.lk', '+94 77 123 4567', 'Female', '1984-05-14', 'M.Sc. Education, B.Sc. Mathematics', '2021-01-10', '24/B, Flower Road, Colombo 07', 'Active', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'),
(2, 1, NULL, 'TR-2018-042', '791823910V', 'Bandula', 'Gunawardena', 'bandula.g@greenfield.edu.lk', '+94 71 987 6543', 'Male', '1979-11-22', 'B.Sc. Physics (Hons)', '2018-05-15', '105, Station Road, Nugegoda', 'Active', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'),
(3, 1, NULL, 'TR-2022-115', '916301928V', 'Champa', 'Ranasinghe', 'champa.r@greenfield.edu.lk', '+94 75 444 3322', 'Female', '1991-03-08', 'B.A. English Literature', '2022-09-01', '42, Temple Road, Maharagama', 'Active', 'https://images.unsplash.com/photo-1580894732468-058401e14295?w=150'),
(4, 1, NULL, 'TR-2020-077', '882391049V', 'Dinesh', 'Weerasinghe', 'dinesh.w@greenfield.edu.lk', '+94 70 888 1122', 'Male', '1988-08-30', 'B.Sc. Computer Science', '2020-02-01', '88/1, Kandy Road, Kiribathgoda', 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
(5, 1, NULL, 'TR-2026-117', '200231511243', 'Maneesha', 'PFernando', 'nawanjanaranushi2003@gmail.com', '0712345678', 'Female', '1988-06-12', 'B.Sc.CS (Hons)', '2026-01-10', 'UWU', 'On Leave', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_allocations`
--

CREATE TABLE `teacher_allocations` (
  `allocation_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `academic_year` varchar(20) DEFAULT '2026'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `status` enum('Active','Disabled','Pending') DEFAULT 'Active',
  `avatar` text DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `school_id`, `role_id`, `first_name`, `last_name`, `email`, `password_hash`, `status`, `avatar`, `last_login`, `created_at`) VALUES
(1, 1, 1, 'James', 'Fernando', 'admin@greenfield.edu.lk', '$2y$10$4.a5d5E8jK2x/2pG2N9Ope9G2B1N0M9P8O7N6M5L4K3J2I1H0G', 'Active', NULL, '2026-07-24 00:42:06', '2026-07-23 19:12:06'),
(2, 1, 2, 'Aruni', 'Jayasinghe', 'aruni.j@greenfield.edu.lk', '$2y$10$4.a5d5E8jK2x/2pG2N9Ope9G2B1N0M9P8O7N6M5L4K3J2I1H0G', 'Active', NULL, '2026-07-24 00:42:06', '2026-07-23 19:12:06'),
(3, 1, 2, 'Bandula', 'Gunawardena', 'bandula.g@greenfield.edu.lk', '$2y$10$4.a5d5E8jK2x/2pG2N9Ope9G2B1N0M9P8O7N6M5L4K3J2I1H0G', 'Active', NULL, '2026-07-24 00:42:06', '2026-07-23 19:12:06'),
(9, 1, 3, 'Hiran', 'Anjana', 'hirananjana123@gmail.com', '$2y$10$.Lj1CvyfWRoVm2IqNJLkGuv2ooNxNU5uMu5kPsBnpBCDxasfRDzsi', 'Active', NULL, NULL, '2026-07-23 19:19:38'),
(10, 1, 2, 'Thimira', 'Theekshana', 'thimira12@gmail.com', '$2y$10$Som/eNB3H122GgWhhvcQge3NCTkT6m8NMmbiISvCu3qpAFtFqkfuG', 'Active', NULL, NULL, '2026-07-23 19:20:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_years`
--
ALTER TABLE `academic_years`
  ADD PRIMARY KEY (`academic_year_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`exam_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `exam_results`
--
ALTER TABLE `exam_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`),
  ADD UNIQUE KEY `permission_key` (`permission_key`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_code` (`role_code`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `teacher_allocations`
--
ALTER TABLE `teacher_allocations`
  ADD PRIMARY KEY (`allocation_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_years`
--
ALTER TABLE `academic_years`
  MODIFY `academic_year_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `exam_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `exam_results`
--
ALTER TABLE `exam_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `school_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teacher_allocations`
--
ALTER TABLE `teacher_allocations`
  MODIFY `allocation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `academic_years`
--
ALTER TABLE `academic_years`
  ADD CONSTRAINT `academic_years_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;

--
-- Constraints for table `exam_results`
--
ALTER TABLE `exam_results`
  ADD CONSTRAINT `exam_results_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `teachers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `teacher_allocations`
--
ALTER TABLE `teacher_allocations`
  ADD CONSTRAINT `teacher_allocations_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
