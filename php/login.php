<?php
// Replace these with your own database credentials
$servername = "localhost";
$username = "ukandu_db";
$password = "";
$dbname = "ukandu_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submissions
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['login'])) {
        // Handle login
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
    } elseif (isset($_POST['signup'])) {
        // Handle sign-up
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

        if ($conn->query($sql) === TRUE) {
            // Sign-up successful, redirect to login page
            header("Location: login.html?success=Account created successfully. You can now login");
        } else {
            // Sign-up failed, redirect back to sign-up page with an error message
            header("Location: login.html?error=Error creating account. Please try again");
        }
    }
}

$conn->close();
?>
