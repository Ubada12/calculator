<?php

function getData()
{
    $con = new mysqli("localhost", "root", "YOUR_PASSWORD", "calculator", 3307);

    if ($con->connect_error) 
    {
        echo json_encode(['status' => 'failed', 'message' => 'Database connection failed', 'error' => $con->connect_error]);
        return;
    }

    $sql= "SELECT * FROM calc_data";
    $result= $con->query($sql);
    if($result->num_rows > 0)
    {
        $rows= [];
        while($row= $result->fetch_row())
        {
            $rows[]= ['time' => $row[1], 'input' => $row[2], 'result' => $row[3]];
        }
        echo json_encode(['status' => 'present', 'data' => $rows]);
    }
    else
        echo json_encode(['status' => 'absent']);
}

function insert($time, $input, $result)
{
    $con = new mysqli("localhost", "root", "YOUR_PASSWORD", "calculator", 3307);

    if ($con->connect_error) 
    {
        echo json_encode(['status' => 'failed', 'message' => 'Database connection failed', 'error' => $con->connect_error]);
        return;
    }

    $sql = $con->prepare("INSERT INTO calc_data (event_time, input, result) VALUES (?, ?, ?)");
    $sql->bind_param("sss", $time, $input, $result);

    if ($sql->execute()) 
    {
        echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully']);
    } 
    else 
    {
        echo json_encode(['status' => 'failed', 'message' => 'Failed to insert data', 'error' => $sql->error]);
    }

    $sql->close();
    $con->close();
}

function delete()
{
    $con = new mysqli("localhost", "root", "YOUR_PASSWORD", "calculator", 3307);

    if ($con->connect_error) 
    {
        echo json_encode(['status' => 'failed', 'message' => 'Database connection failed', 'error' => $con->connect_error]);
        return;
    }

    $sql = "TRUNCATE TABLE calc_data";
    if ($con->query($sql)) 
    {
        echo json_encode(['status' => 'success', 'message' => 'Data deleted successfully']);
    } 
    else 
    {
        echo json_encode(['status' => 'failed', 'message' => 'Failed to delete data', 'error' => $con->error]);
    }

    $con->close();
}

function setup()
{
    $con = new mysqli("localhost", "root", "YOUR_PASSWORD", "", 3307);

    if ($con->connect_error) 
    {
        echo json_encode(['status' => 'failed', 'message' => 'Database connection failed', 'error' => $con->connect_error]);
        return;
    }

    $DB_init = "CREATE DATABASE IF NOT EXISTS calculator";
    if ($con->query($DB_init) === TRUE) 
    {
        if ($con->select_db("calculator")) 
        {
            $query = "CREATE TABLE IF NOT EXISTS calc_data (
                         SR_NO INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                         event_time DATETIME NOT NULL,
                         input VARCHAR(255) NOT NULL,
                         result VARCHAR(255) NOT NULL
                    )";

            if ($con->query($query) === FALSE) 
            {
                echo json_encode(['status' => 'failed', 'message' => 'Error creating table', 'error' => $con->error]);
            }
        } 
        else 
        {
            echo json_encode(['status' => 'failed', 'message' => 'Error selecting database', 'error' => $con->error]);
        }
    } 
    else 
    {
        echo json_encode(['status' => 'failed', 'message' => 'Error creating database', 'error' => $con->error]);
    }

    $con->close();
}

setup();

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
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
            else if($data['action'] === "result")
            {
                getData();
            }
        } 
        else 
        {
            echo json_encode(['status' => 'failed', 'message' => 'No action specified in the request']);
        }
    } 
    else 
    {
        echo json_encode(['status' => 'failed', 'message' => 'Failed to decode JSON data']);
    }
}

?>
