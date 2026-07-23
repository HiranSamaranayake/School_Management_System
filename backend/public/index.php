<?php
/**
 * EduSphere PHP 8+ REST API Entry Front Controller
 */

// Suppress raw HTML error output so JSON is clean
ini_set('display_errors', '0');
error_reporting(E_ALL);

// Enable CORS for React frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(["status" => "ok"]);
    exit();
}

require_once __DIR__ . '/../src/Controllers/AuthController.php';
require_once __DIR__ . '/../src/Controllers/StudentController.php';
require_once __DIR__ . '/../src/Controllers/TeacherController.php';
require_once __DIR__ . '/../src/Controllers/AcademicController.php';
require_once __DIR__ . '/../src/Controllers/AttendanceController.php';
require_once __DIR__ . '/../src/Controllers/ExaminationController.php';
require_once __DIR__ . '/../src/Controllers/AdminController.php';

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Clean path (remove base folder prefix if hosted under subfolder)
$path = preg_replace('#^.*?/api/#', '/', $requestUri);
$path = rtrim($path, '/');
if (empty($path)) $path = '/';

// Router Dispatcher
try {
    if ($method === 'POST' && $path === '/auth/login') {
        (new AuthController())->login();
    } elseif ($method === 'POST' && $path === '/auth/register') {
        (new AuthController())->register();
    } elseif ($method === 'GET' && $path === '/auth/me') {
        (new AuthController())->me();
    } elseif ($method === 'POST' && $path === '/auth/logout') {
        (new AuthController())->logout();
    }
    // Users (Administration)
    elseif ($method === 'POST' && $path === '/users') {
        (new AuthController())->register();
    }
    // Students
    elseif ($method === 'GET' && $path === '/students') {
        (new StudentController())->index();
    } elseif ($method === 'POST' && $path === '/students') {
        (new StudentController())->store();
    } elseif ($method === 'PUT' && preg_match('#^/students/(\d+)$#', $path, $m)) {
        (new StudentController())->update((int)$m[1]);
    } elseif ($method === 'DELETE' && preg_match('#^/students/(\d+)$#', $path, $m)) {
        (new StudentController())->delete((int)$m[1]);
    }
    // Teachers
    elseif ($method === 'GET' && $path === '/teachers') {
        (new TeacherController())->index();
    } elseif ($method === 'POST' && $path === '/teachers') {
        (new TeacherController())->store();
    } elseif ($method === 'PUT' && preg_match('#^/teachers/(\d+)$#', $path, $m)) {
        (new TeacherController())->update((int)$m[1]);
    } elseif ($method === 'DELETE' && preg_match('#^/teachers/(\d+)$#', $path, $m)) {
        (new TeacherController())->delete((int)$m[1]);
    }
    // Academics
    elseif ($method === 'GET' && $path === '/academic-years') {
        (new AcademicController())->getAcademicYears();
    } elseif ($method === 'GET' && $path === '/classes') {
        (new AcademicController())->getClasses();
    } elseif ($method === 'POST' && $path === '/classes') {
        (new AcademicController())->createClass();
    } elseif ($method === 'GET' && $path === '/subjects') {
        (new AcademicController())->getSubjects();
    } elseif ($method === 'POST' && $path === '/subjects') {
        (new AcademicController())->createSubject();
    } elseif ($method === 'GET' && $path === '/teacher-allocations') {
        (new AcademicController())->getTeacherAllocations();
    }
    // Attendance
    elseif ($method === 'GET' && $path === '/attendance') {
        (new AttendanceController())->index();
    } elseif ($method === 'POST' && $path === '/attendance/batch') {
        (new AttendanceController())->saveBatch();
    }
    // Exams
    elseif ($method === 'GET' && $path === '/exams') {
        (new ExaminationController())->getExams();
    } elseif ($method === 'GET' && $path === '/exam-results') {
        (new ExaminationController())->getExamResults();
    } elseif ($method === 'POST' && $path === '/exam-results/batch') {
        (new ExaminationController())->saveResultsBatch();
    } elseif ($method === 'GET' && $path === '/grading-scale') {
        (new ExaminationController())->getGradingScale();
    }
    // Administration
    elseif ($method === 'GET' && $path === '/users') {
        (new AdminController())->getUsers();
    } elseif ($method === 'GET' && $path === '/roles-permissions') {
        (new AdminController())->getRolesPermissions();
    } elseif ($method === 'PUT' && $path === '/roles-permissions') {
        (new AdminController())->updateRolesPermissions();
    } elseif ($method === 'GET' && $path === '/audit-logs') {
        (new AdminController())->getAuditLogs();
    } elseif ($method === 'GET' && $path === '/school-settings') {
        (new AdminController())->getSchoolSettings();
    } elseif ($method === 'PUT' && $path === '/school-settings') {
        (new AdminController())->updateSchoolSettings();
    } elseif ($method === 'GET' && $path === '/subscription') {
        (new AdminController())->getSubscription();
    } elseif ($method === 'GET' && $path === '/notifications') {
        (new AdminController())->getNotifications();
    } elseif ($method === 'POST' && $path === '/notifications/mark-read') {
        (new AdminController())->getNotifications();
    } elseif ($method === 'GET' && $path === '/search') {
        (new AdminController())->searchGlobal();
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Endpoint not found: " . $path]);
    }
} catch (Throwable $e) {
    http_response_code(200); // Graceful JSON response
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
