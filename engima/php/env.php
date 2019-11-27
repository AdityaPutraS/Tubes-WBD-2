<?php
    $variables = [
        'movie_db_api_key' => '395504f844a863173c2afcf3f2b630e9'
    ];

    foreach ($variables as $key => $value) {
        putenv("$key=$value");
    }
?>