function connectPHPGET(phpURL, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", phpURL, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        callback(xmlhttp.responseText);
    }
}

function renderRating(doc, id){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../php/getAvgRating.php?id=" + id, true);
    xmlhttp.send();
    var hasil = "";
    xmlhttp.onload = function () {
        hasil = JSON.parse(xmlhttp.responseText);
        console.log(hasil.avg_rating);
        if (hasil.avg_rating!=null){
            console.log(hasil.avg_rating);
            console.log(typeof hasil.avg_rating);
            doc.getElementById("rating_user").innerHTML = hasil.avg_rating;
        } else {
            doc.getElementById("rating_user").innerHTML = 0;
        }
    }
}

function renderDetail(dis, hasil) {
    //console.log("ini masuk render detail");
    hasil = JSON.parse(hasil);
    //console.log(hasil);
    dis.getElementById("fotoFilm").src = "https://image.tmdb.org/t/p/w200" + hasil.poster_path;
    dis.getElementsByClassName("judul")[0].innerHTML = hasil.title;
    /*var sGenre = "";
    for (var i=0; i<hasil.genres.length; i++){
        sGenre += hasil.genres[i].name + " ";
    }
    dis.getElementById("genre").innerHTML = sGenre;*/
    dis.getElementById("genre").innerHTML = hasil.genres;
    dis.getElementById("durasi").innerHTML = hasil.runtime;
    dis.getElementById("releaseDate").innerHTML = hasil.release_date;
    dis.getElementById("rerataRating").innerHTML = hasil.vote_average;
    dis.getElementsByClassName("deskripsi")[0].innerHTML = hasil.overview;

    addSchedule(hasil.id, hasil.release_date);
}

function addSchedule(id, jadwal){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "../php/addSchedule.php?id=" + id + "&jadwal=" + jadwal, true);
    xmlhttp.send();
    xmlhttp.onload = function () {
        //console.log(xmlhttp.responseText);
    }
}

function renderSchedule(dis, loc, hasil) {
    //console.log("ini masuk render schedule");
    hasil = JSON.parse(hasil);
    hasil.forEach(has => {
        var row = dis.createElement("tr");

        var tanggal = dis.createElement("td");
        tanggal.innerHTML = has["date"];

        var jam = dis.createElement("td");
        jam.innerHTML = has["time"];

        var available_seat = dis.createElement("td");
        available_seat.innerHTML = has["available_seat"] + " seats";
        available_seat.className = "black";

        var status = dis.createElement("td");
        var status_img = dis.createElement("td");
        var img = dis.createElement("img");

        var d = has["date"].split("-");
        var t = has["time"].split(":");
        var date = new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2], 0);
        // console.log(date);
        if ((parseInt(has["available_seat"]) > 0) && (date >= new Date())) {
            status.innerHTML = "Book Now";
            status.className = "seatA blue";

            img.src = "../img/arrow blue.png";
            img.onclick = function() {
                loc.href = "../html/buyTicket.html?id="+has["schedule_id"];
            }
            // console.log(img.onclick);
            status_img.appendChild(img);
        }else{
            status.innerHTML = "Not Available";
            status.className = "seatNA red";

            img.src = "../img/x mark red.png";
            status_img.appendChild(img);
        }

        row.appendChild(tanggal);
        row.appendChild(jam);
        row.appendChild(available_seat);
        row.appendChild(status);
        row.appendChild(status_img);
        dis.getElementsByClassName("jadwal")[0].appendChild(row);
    });

}

function renderReview(dis, hasil) {
    // <div class="review-card">
    //     <img class="prof-pict" src="../img/profilPicture/animeKids.jpeg">
    //     <div class="review-card-content">
    //         <p>antonio wahyu</p>
    //         <div class="rating">
    //             <div class="star"></div>
    //             <p><span>5.32</span>/ 10</p>
    //         </div>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec dui purus. In id pulvinar
    //             tellus. Nulla pretium porta justo, suscipit sollicitudin lacus vulputate quis. Proin
    //             bibendum lacus sem, eu lacinia dui hendrerit pharetra.</p>
    //     </div>
    // </div>
    // <hr class="gray"></hr>
    hasil = JSON.parse(hasil);
    filmReview = dis.getElementsByClassName("film-reviews")[0];
    hr = dis.createElement("hr");
    hr.className = "gray";
    for (let i = 0; i < hasil.length; i++) {
        const element = hasil[i];
        var card = dis.createElement("div");
        card.className = "review-card";

        var img = dis.createElement("img");
        img.className = "prof-pict";
        img.src = "../img/profilPicture/"+element["profile_picture"];

        var cardContent = dis.createElement("div");
        cardContent.className = "review-card-content";

        var nama = dis.createElement("p");
        nama.innerHTML = element["username"];

        var ratingDiv = dis.createElement("div");
        ratingDiv.className = "rating";

        var star = dis.createElement("div");
        star.className = "star";

        var rating = dis.createElement("p");
        var ratingSpan = dis.createElement("span");
        ratingSpan.innerHTML = element["rating"];
        rating.appendChild(ratingSpan);
        rating.innerHTML += "/ 10";

        ratingDiv.appendChild(star);
        ratingDiv.appendChild(rating);

        var komen = dis.createElement("p");
        komen.innerHTML = element["review"];

        card.appendChild(img);
        cardContent.appendChild(nama);
        cardContent.appendChild(ratingDiv);
        cardContent.appendChild(komen);
        card.appendChild(cardContent);
        filmReview.appendChild(card);
        if(i !== hasil.length-1)
        {
            filmReview.appendChild(hr);
        }
    }
}

