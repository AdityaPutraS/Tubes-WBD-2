package com.wbd.wsbank;

import java.util.Date;
import javax.jws.WebService;
import java.sql.*;
import javax.sql.*;

@WebService(endpointInterface = "com.wbd.wsbank.Users")

public class UsersImpl implements Users {

    public boolean findUser(String no) {
        int count = 0;
        String userName = "ws_bank", password = "ws_bank";
        String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
        String dbClass = "com.mysql.cj.jdbc.Driver";
        String query = "Select * FROM nasabah WHERE no_rekening='" + no + "'";
        try {

            Class.forName(dbClass);
            System.out.println("Buat koneksi");
            Connection con = DriverManager.getConnection(dbUrl, userName, password);
            System.out.println("Koneksi terbuat");
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            System.out.println("Query dijalankan");

            while (rs.next()) {
                count = count + 1;

            } // end while

            con.close();
        } // end try

        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        catch (SQLException e) {
            e.printStackTrace();
        }

        finally {
            System.out.println(no);
            System.out.println(query);
            if (count == 1) {
                return true;
            } else {
                return false;
            }
        }

    }

    public int getId(String no_rekening) {
        int id = -1;
        String userName = "ws_bank", password = "ws_bank";
        String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
        String dbClass = "com.mysql.cj.jdbc.Driver";
        String query = "Select id_nasabah FROM nasabah WHERE no_rekening='" + no_rekening + "'";
        try {
            Class.forName(dbClass);
            Connection con = DriverManager.getConnection(dbUrl, userName, password);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            if (rs.next()) {
                id = rs.getInt("id_nasabah");
            } // end while
            con.close();
        } // end try

        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        catch (SQLException e) {
            e.printStackTrace();
        }
        return id;
    }

    public Akun getUserData(String no_rekening) {
        Akun akun = new Akun();
        String userName = "ws_bank", password = "ws_bank";
        String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
        String dbClass = "com.mysql.cj.jdbc.Driver";
        String query = "Select * FROM nasabah WHERE no_rekening=" + no_rekening;
        try {

            Class.forName(dbClass);
            Connection con = DriverManager.getConnection(dbUrl, userName, password);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                akun.setIDNasabah(rs.getInt(1));
                akun.setNama(rs.getString(2));
                akun.setNoRekening(rs.getString(3));
                akun.setSaldo(rs.getDouble(4));

            } // end while

            con.close();
        } // end try

        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        catch (SQLException e) {
            e.printStackTrace();
        }

        finally {
            // asumsi gaada akun dg id 0
            return akun;
        }

    }

    public RiwayatTransaksi getTransactionHistory(String no_rekening) {
        String userName = "ws_bank", password = "ws_bank";
        String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
        String dbClass = "com.mysql.cj.jdbc.Driver";

        RiwayatTransaksi riwayat = new RiwayatTransaksi();

        // Sub query 1 = No rekening sebagai pengirim
        // Sub query 2 = No rekening sebagai penerima
        // Sub query 3 = No rekening virtual dari no rekening sebagai pengirim
        // Sub query 4 = No rekening virtual dari no rekening sebagai penerima
        String subQuery1 = "(SELECT id_transaksi, no_rek_pengirim, no_rek_penerima, 'Debit' AS tipe, jumlah, waktu FROM transaksi WHERE no_rek_pengirim='"
                + no_rekening + "')";
        String subQuery2 = "(SELECT id_transaksi, no_rek_pengirim, no_rek_penerima, 'Kredit' AS tipe, jumlah, waktu FROM transaksi WHERE no_rek_penerima='"
                + no_rekening + "')";
        String subQuery3 = "(SELECT id_transaksi, no_rek_pengirim, no_rek_penerima, 'Debit' AS tipe, jumlah, waktu FROM transaksi WHERE EXISTS (SELECT * FROM akun_virtual WHERE no_rekening='"
                + no_rekening + "' and no_virtual=no_rek_pengirim))";
        String subQuery4 = "(SELECT id_transaksi, no_rek_pengirim, no_rek_penerima, 'Kredit' AS tipe, jumlah, waktu FROM transaksi WHERE EXISTS (SELECT * FROM akun_virtual WHERE no_rekening='"
                + no_rekening + "' and no_virtual=no_rek_penerima))";
        String query = subQuery1 + " UNION " + subQuery2 + " UNION " + subQuery3 + " UNION " + subQuery4
                + " ORDER BY waktu DESC";
        System.out.println(query);
        try {

            Class.forName(dbClass);
            Connection con = DriverManager.getConnection(dbUrl, userName, password);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                Transaksi transaksi = new Transaksi();
                transaksi.setIDTransaksi(rs.getInt(1));
                transaksi.setPengirim(rs.getString(2));
                transaksi.setPenerima(rs.getString(3));
                transaksi.setJenis(rs.getString(4));
                transaksi.setJumlah(rs.getDouble(5));
                transaksi.setWaktu(rs.getString(6));
                riwayat.addTransaksi(transaksi);
            }
            con.close();
        }

        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        catch (SQLException e) {
            e.printStackTrace();
        }

        finally {
            return riwayat;
        }

    }

    public RiwayatTransaksi getAllKredit(String no_rekening, String start_date, String end_date) {
        String userName = "ws_bank", password = "ws_bank";
        String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
        String dbClass = "com.mysql.cj.jdbc.Driver";

        RiwayatTransaksi riwayat = new RiwayatTransaksi();

        // Sub query 1 = No rekening sebagai penerima
        // Sub query 2 = No rekening virtual dari no rekening sebagai penerima
        String subQuery1 = "(SELECT id_transaksi, no_rek_pengirim, no_rek_penerima, 'Kredit' AS tipe, jumlah, waktu FROM transaksi WHERE no_rek_penerima='"
                + no_rekening + "' AND waktu >= DATE('" + start_date + "') AND waktu <= DATE('" + end_date + "'))";
        String subQuery2 = "(SELECT id_transaksi, no_rek_pengirim, no_rek_penerima, 'Kredit' AS tipe, jumlah, waktu FROM transaksi WHERE EXISTS (SELECT * FROM akun_virtual WHERE no_rekening='"
                + no_rekening + "' and no_virtual=no_rek_penerima)" + " AND waktu >= DATE('" + start_date
                + "') AND waktu <= DATE('" + end_date + "'))";
        String query = subQuery1 + " UNION " + subQuery2;
        System.out.println(query);
        try {

            Class.forName(dbClass);
            Connection con = DriverManager.getConnection(dbUrl, userName, password);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                Transaksi transaksi = new Transaksi();
                transaksi.setIDTransaksi(rs.getInt(1));
                transaksi.setPengirim(rs.getString(2));
                transaksi.setPenerima(rs.getString(3));
                transaksi.setJenis(rs.getString(4));
                transaksi.setJumlah(rs.getDouble(5));
                transaksi.setWaktu(rs.getString(6));
                riwayat.addTransaksi(transaksi);
            }
            con.close();
        }

        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        catch (SQLException e) {
            e.printStackTrace();
        }

        finally {
            return riwayat;
        }
    }

}