## Url Deployment : http://ec2-34-218-229-7.us-west-2.compute.amazonaws.com/

# Web Service Bank #

## Deskripsi ##
Web service Transaksi yang dibangun di atas Node.js dan mengimplementasikan protokol REST. Web service ini bertanggung jawab untuk semua transaksi tiket film Engima.
Ada tiga status pembayaran sebuah transaksi tiket film sebagai berikut.
Pending: tiket belum dibayar namun belum lewat dari masa berlaku transaksi.
Cancelled: tiket belum dibayar dan sudah lewat dari masa berlaku transaksi. Status kursi yang dipesan pada transaksi dengan status cancelled menjadi tersedia kembali.
Success: tiket sudah dibayar sebelum masa berlaku transaksi.
Berikut layanan yang disediakan oleh web service ini:
1. Menambah transaksi baru dengan status “Pending”. Input yang diberikan adalah id pengguna, id film, kursi yang dipilih, dan nomor akun virtual yang menjadi tujuan pembayaran. Layanan mengembalikan id transaksi.
2. Mengubah status suatu transaksi menjadi status “Success” atau “Cancelled”. Input yang diberikan adalah id transaksi.
3. Mengembalikan seluruh data transaksi pembelian film seorang pengguna Engima.

## Basis Data ##
Web service Transaksi memiliki basis data tersendiri yang memiliki informasi transaksi tiket film setiap pengguna Engima. Informasi transaksi adalah id pengguna, nomor akun virtual tujuan, id film, jadwal film, kursi yang dipesan, waktu pembuatan transaksi, dan status transaksi.

## Pembagian Tugas DPPL ##
1. CI/CD: 13517013, 13517025, 13517085
2. Eksplorasi AWS: 13517013
3. Testing: 13517013, 13517025, 13517085