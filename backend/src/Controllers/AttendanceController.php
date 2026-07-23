<?php
require_once __DIR__ . '/../../config/Database.php';

class AttendanceController {
    private PDO $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function index(): void {
        $date = $_GET['date'] ?? date('Y-m-d');
        $classId = $_GET['classId'] ?? null;

        $stmt = $this->db->query("
            SELECT a.*, s.first_name, s.last_name, s.admission_no,
                   CONCAT(s.first_name, ' ', s.last_name) as student_name
            FROM attendance a
            JOIN students s ON a.student_id = s.student_id
            ORDER BY a.attendance_id DESC
        ");
        $records = $stmt->fetchAll();

        if (empty($records)) {
            // Demo records fallback if empty
            $records = [
                ["attendance_id" => "ATT-1001", "student_id" => 1, "student_name" => "Nimal Perera", "admission_no" => "GIC-2024-001", "class_id" => "CLS-10SCI", "attendance_date" => "2026-07-24", "status" => "Present", "remarks" => ""],
                ["attendance_id" => "ATT-1002", "student_id" => 2, "student_name" => "Kavindi Fernando", "admission_no" => "GIC-2024-042", "class_id" => "CLS-10SCI", "attendance_date" => "2026-07-24", "status" => "Present", "remarks" => ""],
                ["attendance_id" => "ATT-1003", "student_id" => 3, "student_name" => "Sahan Silva", "admission_no" => "GIC-2023-118", "class_id" => "CLS-11SCI", "attendance_date" => "2026-07-24", "status" => "Present", "remarks" => ""],
                ["attendance_id" => "ATT-1004", "student_id" => 4, "student_name" => "Dinithi Jayawardena", "admission_no" => "GIC-2024-089", "class_id" => "CLS-9A", "attendance_date" => "2026-07-24", "status" => "Late", "remarks" => "Traffic delay"],
            ];
        }

        echo json_encode($records);
    }

    public function saveBatch(): void {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?? [];
        $records = $data['records'] ?? [];

        $stmt = $this->db->prepare("
            INSERT INTO attendance (school_id, student_id, attendance_date, status, remarks)
            VALUES (1, :student_id, :attendance_date, :status, :remarks)
            ON DUPLICATE KEY UPDATE status = VALUES(status), remarks = VALUES(remarks)
        ");

        foreach ($records as $r) {
            $stmt->execute([
                'student_id' => $r['student_id'] ?? 1,
                'attendance_date' => $r['attendance_date'] ?? date('Y-m-d'),
                'status' => $r['status'] ?? 'Present',
                'remarks' => $r['remarks'] ?? '',
            ]);
        }

        echo json_encode(["success" => true, "message" => "Attendance batch saved"]);
    }
}
