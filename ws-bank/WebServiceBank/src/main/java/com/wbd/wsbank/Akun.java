package com.wbd.wsbank;

public class Akun {
    int id_nasabah;
    String nama;
    String no_rekening;
    double saldo = 0;
    
    public int getIDNasabah() {
        return id_nasabah;
    }

    public String getNama() {
        return nama;
    }

    public String getNoRekening() {
        return no_rekening;
    }

    public double getSaldo() {
        return saldo;
    }

    public void setIDNasabah(int id_nasabah) {
        this.id_nasabah = id_nasabah;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public void setNoRekening(String no_rekening) {
        this.no_rekening = no_rekening;
    }

    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }
    
}
