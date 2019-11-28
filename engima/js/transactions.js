function updateTransactions(hasil){
    hasil = JSON.parse(hasil);
    var id = hasil["user_id"][0]; 
    const user = {id};
    axios.post('http://localhost:3000/transactions', user, { responseType: 'json' })
    .then(response => {
        for (var i=0;i<response.data.values.length;i++){
            transaksi = response.data.values[i];
            //console.log(transaksi);
            if (transaksi.status_transaksi == 'Pending'){  
                //CEK DI WS BANK ADA TRANSAKSI GAK
                // KALO GA
                var tDate = new Date(transaksi.waktu);
                var dl = new Date(transaksi.waktu);
                dl.setMinutes(tDate.getMinutes()+2);
                var now = new Date();
                if (dl.getTime() < now.getTime()){
                    //console.log("cancel woy");
                    var id = transaksi.id_transaksi;
                    const trans = {id};
                    axios.post('http://localhost:3000/cancelTrans', trans, { responseType: 'json' })
                    .then(response => {
                        //console.log(response);
                    })
                    .catch(error => console.error(error)); 
                }
            }
        }
    })
    .catch(error => console.error(error));   
}

function checkReview(transaction, i) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "../php/checkUserReviewFilm.php", true);
    var dataForm = new FormData();
    dataForm.append("id_transaksi", transaction.id_transaksi);
    xmlhttp.send(dataForm);
    var hasil = "";
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        if(hasil["jumlah"] === 1) {
            //KALO ADA REVIEW PASTI DIA SUKSES   
            var cards = document.getElementsByClassName("tCard");
            for(var x=0; x < cards.length; x++){
                if (cards[x].value == i){
                    cards[x].getElementsByClassName("button-add")[0].style.display='none';
                }
            }
        } else {
            var cards = document.getElementsByClassName("tCard");
            for(var x=0; x < cards.length; x++){
                if (cards[x].value == i){
                    cards[x].getElementsByClassName("submitted")[0].style.display='none';
                    cards[x].getElementsByClassName("button-edit")[0].style.display='none';
                    cards[x].getElementsByClassName("button-del")[0].style.display='none' 
                }
            }
            if (transaction.status_transaksi != "Success") {
                for(var x=0; x < cards.length; x++){
                    if (cards[x].value == i){
                        cards[x].getElementsByClassName("button-add")[0].style.display='none';
                    }
                }
            }
        }
    }
}

function connectPHPGET(phpURL, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", phpURL, true);
    xmlhttp.send();
    xmlhttp.onload = function () {
        callback(xmlhttp.responseText);
    }
}

function showTransactionList(doc, hasil, loc) {
    hasil = JSON.parse(hasil);
    var id = hasil["user_id"][0]; 
    const user = {id};
    axios.post('http://localhost:3000/transactions', user, { responseType: 'json' })
    .then(response => {
        //console.log(response.data.values.length);
        for (var i=0;i<response.data.values.length;i++){
            const transaction = response.data.values[i];
            const film_id = transaction.id_film;
            
            axios.get('../php/getFilmDetail.php?id=' + film_id +'&counter=' + i, { responseType: 'json' })
            .then(res => {
                var card = doc.createElement("div");
                card.className = "tCard";
                card.value = parseInt(res.data.counter);

                var trans = doc.createElement("div");
                trans.className = "transaction";
    
                var img = doc.createElement("img");
                img.className = "foto";
                img.src = "https://image.tmdb.org/t/p/w200" + res.data.poster_path;
    
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
    
                var title = doc.createElement("p");
                title.className = "movie-title";
                title.innerHTML = res.data.title;
    
                var sched = doc.createElement("span");
                sched.className = "schedule";
                sched.innerHTML = "Schedule: ";
    
                var show = doc.createElement("span");
                show.className = "show-time";
                //show.innerHTML = transaction.jadwal.substring(0, 10) + " " + transaction.jadwal.substring(11, 16);
                //show.innerHTML = transaction.jadwal.substring(0, 10) + " " + (parseInt(transaction.jadwal.substring(11, 13)) + 7) + transaction.jadwal.substring(13, 16);

                showTime = new Date(transaction.jadwal);
                var date = showTime.getFullYear()+'-'+(showTime.getMonth()+1)+'-'+showTime.getDate();
                var time = showTime.getHours() + ":" + (showTime.getMinutes()<10?'0':'') + showTime.getMinutes();
                var dateTime = date+' '+time;
                show.innerHTML = dateTime;

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
                bAdd.onclick = function() {
                    loc.href = "../html/UserReview.html?tId=" + transaction.id_transaksi + "&fId=" + film_id;
                }
    
                var bEdit = doc.createElement("button");
                bEdit.className = "button-edit";
                bEdit.innerHTML = "Edit Review";
                bEdit.onclick = function() {
                    console.log("ini mencet edit");
                    loc.href = "../html/UserReview.html?tId=" + transaction.id_transaksi + "&fId=" + film_id;
                }
    
                var bDel = doc.createElement("button");
                bDel.className = "button-del";
                bDel.innerHTML = "Delete Review";
                bDel.onclick = function() {
                    console.log("ini mencet del");
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("POST", "../php/deleteReview.php", true);
                    var dataForm = new FormData();
                    dataForm.append("id_transaksi", transaction.id_transaksi);
                    xmlhttp.send(dataForm);
                    var hasil = "";
                    xmlhttp.onload = function () {
                        hasil = JSON.parse(xmlhttp.responseText);
                        if (hasil["status"] === 200) {
                            loc.href = "transaction.html";
                        }
                    }   
                }

                trans.appendChild(img);
                trans.appendChild(detail);
                trans.appendChild(bAdd);
                trans.appendChild(bEdit);
                trans.appendChild(bDel);
    
                var hr = doc.createElement("hr");
    
                card.appendChild(trans);
                card.appendChild(hr);                
            
                doc.getElementsByClassName("transactions-content-container")[0].appendChild(card);
                
                //console.log(doc.getElementsByClassName("button-add")[0]);
                //console.log(doc.getElementsByClassName("button-add")[1]);
                checkReview(transaction, parseInt(res.data.counter));
            })  
        }
    })
    .catch(error => console.error(error));
}


