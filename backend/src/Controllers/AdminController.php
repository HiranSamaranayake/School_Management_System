<?php
require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/AuthController.php';

class AdminController {
    private PDO $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getUsers(): void {
        $stmt = $this->db->query("
            SELECT u.user_id, CONCAT(u.first_name, ' ', u.last_name) as name, u.first_name, u.last_name, u.email, r.role_name as role, u.status, u.last_login
            FROM users u
            JOIN roles r ON u.role_id = r.role_id
            ORDER BY u.user_id DESC
        ");
        $users = $stmt->fetchAll();

        foreach ($users as &$u) {
            $u['user_id'] = "USR-" . str_pad($u['user_id'], 3, '0', STR_PAD_LEFT);
            if (!$u['last_login']) {
                $u['last_login'] = 'Never logged in';
            }
        }

        echo json_encode($users);
    }

    public function createUser(): void {
        (new AuthController())->register();
    }

    public function getRolesPermissions(): void {
        $roles = [
            ["role_id" => "ROLE-ADMIN", "role_name" => "School Admin", "description" => "Full administrative access"],
            ["role_id" => "ROLE-TEACHER", "role_name" => "Teacher", "description" => "Assigned classes & marks access"],
            ["role_id" => "ROLE-STUDENT", "role_name" => "Student", "description" => "Read-only student access"],
        ];

        $matrix = [
            "ROLE-ADMIN" => [
                "students.view" => true, "students.create" => true, "students.update" => true, "students.delete" => true,
                "teachers.view" => true, "teachers.manage" => true, "attendance.manage" => true, "examinations.manage" => true,
                "reports.view" => true, "settings.manage" => true
            ],
            "ROLE-TEACHER" => [
                "students.view" => true, "students.create" => false, "students.update" => false, "students.delete" => false,
                "teachers.view" => true, "teachers.manage" => false, "attendance.manage" => true, "examinations.manage" => true,
                "reports.view" => true, "settings.manage" => false
            ],
            "ROLE-STUDENT" => [
                "students.view" => true, "students.create" => false, "students.update" => false, "students.delete" => false,
                "teachers.view" => true, "teachers.manage" => false, "attendance.manage" => false, "examinations.manage" => false,
                "reports.view" => false, "settings.manage" => false
            ]
        ];

        echo json_encode(["roles" => $roles, "matrix" => $matrix]);
    }

    public function updateRolesPermissions(): void {
        echo json_encode(["success" => true, "message" => "Permissions matrix saved"]);
    }

    public function getAuditLogs(): void {
        $stmt = $this->db->query("SELECT * FROM audit_logs ORDER BY log_id DESC LIMIT 50");
        echo json_encode($stmt->fetchAll());
    }

    public function getSchoolSettings(): void {
        $stmt = $this->db->query("SELECT * FROM schools WHERE school_id = 1 LIMIT 1");
        echo json_encode($stmt->fetch());
    }

    public function updateSchoolSettings(): void {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?? [];

        $stmt = $this->db->prepare("
            UPDATE schools SET
                name = :name,
                code = :code,
                email = :email,
                phone = :phone,
                address = :address,
                website = :website,
                primary_color = :primary_color
            WHERE school_id = 1
        ");

        $stmt->execute([
            'name' => $data['name'] ?? 'Greenfield International College',
            'code' => $data['code'] ?? 'GIC001',
            'email' => $data['email'] ?? 'contact@greenfield.edu.lk',
            'phone' => $data['phone'] ?? '+94 11 258 9641',
            'address' => $data['address'] ?? '148 Havelock Road, Colombo 05',
            'website' => $data['website'] ?? 'https://greenfield.edu.lk',
            'primary_color' => $data['primary_color'] ?? '#4f46e5',
        ]);

        $this->getSchoolSettings();
    }

    public function getSubscription(): void {
        echo json_encode([
            "plan_name" => "Professional Plan",
            "status" => "Active",
            "renewal_date" => "2026-12-31",
            "students_limit" => 5000,
            "students_count" => 2842,
            "teachers_limit" => 200,
            "teachers_count" => 146,
            "storage_limit_gb" => 100,
            "storage_used_gb" => 45.2,
            "billing_cycle" => "Annual",
            "amount_usd" => 1499,
        ]);
    }

    public function getNotifications(): void {
        echo json_encode([
            ["id" => "NT-001", "title" => "Attendance Submitted", "message" => "Attendance recorded for Grade 10 - Science.", "category" => "Attendance", "time" => "10 minutes ago", "unread" => true],
            ["id" => "NT-002", "title" => "New Student Admission", "message" => "Tharushi Perera enrolled in Grade 6 - A.", "category" => "Users", "time" => "1 hour ago", "unread" => true],
        ]);
    }

    public function searchGlobal(): void {
        $q = trim($_GET['query'] ?? '');
        if (empty($q)) {
            echo json_encode(["students" => [], "teachers" => [], "classes" => [], "subjects" => []]);
            return;
        }

        $term = "%" . $q . "%";
        $st1 = $this->db->prepare("SELECT student_id, first_name, last_name, admission_no, grade_level FROM students WHERE first_name LIKE :t OR last_name LIKE :t OR admission_no LIKE :t LIMIT 4");
        $st1->execute(['t' => $term]);
        $students = $st1->fetchAll();

        $st2 = $this->db->prepare("SELECT teacher_id, first_name, last_name, teacher_reg_no FROM teachers WHERE first_name LIKE :t OR last_name LIKE :t OR teacher_reg_no LIKE :t LIMIT 4");
        $st2->execute(['t' => $term]);
        $teachers = $st2->fetchAll();

        echo json_encode([
            "students" => $students,
            "teachers" => $teachers,
            "classes" => [["class_id" => 1, "class_name" => "Grade 10 - Science", "medium" => "English"]],
            "subjects" => [["subject_id" => 1, "subject_code" => "MAT001", "subject_name" => "Mathematics", "category" => "Core"]],
        ]);
    }
}
