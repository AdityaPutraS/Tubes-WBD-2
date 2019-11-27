package com.wbd.wsbank;

import java.util.ArrayList;

public class RiwayatTransaksi {
    int jumlah;
    public ArrayList<Transaksi> riwayatTransaksi;

    public RiwayatTransaksi(){
        this.jumlah = 0;
        this.riwayatTransaksi = new ArrayList<Transaksi>();
    }

    public int getJumlah() {
        return jumlah;
    }

    public ArrayList<Transaksi> getRiwayat() {
        return this.riwayatTransaksi;
    }

    public Transaksi getTransaksi(int i) {
        return this.riwayatTransaksi.get(i);
    }

    public void setJumlah(int jumlah) {
        this.jumlah = jumlah;
    }

    public void addTransaksi(Transaksi transaksi) {
        this.riwayatTransaksi.add(transaksi);
    }


}
