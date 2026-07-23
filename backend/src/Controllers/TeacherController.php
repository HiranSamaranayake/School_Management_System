<?php
require_once __DIR__ . '/../../config/Database.php';

class TeacherController {
    private ?PDO $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function index(): void {
        $search = $_GET['search'] ?? '';
        $status = $_GET['status'] ?? '';

        if ($this->db) {
            try {
                $sql = "SELECT * FROM teachers WHERE 1=1";
                $params = [];

                if (!empty($search)) {
                    $sql .= " AND (first_name LIKE :search OR last_name LIKE :search OR teacher_reg_no LIKE :search)";
                    $params['search'] = "%" . $search . "%";
                }
                if (!empty($status)) {
                    $sql .= " AND status = :status";
                    $params['status'] = $status;
                }

                $sql .= " ORDER BY teacher_id DESC";

                $stmt = $this->db->prepare($sql);
                $stmt->execute($params);
                $teachers = $stmt->fetchAll();

                foreach ($teachers as &$t) {
                    $t['teacher_id'] = "TCH-" . str_pad($t['teacher_id'], 3, '0', STR_PAD_LEFT);
                    $t['assigned_subjects'] = ["MAT001", "SCI001"];
                    $t['assigned_classes'] = ["Grade 10 - Science", "Grade 11 - Science"];
                }

                echo json_encode([
                    "data" => $teachers,
                    "total" => count($teachers)
                ]);
                return;
            } catch (Exception $e) {}
        }

        $demoTeachers = [
            ["teacher_id" => "TCH-001", "teacher_reg_no" => "TR-2024-001", "first_name" => "Aruni", "last_name" => "Jayasinghe", "email" => "aruni.j@greenfield.edu.lk", "phone" => "+94 77 123 4567", "gender" => "Female", "qualification" => "B.Sc. Mathematics (Hons)", "assigned_subjects" => ["MAT001"], "assigned_classes" => ["Grade 10 - Science"], "status" => "Active", "avatar" => "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"],
            ["teacher_id" => "TCH-002", "teacher_reg_no" => "TR-2024-014", "first_name" => "Bandula", "last_name" => "Gunawardena", "email" => "bandula.g@greenfield.edu.lk", "phone" => "+94 71 987 6543", "gender" => "Male", "qualification" => "M.Sc. Physics", "assigned_subjects" => ["SCI001"], "assigned_classes" => ["Grade 10 - Science"], "status" => "Active", "avatar" => "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"]
        ];

        echo json_encode(["data" => $demoTeachers, "total" => count($demoTeachers)]);
    }

    public function store(): void {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $firstName = trim($data['first_name'] ?? '');
        $lastName = trim($data['last_name'] ?? '');
        $regNo = trim($data['teacher_reg_no'] ?? ('TR-2026-' . rand(100, 900)));

        if (empty($firstName) || empty($lastName)) {
            http_response_code(400);
            echo json_encode(["message" => "First name and Last name are required."]);
            return;
        }

        $newId = rand(100, 999);
        if ($this->db) {
            try {
                $stmt = $this->db->prepare("
                    INSERT INTO teachers (
                        school_id, teacher_reg_no, nic_no, first_name, last_name, email,
                        phone, gender, date_of_birth, qualification, joining_date, address, status, avatar
                    )
                    VALUES (
                        1, :reg_no, :nic_no, :first_name, :last_name, :email,
                        :phone, :gender, :date_of_birth, :qualification, :joining_date, :address, :status, :avatar
                    )
                ");

                $stmt->execute([
                    'reg_no' => $regNo,
                    'nic_no' => $data['nic_no'] ?? '847291038V',
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $data['email'] ?? '',
                    'phone' => $data['phone'] ?? '',
                    'gender' => $data['gender'] ?? 'Female',
                    'date_of_birth' => $data['date_of_birth'] ?? '1988-06-12',
                    'qualification' => $data['qualification'] ?? 'B.Sc. Education',
                    'joining_date' => $data['joining_date'] ?? date('Y-m-d'),
                    'address' => $data['address'] ?? '',
                    'status' => $data['status'] ?? 'Active',
                    'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
                ]);

                $newId = (int)$this->db->lastInsertId();
            } catch (Exception $e) {}
        }

        echo json_encode([
            "teacher_id" => "TCH-" . str_pad($newId, 3, '0', STR_PAD_LEFT),
            "teacher_reg_no" => $regNo,
            "first_name" => $firstName,
            "last_name" => $lastName,
            "email" => $data['email'] ?? '',
            "phone" => $data['phone'] ?? '',
            "gender" => $data['gender'] ?? 'Female',
            "qualification" => $data['qualification'] ?? 'B.Sc. Education',
            "assigned_subjects" => ["MAT001"],
            "assigned_classes" => ["Grade 10 - Science"],
            "status" => $data['status'] ?? 'Active',
            "avatar" => "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
        ]);
    }

    public function update(int $id): void {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if ($this->db) {
            try {
                $stmt = $this->db->prepare("
                    UPDATE teachers SET
                        first_name = :first_name,
                        last_name = :last_name,
                        email = :email,
                        phone = :phone,
                        qualification = :qualification,
                        status = :status
                    WHERE teacher_id = :id
                ");

                $stmt->execute([
                    'first_name' => $data['first_name'] ?? '',
                    'last_name' => $data['last_name'] ?? '',
                    'email' => $data['email'] ?? '',
                    'phone' => $data['phone'] ?? '',
                    'qualification' => $data['qualification'] ?? '',
                    'status' => $data['status'] ?? 'Active',
                    'id' => $id
                ]);
            } catch (Exception $e) {}
        }

        echo json_encode([
            "teacher_id" => "TCH-" . str_pad($id, 3, '0', STR_PAD_LEFT),
            "first_name" => $data['first_name'] ?? 'Aruni',
            "last_name" => $data['last_name'] ?? 'Jayasinghe',
            "email" => $data['email'] ?? '',
            "phone" => $data['phone'] ?? '',
            "qualification" => $data['qualification'] ?? '',
            "status" => $data['status'] ?? 'Active'
        ]);
    }

    public function delete(int $id): void {
        if ($this->db) {
            try {
                $stmt = $this->db->prepare("DELETE FROM teachers WHERE teacher_id = :id");
                $stmt->execute(['id' => $id]);
            } catch (Exception $e) {}
        }
        echo json_encode(["success" => true, "message" => "Teacher record deleted successfully"]);
    }
}
