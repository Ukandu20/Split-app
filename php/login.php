<?php
// Replace these with your own database credentials
$servername = "localhost";
$username = "ukandu_db";
$password = "1234";
$dbname = "ukandu_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Login successful
    $row = $result->fetch_assoc();
    $role = $row['role'];
    
    if ($role == 'admin') {
        // Redirect to admin user page
        header("Location: admin_user_page.html");
    } else {
        // Redirect to authenticated user page
        header("Location: authenticated_user_page.html");
    }
} else {
    // Login failed, redirect back to login page with an error message
    header("Location: login.html?error=Invalid email or password");
}

$conn->close();

