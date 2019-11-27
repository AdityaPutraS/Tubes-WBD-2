<?php
    include('dbAccess.php');
    
    $db = new DatabaseAccess("localhost", "root", "", "wbd");

    $film_id = $_GET["id"];

    echo $film_id;

    $jadwal = $_GET["jadwal"];

    $tgl = $jadwal;

    echo $tgl;

    $tim = "10:00:00";

    $seat = 30;
    $query = "INSERT INTO schedule (film_id, date, time, available_seat) VALUES (".$film_id.", '".$tgl."', '".$tim."', ".$seat.")";
    $avail = $db->query(
        $query
    );

    echo $query;

    for ($i = 0; $i < 6; $i++) {
        $tgl = date("Y-m-d", strtotime("+1 day", strtotime($tgl)));
        $query = "INSERT INTO schedule (film_id, date, time, available_seat) VALUES (".$film_id.", '".$tgl."', '".$tim."', ".$seat.")";
        echo $query;
        $avail = $db->query(
            $query
        );
    }

    echo $query;
?>