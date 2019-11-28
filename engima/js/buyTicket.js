function connectPHPGET(phpURL, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", phpURL, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        callback(xmlhttp.responseText);
    }
}

function renderHeader(doc, loc, id) {
    //console.log("ini render header");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../php/getScheduleData.php?id=" + id, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        //doc.getElementsByClassName("title")[0].innerHTML = hasil["title"];
        //doc.getElementsByClassName("title")[1].innerHTML = hasil["title"];
        let d = hasil["date"].split("-");
        let t = hasil["time"].split(":");
        // let options = {hour12: true, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        let sch = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2], 0);
        let bulan = sch.toLocaleDateString('id-ID', { month: 'long' });
        let tanggal = sch.getDay();
        let tahun = sch.getFullYear();
        let timeString = sch.toLocaleTimeString('id-ID', { hour12: true, hour: 'numeric', minute: 'numeric' });
        dateString = bulan + " " + tanggal + ", " + tahun + " - " + timeString;
        doc.getElementsByClassName("schedule")[0].innerHTML = dateString;
        doc.getElementsByClassName("schedule")[1].innerHTML = dateString;
        doc.getElementsByClassName("back-arrow")[0].onclick = function () {
            loc.href = "../html/filmDetail.html?id=" + hasil["film_id"];
        }
        //console.log(hasil["film_id"]);
        connectPHPGET("../php/getFilmDetail.php?id=" + hasil["film_id"] + "&counter=0", function (has) {
            hasil2 = JSON.parse(has);
            doc.getElementsByClassName("title")[0].innerHTML = hasil2["title"];
            doc.getElementsByClassName("title")[1].innerHTML = hasil2["title"];
        })
    }
}

function showModal(doc, loc, status) {
    var modal = doc.getElementsByClassName("modal-container")[0];
    modal.style["display"] = "block";
    modal.onclick = function () {
        modal.style["display"] = "none";
    }
    if (status === 200) {
        doc.getElementsByClassName("historyButton")[0].style["display"] = "flex";
        doc.getElementsByClassName("historyButton")[0].onclick = function () {
            loc.href = "../html/transaction.html";
        }
    } else {
        doc.getElementsByClassName("modal-title")[0].innerHTML = "Payment Failed!";
        doc.getElementsByClassName("modal-msg")[0].innerHTML = "Failed purchasing seat, please try again."
        doc.getElementsByClassName("historyButton")[0].style["display"] = "none";
    }
}

function buySeat(doc, loc, id, seatNum, user_id) {
    hasil = JSON.parse(user_id);
    var userid = parseInt(hasil["user_id"][0]);
    console.log(userid);
    var kursi = seatNum;
    // Buat nomor virtual dari ws-bank
    var xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsb="http://wsbank.wbd.com/"><soapenv:Header/><soapenv:Body><wsb:createVirtualAccount><arg0>13517000</arg0></wsb:createVirtualAccount></soapenv:Body></soapenv:Envelope>';
    axios.post('http://localhost:8080/WebServiceBank/virtualaccount?wsdl', xmls, {
        headers: { 'Content-Type': 'text/xml' }
    }).then((res) => {
        let domPar = new DOMParser();
        let doc = domPar.parseFromString(res.data, "text/xml");
        let nomorVirtual = doc.getElementsByTagName("return")[0].innerHTML;
        console.log(nomorVirtual);
        connectPHPGET("../php/getScheduleData.php?id=" + id, function (has) {
            has = JSON.parse(has);
            var filmid = has["film_id"];
            var jadwal = has["date"] + " " + has["time"];
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var waktu = date + ' ' + time;
            const user = { userid, nomorVirtual, filmid, jadwal, kursi, waktu };
            axios.post('http://localhost:3000/createTrans', user, { responseType: 'json' })
                .then(response => {
                    var id_transaksi = response.data.values.id_transaksi;
                    loc.href = "../html/transaction.html";
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", "../php/buySeat.php?id=" + id + "&seatNumber=" + seatNum + "&user_id=" + userid + "&tId=" + id_transaksi, true);
                    xmlhttp.send();
                    var hasil = "";
                    xmlhttp.onload = function () {
                        hasil = xmlhttp.responseText;
                        console.log(hasil);
                    }
                })
                .catch(error => console.error(error));
        });
    });
}

function renderSeatSelect(doc, loc, id, seatNum, maxSeat, user_id) {
    doc.getElementsByClassName("no-selection")[0].style["visibility"] = "hidden";
    doc.getElementsByClassName("already-select")[0].style["visibility"] = "visible";
    doc.getElementsByClassName("buy-button-container")[0].style["visibility"] = "visible";
    doc.getElementsByClassName("seatNumber")[0].innerHTML = "Seat #" + seatNum;
    doc.getElementsByClassName("buy-button")[0].onclick = function () {
        // INI ADD TRANSACTION
        buySeat(doc, loc, id, seatNum, user_id);
    }
    for (let i = 0; i < maxSeat; i++) {
        let seat = doc.getElementById("seat" + (i + 1));
        seat.className = "seat blue";
        if (i + 1 === seatNum) {
            seat.className += " selected";
        }
    }
    renderTakenSeat(doc, loc, id);
}

function renderSeat(doc, loc, id, user_id) {
    //console.log("ini render seat");
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("GET", "../php/getMaxSeat.php?id="+id, true);
    // xmlhttp.send();
    // var hasil = "";
    // xmlhttp.onload = function () {
    //     hasil = JSON.parse(xmlhttp.responseText);
    //     var maxSeat = hasil["max_seat"];
    //     var seatGrid = doc.getElementsByClassName("seat-grid")[0];
    //     for (let i = 0; i < maxSeat; i++) {
    //         let seat = doc.createElement("div");
    //         seat.id = "seat"+(i+1);
    //         seat.className = "seat blue";
    //         var p = doc.createElement("p");
    //         p.innerHTML = i+1;
    //         seat.appendChild(p);
    //         seat.onclick = function () {
    //             renderSeatSelect(doc, loc, id, i+1, maxSeat);
    //         }
    //         seatGrid.appendChild(seat);
    //     }
    //     renderTakenSeat(doc, loc, id);
    // }
    var maxSeat = 30;
    var seatGrid = doc.getElementsByClassName("seat-grid")[0];
    for (let i = 0; i < maxSeat; i++) {
        let seat = doc.createElement("div");
        seat.id = "seat" + (i + 1);
        seat.className = "seat blue";
        var p = doc.createElement("p");
        p.innerHTML = i + 1;
        seat.appendChild(p);
        seat.onclick = function () {
            renderSeatSelect(doc, loc, id, i + 1, maxSeat, user_id);
        }
        seatGrid.appendChild(seat);
    }
    renderTakenSeat(doc, loc, id);
}

function renderTakenSeat(doc, loc, id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../php/getSeatArr.php?id=" + id, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        // console.log(hasil);
        hasil.forEach(seat => {
            let seatTaken = doc.getElementById("seat" + seat["seat"]);
            seatTaken.className = "seat gray";
            seatTaken.onclick = undefined;
        });
    }
}