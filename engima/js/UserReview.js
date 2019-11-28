function showJudul(dis, id_film) {
    console.log("sebelum get");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '../php/getFilmDetail.php?id=' + id_film +'&counter=0', true);
    xmlhttp.send();
    var hasil = "";
    console.log("habis get");
    xmlhttp.onload = function () {
        console.log(hasil);
        hasil = JSON.parse(xmlhttp.responseText);
        dis.getElementsByClassName("judul")[0].innerHTML = hasil["title"];
    }
}

function Submitting(doc, loc) {
    var url = new URL(loc);
    var tId = url.searchParams.get("tId");
    var fId = url.searchParams.get("fId");
    var token = getToken(doc, "accessTokenWBD");
    var rating = doc.getElementsByName("rating");
    var ratingVal = 0;
    for (let i = 0, length = rating.length; i < length; i++)
    {
        if (rating[i].checked)
        {
            // console.log(rating[i].value);
            ratingVal = rating[i].value;
            // console.log(ratingVal);
            break;
        }
    }
    
    var dataForm = new FormData();
    dataForm.append("rating", ratingVal);
    dataForm.append("review", doc.getElementsByName("review")[0].value);
    dataForm.append("film_id", fId);
    dataForm.append("token", token);
    dataForm.append("id_transaksi", tId);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "../php/UserReview.php", true);
    xmlhttp.send(dataForm);
    
    // console.log(ratingVal);
    var hasil = "";
    xmlhttp.onload = function () {
        //console.log(xmlhttp.responseText);
        hasil = JSON.parse(xmlhttp.responseText);
        console.log(hasil)
        if (hasil["status"] === 200) {
            loc.href = "transaction.html";
        }
    }
}

