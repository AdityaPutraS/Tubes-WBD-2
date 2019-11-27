<?php
    $api_key = '395504f844a863173c2afcf3f2b630e9';
    $startdate = date("Y-m-d", strtotime("now-7 Days"));
    $enddate = date("Y-m-d", strtotime("now+7 Days"));
    $url = "https://api.themoviedb.org/3/discover/movie?api_key=".$api_key."&sort_by=popularity&primary_release_date.gte=".$startdate."&primary_release_date.lte=".$enddate;
    $response = file_get_contents($url);
    $response = json_decode($response, true);
    // echo json_encode($response);
    $hasil = array();
    for($i = 0; $i < min(10, $response["total_results"]); $i += 1 )
    {
        // Butuh gambar, title, rating
        $pathImage = "https://image.tmdb.org/t/p/w200".$response["results"][$i]["poster_path"];
        // echo $pathImage;
        // echo $i;
        $title = $response["results"][$i]["title"];
        $rating = $response["results"][$i]["vote_average"];
        $filmId = $response["results"][$i]["id"];
        $movie = array("film_id" => $filmId,
                       "film_picture" => $pathImage,
                       "title" => $title,
                       "avg_rating" => $rating);
        array_push($hasil, $movie);
    }
    echo json_encode($hasil);

?>