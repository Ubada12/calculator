<?php

function insert($time, $input, $result)
{
    $con = new mysqli("localhost", "root", "ubadagh098", "calculator", 3307);

    if ($con->connect_error) {
        echo "<script>console.log('PHP says: Database connection failed:" . $con->connect_error . "');</script>";
        return;
    }

    $sql = $con->prepare("INSERT INTO calc_data (time, input, result) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $time, $input, $result);

    if ($sql->execute()) {
        echo "<script>console.log('PHP says: Data inserted successfully');</script>";
    } else {
        echo "<script>console.log('PHP says: Failed to insert data:" . $sql->error . "');</script>";
    }

    $sql->close();
    $con->close();
}

function delete()
{
    $con = new mysqli("localhost", "root", "ubadagh098", "calculator", 3307);

    if ($con->connect_error) {
        echo "<script>console.log('PHP says: Database connection failed:" . $con->connect_error . "');</script>";
        return;
    }

    $sql = "TRUNCATE TABLE calc_data";
    if ($con->query($sql)) {
        echo "<script>console.log('PHP says: Data deleted successfully');</script>";
    } else {
        echo "<script>console.log('PHP says: Failed to insert data:" . $con->error . "');</script>";
    }

    $con->close();
}

function setup()
{
    $con = new mysqli("localhost", "root", "ubadagh098", "", 3307);

    if ($con->connect_error) {
        echo "<script>console.log('PHP says: Database connection failed:" . $con->connect_error . "');</script>";
        return;
    }

    $DB_init = "CREATE DATABASE IF NOT EXISTS calculator";
    if ($con->query($DB_init) === TRUE) {
        if ($con->select_db("calculator")) {
            $query = "CREATE TABLE IF NOT EXISTS calc_data (
                         SR_NO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                         time VARCHAR(255) NOT NULL,
                         input VARCHAR(255) NOT NULL,
                         result VARCHAR(255) NOT NULL
                    )";

            if ($con->query($query) === TRUE) {
                echo "<script>console.log('PHP says: Database and table setup completed');</script>";
            } else {
                echo "<script>console.log('PHP says: Error creating table:" . $con->error . "');</script>";
            }
        } else {
            echo "<script>console.log('PHP says: Error selecting database:" . $con->error . "');</script>";
        }
    } else {
        echo "<script>console.log('PHP says: Error creating database:" . $con->error . "');</script>";
    }

    $con->close();
}

setup();

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    // Log the receipt of the POST request
    echo "<script>console.log('PHP says: post request received, processing...');</script>";

    // Read the raw POST data and decode it (because you're sending JSON data)
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true); // Decodes JSON to associative array

    if ($data) 
    {
        if (isset($data['action'])) 
        {
            if ($data['action'] === "insert" && isset($data['time']) && isset($data['input']) && isset($data['result'])) 
            {
                $time = $data['time'];
                $input = $data['input'];
                $result = $data['result'];
                insert($time, $input, $result);
            } 
            else if ($data['action'] === "delete") 
            {
                delete();
            }
        } 
        else 
        {
            echo "<script>console.log('PHP says: No action specified in the request');</script>";
        }
    } 
    else 
    {
        echo "<script>console.error('PHP says: Failed to decode JSON data');</script>";
    }
} 
else 
{
    echo "<script>console.log('PHP says: Request method is " . $_SERVER['REQUEST_METHOD'] . "');</script>";
}

?>
