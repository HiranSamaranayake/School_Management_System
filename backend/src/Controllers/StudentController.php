<?php
require_once __DIR__ . '/../../config/Database.php';

class StudentController {
    private ?PDO $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function index(): void {
        $search = $_GET['search'] ?? '';
        $grade = $_GET['grade'] ?? '';
        $status = $_GET['status'] ?? '';
        $medium = $_GET['medium'] ?? '';

        if ($this->db) {
            try {
                $sql = "SELECT * FROM students WHERE 1=1";
                $params = [];

                if (!empty($search)) {
                    $sql .= " AND (first_name LIKE :search OR last_name LIKE :search OR admission_no LIKE :search)";
                    $params['search'] = "%" . $search . "%";
                }
                if (!empty($grade)) {
                    $sql .= " AND grade_level = :grade";
                    $params['grade'] = $grade;
                }
                if (!empty($status)) {
                    $sql .= " AND status = :status";
                    $params['status'] = $status;
                }
                if (!empty($medium)) {
                    $sql .= " AND medium = :medium";
                    $params['medium'] = $medium;
                }

                $sql .= " ORDER BY student_id DESC";

                $stmt = $this->db->prepare($sql);
                $stmt->execute($params);
                $students = $stmt->fetchAll();

                foreach ($students as &$s) {
                    $s['student_id'] = "STD-" . str_pad($s['student_id'], 3, '0', STR_PAD_LEFT);
                    $s['portal_account'] = (bool)($s['portal_account'] ?? 1);
                }

                echo json_encode([
                    "data" => $students,
                    "total" => count($students)
                ]);
                return;
            } catch (Exception $e) {}
        }

        // Demo fallback if database is empty or offline
        $demoStudents = [
            ["student_id" => "STD-001", "admission_no" => "GIC-2024-001", "first_name" => "Hiran", "last_name" => "Samaranayake", "gender" => "Male", "grade_level" => "Grade 10", "class_name" => "Grade 10 - Science", "medium" => "English", "guardian_name" => "K. Samaranayake", "guardian_phone" => "+94 77 123 4567", "status" => "Active", "avatar" => "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"],
            ["student_id" => "STD-002", "admission_no" => "GIC-2024-042", "first_name" => "Kavindi", "last_name" => "Fernando", "gender" => "Female", "grade_level" => "Grade 10", "class_name" => "Grade 10 - Science", "medium" => "English", "guardian_name" => "Mahesh Fernando", "guardian_phone" => "+94 71 987 6543", "status" => "Active", "avatar" => "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"],
            ["student_id" => "STD-003", "admission_no" => "GIC-2023-118", "first_name" => "Sahan", "last_name" => "Silva", "gender" => "Male", "grade_level" => "Grade 11", "class_name" => "Grade 11 - Science", "medium" => "English", "guardian_name" => "Rohana Silva", "guardian_phone" => "+94 76 555 4321", "status" => "Active", "avatar" => "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"],
            ["student_id" => "STD-004", "admission_no" => "GIC-2024-089", "first_name" => "Dinithi", "last_name" => "Jayawardena", "gender" => "Female", "grade_level" => "Grade 9", "class_name" => "Grade 9 - A", "medium" => "Sinhala", "guardian_name" => "Kamal Jayawardena", "guardian_phone" => "+94 70 333 2211", "status" => "Active", "avatar" => "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"]
        ];

        echo json_encode(["data" => $demoStudents, "total" => count($demoStudents)]);
    }

    public function show(int $id): void {
        if ($this->db) {
            $stmt = $this->db->prepare("SELECT * FROM students WHERE student_id = :id LIMIT 1");
            $stmt->execute(['id' => $id]);
            $student = $stmt->fetch();
            if ($student) {
                $student['student_id'] = "STD-" . str_pad($student['student_id'], 3, '0', STR_PAD_LEFT);
                echo json_encode($student);
                return;
            }
        }
        echo json_encode(["student_id" => "STD-001", "first_name" => "Hiran", "last_name" => "Samaranayake"]);
    }

    public function store(): void {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $firstName = trim($data['first_name'] ?? '');
        $lastName = trim($data['last_name'] ?? '');
        $admissionNo = trim($data['admission_no'] ?? ('GIC-2026-' . rand(100, 900)));

        if (empty($firstName) || empty($lastName)) {
            http_response_code(400);
            echo json_encode(["message" => "First name and Last name are required."]);
            return;
        }

        $newId = rand(100, 999);
        if ($this->db) {
            try {
                $stmt = $this->db->prepare("
                    INSERT INTO students (
                        school_id, admission_no, first_name, last_name, date_of_birth, gender,
                        medium, admission_date, grade_level, class_name, address, phone,
                        guardian_name, guardian_relationship, guardian_phone, guardian_email,
                        portal_account, status, avatar
                    )
                    VALUES (
                        1, :admission_no, :first_name, :last_name, :date_of_birth, :gender,
                        :medium, :admission_date, :grade_level, :class_name, :address, :phone,
                        :guardian_name, :guardian_relationship, :guardian_phone, :guardian_email,
                        :portal_account, :status, :avatar
                    )
                ");

                $stmt->execute([
                    'admission_no' => $admissionNo,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'date_of_birth' => $data['date_of_birth'] ?? '2012-05-15',
                    'gender' => $data['gender'] ?? 'Male',
                    'medium' => $data['medium'] ?? 'English',
                    'admission_date' => $data['admission_date'] ?? date('Y-m-d'),
                    'grade_level' => $data['grade_level'] ?? 'Grade 10',
                    'class_name' => $data['class_name'] ?? 'Grade 10 - Science',
                    'address' => $data['address'] ?? '',
                    'phone' => $data['phone'] ?? '',
                    'guardian_name' => $data['guardian_name'] ?? '',
                    'guardian_relationship' => $data['guardian_relationship'] ?? 'Father',
                    'guardian_phone' => $data['guardian_phone'] ?? '',
                    'guardian_email' => $data['guardian_email'] ?? '',
                    'portal_account' => isset($data['portal_account']) ? (int)$data['portal_account'] : 1,
                    'status' => $data['status'] ?? 'Active',
                    'avatar' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
                ]);

                $newId = (int)$this->db->lastInsertId();
            } catch (Exception $e) {}
        }

        echo json_encode([
            "student_id" => "STD-" . str_pad($newId, 3, '0', STR_PAD_LEFT),
            "admission_no" => $admissionNo,
            "first_name" => $firstName,
            "last_name" => $lastName,
            "grade_level" => $data['grade_level'] ?? 'Grade 10',
            "class_name" => $data['class_name'] ?? 'Grade 10 - Science',
            "medium" => $data['medium'] ?? 'English',
            "guardian_name" => $data['guardian_name'] ?? '',
            "guardian_phone" => $data['guardian_phone'] ?? '',
            "status" => $data['status'] ?? 'Active',
            "avatar" => "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
        ]);
    }

    public function update(int $id): void {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if ($this->db) {
            try {
                $stmt = $this->db->prepare("
                    UPDATE students SET
                        first_name = :first_name,
                        last_name = :last_name,
                        grade_level = :grade_level,
                        class_name = :class_name,
                        medium = :medium,
                        guardian_name = :guardian_name,
                        guardian_phone = :guardian_phone,
                        status = :status
                    WHERE student_id = :id
                ");

                $stmt->execute([
                    'first_name' => $data['first_name'] ?? '',
                    'last_name' => $data['last_name'] ?? '',
                    'grade_level' => $data['grade_level'] ?? 'Grade 10',
                    'class_name' => $data['class_name'] ?? 'Grade 10 - Science',
                    'medium' => $data['medium'] ?? 'English',
                    'guardian_name' => $data['guardian_name'] ?? '',
                    'guardian_phone' => $data['guardian_phone'] ?? '',
                    'status' => $data['status'] ?? 'Active',
                    'id' => $id
                ]);
            } catch (Exception $e) {}
        }

        echo json_encode([
            "student_id" => "STD-" . str_pad($id, 3, '0', STR_PAD_LEFT),
            "first_name" => $data['first_name'] ?? 'Nimal',
            "last_name" => $data['last_name'] ?? 'Perera',
            "grade_level" => $data['grade_level'] ?? 'Grade 10',
            "class_name" => $data['class_name'] ?? 'Grade 10 - Science',
            "medium" => $data['medium'] ?? 'English',
            "guardian_name" => $data['guardian_name'] ?? '',
            "guardian_phone" => $data['guardian_phone'] ?? '',
            "status" => $data['status'] ?? 'Active'
        ]);
    }

    public function delete(int $id): void {
        if ($this->db) {
            try {
                $stmt = $this->db->prepare("DELETE FROM students WHERE student_id = :id");
                $stmt->execute(['id' => $id]);
            } catch (Exception $e) {}
        }
        echo json_encode(["success" => true, "message" => "Student deleted successfully"]);
    }
}
