<?php
    $api_key = '395504f844a863173c2afcf3f2b630e9';
    $url = "https://api.themoviedb.org/3/search/movie?api_key=".$api_key."&query=".$_GET["query"]."&page=".$_GET["page"];
    $response = file_get_contents($url);
    $response = json_decode($response, true);
    // echo json_encode($response);
    $hasil = array("banyakFilm" => $response["total_results"],
                   "numOfPage" => $response["total_pages"],
                   "result" => array());
    foreach ($response["results"] as $film) {
        // echo json_encode($film);
        $pathImage = "https://image.tmdb.org/t/p/w200".$film["poster_path"];
        $title = $film["title"];
        $rating = $film["vote_average"];
        $filmId = $film["id"];
        $detail = $film["overview"];
        $movie = array("film_id" => $filmId,
                       "film_picture" => $pathImage,
                       "title" => $title,
                       "avg_rating" => $rating,
                       "detail" => $detail);
        array_push($hasil["result"], $movie);
    }
    echo json_encode($hasil);

?>