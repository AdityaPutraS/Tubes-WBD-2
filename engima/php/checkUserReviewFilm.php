<?php
    include('dbAccess.php');
?>

<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    //CEK LAGI WOYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
    $result = $db->query('SELECT * FROM film_review WHERE id_transaksi='.$_POST["id_transaksi"]);

    $rows = $result->fetch_assoc();
    // echo json_encode($rows);
    $res = array();
    $res["jumlah"] = 0;
    //Check password, asumsi email unique sehingga password cuman ada 1
    if($result->num_rows > 0) {
        $res["jumlah"] = 1;
    }
    $res = json_encode($res);
    echo $res;

?>