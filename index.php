<?php
// Fallback router for XAMPP Apache serving
if (file_exists(__DIR__ . '/dist/index.html')) {
    echo file_get_contents(__DIR__ . '/dist/index.html');
} else {
    echo file_get_contents(__DIR__ . '/index.html');
}
?>
