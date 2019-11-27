package com.wbd.wsbank;

public class Transaksi {
    int id_transaksi;
    int id_nasabah;
    String jenis;
    double jumlah = 0;
    String no_rekening;
    String waktu;
    
    public Transaksi() {
        this.id_transaksi = 0;
        this.id_nasabah = 0;
        this.jenis = "";
        this.jumlah = 0;
        this.waktu = "";
    }

    public int getIDTransaksi() {
        return id_transaksi;
    }

    public int getIDNasabah() {
        return id_nasabah;
    }

    public String getJenis() {
        return jenis;
    }

    public double getJumlah() {
        return jumlah;
    }

    public String getNoRekening() {
        return no_rekening;
    }

    public String getWaktu() {
        return waktu;
    }

    public void setIDTransaksi(int id_transaksi) {
        this.id_transaksi = id_transaksi;
    }

    public void setIDNasabah(int id_nasabah) {
        this.id_nasabah = id_nasabah;
    }

    public void setJenis(String jenis) {
        this.jenis = jenis;
    }

    public void setJumlah(double jumlah) {
        this.jumlah = jumlah;
    }

    public void setNoRekening(String no_rekening) {
        this.no_rekening = no_rekening;
    }

    public void setWaktu(String waktu) {
        this.waktu = waktu;
    }


}