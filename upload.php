<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins for simplicity
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow headers

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight request
    exit(0);
}

// Check if tvName is provided
if (!isset($_POST['tvName'])) {
    echo json_encode(['success' => false, 'message' => 'TV name is required']);
    exit(0);
}

$tvName = strtolower($_POST['tvName']); // Convert to lowercase
$targetDir = "images/{$tvName}/";

// Create the directory if it doesn't exist
if (!is_dir($targetDir)) {
    mkdir($targetDir, 0777, true);
}

function renameExistingFiles($targetDir, $tvName) {
    // Pattern for current wallpaper files
    $currentFiles = glob("$targetDir{$tvName}-wallpaper*.png");

    foreach ($currentFiles as $file) {
        // Create a new filename with "previous-" prefix
        $pathInfo = pathinfo($file);
        $newFilename = $pathInfo['dirname'] . '/previous-' . $pathInfo['basename'];
        rename($file, $newFilename);
    }
}

// Rename existing wallpapers to maintain history
renameExistingFiles($targetDir, $tvName);

// Handle the file uploads
$response = ['success' => true, 'message' => 'Files uploaded successfully'];

try {
    if (isset($_FILES['wallpaper1'])) {
        $wallpaper1 = $_FILES['wallpaper1'];
        move_uploaded_file($wallpaper1['tmp_name'], $targetDir . "{$tvName}-wallpaper1.png");
    } else {
        throw new Exception('Wallpaper 1 is missing');
    }

    if (isset($_FILES['wallpaper2'])) {
        $wallpaper2 = $_FILES['wallpaper2'];
        move_uploaded_file($wallpaper2['tmp_name'], $targetDir . "{$tvName}-wallpaper2.png");
    } else {
        throw new Exception('Wallpaper 2 is missing');
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>
