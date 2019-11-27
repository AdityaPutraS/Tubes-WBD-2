<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    $result = $db->query(
        "SELECT film_id, date, time
        FROM schedule
        WHERE schedule_id=".$_GET["id"]
     );

    if($result){
        $res = array();
        while($data = $result->fetch_assoc()) {
            array_push($res, $data);
        }
        echo json_encode($res[0]);
    }else{
        echo json_encode("");
    }
?>