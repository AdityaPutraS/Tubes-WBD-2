<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    //Cari film_id
    $film = $db->query("SELECT DISTINCT film_id FROM schedule WHERE schedule_id=".$_GET["id"]);
    $film_id = ($film->fetch_all())[0][0];

    $query = "INSERT INTO ticket (film_id, schedule_id, seat, user_id, id_transaksi) VALUES (".$film_id.", ".$_GET["id"].", ".$_GET["seatNumber"].", ".$_GET["user_id"].", ".$_GET["tId"].")";
    $avail = $db->query(
        $query
    );

    echo $query;

    if($avail){
        echo json_encode(array("status" => 200));
    }else{
        echo json_encode(array("status" => 400));
    }
?>