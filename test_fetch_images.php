<?php
$tvName = 'bm221';
$tvDir = "atv/images/{$tvName}";

if (is_dir($tvDir)) {
    echo "Directory exists: $tvDir<br>";
    $currentWallpapers = glob("$tvDir/{$tvName}-wallpaper*.png");
    echo "Current Wallpapers:<br>";
    foreach ($currentWallpapers as $file) {
        echo $file . "<br>";
    }

    $previousWallpapers = glob("$tvDir/previous-{$tvName}-wallpaper*.png");
    echo "Previous Wallpapers:<br>";
    foreach ($previousWallpapers as $file) {
        echo $file . "<br>";
    }
} else {
    echo "Directory does not exist: $tvDir";
}
?>
