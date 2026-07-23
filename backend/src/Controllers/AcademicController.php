<?php
require_once __DIR__ . '/../../config/Database.php';

class AcademicController {
    private PDO $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getAcademicYears(): void {
        $stmt = $this->db->query("SELECT * FROM academic_years ORDER BY academic_year_id ASC");
        echo json_encode($stmt->fetchAll());
    }

    public function getClasses(): void {
        $stmt = $this->db->query("SELECT * FROM classes ORDER BY class_id ASC");
        echo json_encode($stmt->fetchAll());
    }

    public function createClass(): void {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $stmt = $this->db->prepare("
            INSERT INTO classes (school_id, grade_level, section, class_name, medium, capacity, enrolled_count, status)
            VALUES (1, :grade_level, :section, :class_name, :medium, :capacity, 0, 'Active')
        ");
        $stmt->execute([
            'grade_level' => $data['grade_level'] ?? 'Grade 10',
            'section' => $data['section'] ?? 'A',
            'class_name' => $data['class_name'] ?? 'New Class',
            'medium' => $data['medium'] ?? 'English',
            'capacity' => $data['capacity'] ?? 40,
        ]);
        echo json_encode(["success" => true]);
    }

    public function getSubjects(): void {
        $stmt = $this->db->query("SELECT * FROM subjects ORDER BY subject_id ASC");
        echo json_encode($stmt->fetchAll());
    }

    public function createSubject(): void {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $stmt = $this->db->prepare("
            INSERT INTO subjects (school_id, subject_code, subject_name, category, status)
            VALUES (1, :code, :name, :category, 'Active')
        ");
        $stmt->execute([
            'code' => $data['subject_code'] ?? 'SUB-NEW',
            'name' => $data['subject_name'] ?? 'New Subject',
            'category' => $data['category'] ?? 'Core',
        ]);
        echo json_encode(["success" => true]);
    }

    public function getTeacherAllocations(): void {
        $allocations = [
            ["allocation_id" => "ALLOC-01", "teacher_name" => "Aruni Jayasinghe", "class_name" => "Grade 10 - Science", "subject_code" => "MAT001", "subject_name" => "Mathematics", "academic_year" => "2026"],
            ["allocation_id" => "ALLOC-02", "teacher_name" => "Bandula Gunawardena", "class_name" => "Grade 10 - Science", "subject_code" => "SCI001", "subject_name" => "General Science", "academic_year" => "2026"],
            ["allocation_id" => "ALLOC-03", "teacher_name" => "Champa Ranasinghe", "class_name" => "Grade 10 - Science", "subject_code" => "ENG001", "subject_name" => "English Language", "academic_year" => "2026"],
        ];
        echo json_encode($allocations);
    }
}
