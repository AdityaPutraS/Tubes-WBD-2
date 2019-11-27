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

    public Akun getUserData(int id) {
        Akun akun = new Akun();
        String userName = "ws_bank", password = "ws_bank";
        String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
        String dbClass = "com.mysql.cj.jdbc.Driver";
        String query = "Select * FROM nasabah WHERE id_nasabah=" + id;
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

    public RiwayatTransaksi getTransactionHistory(int id) {
        int jumlah = 0;
        String userName = "ws_bank", password = "ws_bank";
        String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
        String dbClass = "com.mysql.cj.jdbc.Driver";
        String query = "Select count(*) FROM transaksi WHERE id_nasabah=" + id;
        try {

            Class.forName(dbClass);
            Connection con = DriverManager.getConnection(dbUrl, userName, password);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                jumlah = rs.getInt(1);
            } // end while

            con.close();
        } // end try

        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        catch (SQLException e) {
            e.printStackTrace();
        }

        RiwayatTransaksi riwayat = new RiwayatTransaksi(jumlah);

        query = "Select * FROM transaksi WHERE id_nasabah=" + id;
        try {

            Class.forName(dbClass);
            Connection con = DriverManager.getConnection(dbUrl, userName, password);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            int i = 0;
            while (rs.next()) {
                Transaksi transaksi = new Transaksi();
                transaksi.setIDTransaksi(rs.getInt(1));
                transaksi.setIDNasabah(rs.getInt(2));
                transaksi.setJenis(rs.getString(3));
                transaksi.setJumlah(rs.getDouble(4));
                transaksi.setNoRekening(rs.getString(5));
                transaksi.setWaktu(rs.getString(6));
                riwayat.setTransaksi(i, transaksi);
                i = i + 1;
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
            return riwayat;
        }

    }
}