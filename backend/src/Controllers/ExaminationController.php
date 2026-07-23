<?php
require_once __DIR__ . '/../../config/Database.php';

class ExaminationController {
    private PDO $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getExams(): void {
        $stmt = $this->db->query("SELECT * FROM exams ORDER BY exam_id DESC");
        $exams = $stmt->fetchAll();
        foreach ($exams as &$ex) {
            $ex['classes'] = ["Grade 10 - Science", "Grade 11 - Science"];
        }
        echo json_encode($exams);
    }

    public function getExamResults(): void {
        $stmt = $this->db->query("
            SELECT er.*, s.first_name, s.last_name, s.admission_no,
                   CONCAT(s.first_name, ' ', s.last_name) as student_name,
                   sub.subject_name
            FROM exam_results er
            JOIN students s ON er.student_id = s.student_id
            LEFT JOIN subjects sub ON er.subject_id = sub.subject_id
            ORDER BY er.result_id DESC
        ");
        $results = $stmt->fetchAll();
        echo json_encode($results);
    }

    public function saveResultsBatch(): void {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?? [];
        $results = $data['results'] ?? [];

        $stmt = $this->db->prepare("
            INSERT INTO exam_results (school_id, exam_id, student_id, subject_id, marks, grade, remarks)
            VALUES (1, 1, :student_id, 1, :marks, :grade, :remarks)
            ON DUPLICATE KEY UPDATE marks = VALUES(marks), grade = VALUES(grade), remarks = VALUES(remarks)
        ");

        foreach ($results as $res) {
            $stmt->execute([
                'student_id' => $res['student_id'] ?? 1,
                'marks' => $res['marks'] ?? 0,
                'grade' => $res['grade'] ?? 'F',
                'remarks' => $res['remarks'] ?? '',
            ]);
        }

        echo json_encode(["success" => true, "message" => "Exam results saved"]);
    }

    public function getGradingScale(): void {
        $scale = [
            ["grade" => "A+", "min_mark" => 85, "max_mark" => 100, "gpa" => 4.0, "description" => "Distinction"],
            ["grade" => "A", "min_mark" => 75, "max_mark" => 84, "gpa" => 3.7, "description" => "Excellent"],
            ["grade" => "B", "min_mark" => 65, "max_mark" => 74, "gpa" => 3.0, "description" => "Very Good"],
            ["grade" => "C", "min_mark" => 55, "max_mark" => 64, "gpa" => 2.0, "description" => "Credit Pass"],
            ["grade" => "S", "min_mark" => 35, "max_mark" => 54, "gpa" => 1.0, "description" => "Ordinary Pass"],
            ["grade" => "F", "min_mark" => 0, "max_mark" => 34, "gpa" => 0.0, "description" => "Fail"],
        ];
        echo json_encode($scale);
    }
}
