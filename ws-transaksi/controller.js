'use strict';

var response = require('./res');
var connection = require('./conn');

exports.trans = function(req, res) {

    var id_pengguna = req.body.id;

    connection.query('SELECT * FROM transaksi WHERE id_pengguna = ?', 
    [ id_pengguna ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
            console.log("Berhasil harusnya di id pengguna " + id_pengguna)
            console.log(rows)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.cancelTrans = function(req, res) {
    
    var id_transaksi = req.body.id;

    connection.query('UPDATE transaksi SET status_transaksi = 2 WHERE id_transaksi = ?',
    [ id_transaksi ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil meng-cancel transaksi!", res)
        }
    });
};

exports.successTrans = function(req, res) {
    
    var id_transaksi = req.body.id;
    
    var query = connection.query('UPDATE transaksi SET status_transaksi = 3 WHERE id_transaksi = ?',
    [ id_transaksi ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil meng-success transaksi!", res)
        }
    });
};

exports.createTrans = function(req, res) {
    
    var id_transaksi = req.body.id;
    var id_pengguna = req.body.userid;
    var nomor_virtual = req.body.nomorVirtual;
    var id_film = req.body.filmid;
    var jadwal = req.body.jadwal;
    var kursi = req.body.kursi;
    var waktu = req.body.waktu;

    var query = connection.query('INSERT INTO transaksi (id_transaksi, id_pengguna, nomor_virtual, id_film, jadwal, kursi, waktu, status_transaksi) VALUES (?,?,?,?,?,?,?,?)',
    [ id_transaksi, id_pengguna, nomor_virtual, id_film, jadwal, kursi, waktu, 1 ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil membuat transaksi!", res)
        }
    });

};