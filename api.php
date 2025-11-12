<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = '192.168.2.10';
$dbname = 'arkham_asylum';
$username = 'arkham_app';  // Replace with your actual database username
$password = 'blueteam';  // Replace with your actual database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['search'])) {
        $searchTerm = $_GET['search'];
        
        // Intentionally vulnerable query for educational purposes
        $query = "SELECT * FROM arkham_prisoners WHERE prisoner = '$searchTerm'";
        
        $stmt = $pdo->query($query);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'query' => $query,
            'results' => $results
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid request method or missing search parameter'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
}
?>