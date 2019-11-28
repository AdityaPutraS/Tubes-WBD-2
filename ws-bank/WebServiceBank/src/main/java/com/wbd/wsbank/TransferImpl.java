package com.wbd.wsbank;

import javax.jws.WebService;
import javax.jws.WebMethod;
import java.util.Date;
import java.sql.*;
import javax.sql.*;

import com.mysql.cj.xdevapi.Result;

import java.util.Random;

//Service Implementation Bean

@WebService(endpointInterface = "com.wbd.wsbank.Transfer")

public class TransferImpl implements Transfer {

	private static final String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
	private static final String dbClass = "com.mysql.cj.jdbc.Driver";
	private static final String userName = "ws_bank", password = "ws_bank";

	public int getTransactionId() {
		String query = "SELECT MAX(id_transaksi) FROM `transaksi`";
		int id_transaksi = 0;
		try {
			Class.forName(dbClass);
			Connection connection = DriverManager.getConnection(dbUrl, userName, password);
			Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery(query);
			while (resultSet.next()) {
				id_transaksi = resultSet.getInt(1);
			}
			connection.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return id_transaksi;
	}

	public boolean isSaldoCukup(String pengirim, int amount) {
		String query = "SELECT * FROM nasabah WHERE no_rekening=" + pengirim;
		boolean enough = false;
		try {
			Class.forName(dbClass);
			Connection connection = DriverManager.getConnection(dbUrl, userName, password);
			Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery(query);
			if (resultSet.next()) {
				if (resultSet.getInt("saldo") >= amount) {
					enough = true;
				}
			}
			connection.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return enough;
	}

	public String getTimestamp(int id_transaksi) {
		String query = "SELECT * FROM transaksi WHERE id_transaksi=" + String.valueOf(id_transaksi);
		String timestamp = "";
		try {
			Class.forName(dbClass);
			Connection connection = DriverManager.getConnection(dbUrl, userName, password);
			Statement statement = connection.createStatement();
			ResultSet resultSet = statement.executeQuery(query);
			while (resultSet.next()) {
				timestamp = resultSet.getString("waktu");
			}
			connection.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return timestamp;
	}

	public boolean transfer(String pengirim, String penerima, int amount) {

		boolean t = false;
		boolean penerimaVirtual = false;
		UsersImpl ui = new UsersImpl();
		if (ui.findUser(pengirim)) {
			VirtualAccountImpl vai = new VirtualAccountImpl();
			if (vai.validateVirtualAccount(penerima)) {
				t = true;
				penerimaVirtual = true;
			} else if (ui.findUser(penerima)) {
				t = true;
			}
		}
		// Cek saldo
		if (t) {
			if (isSaldoCukup(pengirim, amount)) {
				// Insert ke transaksi
				String query = "INSERT INTO transaksi(no_rek_pengirim, no_rek_penerima, jumlah) VALUES(" + pengirim
						+ ", " + penerima + ", "+amount+")";
				try {
					Class.forName(dbClass);
					Connection connect = DriverManager.getConnection(dbUrl, userName, password);
					Statement statement = connect.createStatement();
					int rs = statement.executeUpdate(query);
					System.out.println(rs + " query kena");
					// Kurangin dari pengirim, tambahin ke penerima
					String updatePengirim = "UPDATE nasabah SET saldo=saldo-" + amount + " where no_rekening="
							+ pengirim;
					int updKirim = statement.executeUpdate(updatePengirim);
					System.out.println(updKirim + " query kena");
					if (penerimaVirtual) {
						String getRekeningPenerima = "SELECT no_rekening FROM akun_virtual WHERE no_virtual=" + penerima;
						ResultSet rekPenerima = statement.executeQuery(getRekeningPenerima);
						if(rekPenerima.next())
						{
							penerima = rekPenerima.getString("no_rekening");
						}
					}
					String updatePenerima = "UPDATE nasabah SET saldo=saldo+" + amount + " where no_rekening="
							+ penerima;
					int updTerima = statement.executeUpdate(updatePenerima);
					System.out.println(updTerima + " query kena");
					t = true;
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			} else {
				t = false;
			}
		}

		return t;
	}
}
