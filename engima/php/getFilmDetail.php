<?php
    $api_key = '395504f844a863173c2afcf3f2b630e9';
    $url = "https://api.themoviedb.org/3/movie/".$_GET["id"]."?api_key=".$api_key."&language=en-US";
    $response = file_get_contents($url);
    $response = json_decode($response, true);

    $hasil = array();
    $hasil["poster_path"] = $response["poster_path"];
    $hasil["title"] = $response["title"];
    $sGenre = "";
    for ($i=0; $i < count($response["genres"]); $i++){
        $sGenre = $sGenre . $response["genres"][$i]["name"] . " ";
    }
    $hasil["genres"] = $sGenre;
    $hasil["runtime"] = $response["runtime"];
    $hasil["release_date"] = $response["release_date"];
    $hasil["vote_average"] = $response["vote_average"];
    $hasil["overview"] = $response["overview"];
    $hasil["id"] = $response["id"];
    $hasil["counter"] = $_GET["counter"];

    echo json_encode($hasil);
    
?>