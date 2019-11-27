package com.wbd.wsbank;

public class RiwayatTransaksi {
    int jumlah;
    public Transaksi[] riwayatTransaksi;
    
    public RiwayatTransaksi(){
        this.jumlah = 0;
    }

    public RiwayatTransaksi(int jumlah){
        this.jumlah = jumlah;
        this.riwayatTransaksi = new Transaksi[jumlah];
        for (int i=0; i<jumlah; i++){
            this.riwayatTransaksi[i] = new Transaksi();
        }
    }

    public int getJumlah() {
        return jumlah;
    }

    public Transaksi[] getRiwayat() {
        return this.riwayatTransaksi;
    }

    public Transaksi getTransaksi(int i) {
        return this.riwayatTransaksi[i];
    }

    public void setJumlah(int jumlah) {
        this.jumlah = jumlah;
    }

    public void setTransaksi(int i, Transaksi transaksi) {
        this.riwayatTransaksi[i] = transaksi;
    }


}
