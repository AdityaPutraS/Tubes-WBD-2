<?php
    include('dbAccess.php');
?>

<?php
    $db = new DatabaseAccess("localhost", "root", "", "wbd");
    $query = "DELETE FROM film_review WHERE id_transaksi =" . $_POST["id_transaksi"];
    $res = array();
    $res["status"] = 200;
    $succ = $db->query($query);
    if(!$succ) {
        $res["status"] = 400;
    }
    $res = json_encode($res);
    echo $res;

?>