package com.wbd.wsbank;

public class Transaksi {
    int id_transaksi;
    String pengirim, penerima;
    String jenis;
    double jumlah = 0;
    String waktu;
    
    public Transaksi() {
        this.id_transaksi = 0;
        this.pengirim = "";
        this.penerima = "";
        this.jenis = "";
        this.jumlah = 0;
        this.waktu = "";
    }

    public int getIDTransaksi() {
        return id_transaksi;
    }

    public String getPengirim() {
        return pengirim;
    }

    public String getPenerima() {
        return penerima;
    }

    public String getJenis() {
        return jenis;
    }

    public double getJumlah() {
        return jumlah;
    }

    public String getWaktu() {
        return waktu;
    }

    public void setIDTransaksi(int id_transaksi) {
        this.id_transaksi = id_transaksi;
    }

    public void setPengirim(String no_rekening) {
        this.pengirim = no_rekening;
    }

    public void setPenerima(String no_rekening) {
        this.penerima = no_rekening;
    }

    public void setJenis(String jenis) {
        this.jenis = jenis;
    }

    public void setJumlah(double jumlah) {
        this.jumlah = jumlah;
    }

    public void setWaktu(String waktu) {
        this.waktu = waktu;
    }


}