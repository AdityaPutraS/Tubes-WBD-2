function checkReview(user_id, film_id, transaction, i) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "../php/checkUserReviewFilm.php", true);
    var dataForm = new FormData();
    dataForm.append("user_id", user_id);
    dataForm.append("film_id", film_id);
    xmlhttp.send(dataForm);
    var hasil = "";
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        if(hasil["jumlah"] === 1) {
            //KALO ADA REVIEW PASTI DIA SUKSES   
            document.getElementsByClassName("button-add")[i].style.display='none';
        } else {
            document.getElementsByClassName("submitted")[i].style.display='none';
            document.getElementsByClassName("button-edit")[i].style.display='none';
            document.getElementsByClassName("button-del")[i].style.display='none' 
            if (transaction.status_transaksi != "Success") {
                document.getElementsByClassName("button-add")[i].style.display='none';
            }
        }
    }
}

var id = 0;

function connectPHPGET(phpURL, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", phpURL, true);
    xmlhttp.send();
    xmlhttp.onload = function () {
        callback(xmlhttp.responseText);
    }
}

function showTransactionList(doc, hasil) {
    hasil = JSON.parse(hasil);
    var id = hasil["user_id"][0]; 
    const user = {id};
    axios.post('http://localhost:3000/transactions', user, { responseType: 'json' })
    .then(response => {
        //console.log(response.data.values.length);
        for (var i=0;i<response.data.values.length;i++){
            const transaction = response.data.values[i];
            const film_id = transaction.id_film;

            var card = doc.createElement("div");

            var trans = doc.createElement("div");
            trans.className = "transaction";

            //INI NANTI DIGANTI DENGAN GET DATA DARI API KAN?
            var img = doc.createElement("img");
            img.src = "../img/film/ad astra.jpeg"

            var detail = doc.createElement("div");
            detail.className = "detail";

            var divKet = doc.createElement("div");

            var sId = doc.createElement("span");
            sId.className = "keterangan";
            sId.innerHTML = "ID : ";

            var tId = doc.createElement("span");
            tId.className = "keterangan";
            tId.innerHTML = transaction.id_transaksi;

            var sState = doc.createElement("span");
            sState.className = "keterangan";
            sState.innerHTML = " Status pembayaran : ";

            var tState = doc.createElement("span");
            tState.className = "keterangan";
            tState.innerHTML = transaction.status_transaksi;

            divKet.appendChild(sId);
            divKet.appendChild(tId);
            divKet.appendChild(sState);
            divKet.appendChild(tState);

            //INI NANTI DIGANTI DENGAN GET DATA DARI API KAN?
            var title = doc.createElement("p");
            title.className = "movie-title";
            title.innerHTML = "Movie Title";

            var sched = doc.createElement("span");
            sched.className = "schedule";
            sched.innerHTML = "Schedule: ";

            var show = doc.createElement("span");
            show.className = "show-time";
            show.innerHTML = transaction.jadwal.substring(0, 10) + " " + transaction.jadwal.substring(11, 16);

            var tSub = doc.createElement("p");
            tSub.className = "submitted";
            tSub.innerHTML = "Your review has been submitted.";

            detail.appendChild(divKet);
            detail.appendChild(title);
            detail.appendChild(sched);
            detail.appendChild(show);
            detail.appendChild(tSub);

            var bAdd = doc.createElement("button");
            bAdd.className = "button-add";
            bAdd.innerHTML = "Add Review";

            var bEdit = doc.createElement("button");
            bEdit.className = "button-edit";
            bEdit.innerHTML = "Edit Review";

            var bDel = doc.createElement("button");
            bDel.className = "button-del";
            bDel.innerHTML = "Delete Review";

            trans.appendChild(img);
            trans.appendChild(detail);
            trans.appendChild(bAdd);
            trans.appendChild(bEdit);
            trans.appendChild(bDel);

            var hr = doc.createElement("hr");

            card.appendChild(trans);
            card.appendChild(hr);

            doc.getElementsByClassName("transactions-content-container")[0].appendChild(card);
            checkReview(id, film_id, transaction, i);
        }
    })
    .catch(error => console.error(error));
}