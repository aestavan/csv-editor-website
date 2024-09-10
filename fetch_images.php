<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins for simplicity
header('Content-Type: application/json'); // Ensure the content type is JSON
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Sanitize the TV name input to avoid security issues
$tvName = strtolower($_GET['tv']); // Convert to lowercase
$tvDir = "images/{$tvName}";

$response = [
    'current' => [],
    'previous' => []
];

if (is_dir($tvDir)) {
    // Fetch current wallpapers
    $currentWallpapers = glob("$tvDir/{$tvName}-wallpaper*.png");
    foreach ($currentWallpapers as $file) {
        // Use relative URL path
        $response['current'][] = "http://10.176.217.139/atv/{$file}";
    }

    // Fetch previous wallpapers
    $previousWallpapers = glob("$tvDir/previous-{$tvName}-wallpaper*.png");
    foreach ($previousWallpapers as $file) {
        // Use relative URL path
        $response['previous'][] = "http://10.176.217.139/atv/{$file}";
    }
} else {
    error_log("Directory does not exist: $tvDir");
}

header('Content-Type: application/json');
echo json_encode($response);
?>
