package com.wbd.wsbank;

import javax.jws.WebService;
import javax.jws.WebMethod;
import java.util.Date;
import java.sql.*;
import javax.sql.*;
import java.util.Random;

//Service Implementation Bean

@WebService(endpointInterface = "com.wbd.wsbank.Transfer")

public class TransferImpl implements Transfer {

	private static final String dbUrl = "jdbc:mysql://localhost:3306/bankdb?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
	private static final String dbClass = "com.mysql.cj.jdbc.Driver";
	private static final String userName = "root", password = "";

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
			while (resultSet.next()) {
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
		String userName = "ws_bank", password = "ws_bank";
		String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
		String dbClass = "com.mysql.cj.jdbc.Driver";
		UsersImpl ui = new UsersImpl();
		// Get id pengirim
		int idPengirim = ui.getId(pengirim);
		// Get id penerima
		int idPenerima = ui.getId(penerima);

		boolean t = false;
		// Cek apakah akun valid
		if (idPengirim != -1) {
			if (idPenerima == -1) {
				VirtualAccountImpl vai = new VirtualAccountImpl();
				if (vai.validateVirtualAccount(penerima)) {
					t = true;
				}
			} else {
				t = true;
			}
		}

		// Cek saldo
		if (t) {
			if (isSaldoCukup(pengirim, amount)) {
				// Insert ke transaksi
				String debit = "INSERT INTO transaksi(id_nasabah, jenis, jumlah, no_rekening, waktu) VALUES("
						+ idPengirim + ", " + "1, " + amount + ", " + penerima + ", now())";
				String kredit = "INSERT INTO transaksi(id_nasabah, jenis, jumlah, no_rekening, waktu) VALUES("
						+ idPenerima + ", " + "2, " + amount + ", " + pengirim + ", now())";
				try {
					Class.forName(dbClass);
					Connection connect = DriverManager.getConnection(dbUrl, userName, password);
					Statement statement = connect.createStatement();
					ResultSet deb = statement.executeQuery(debit);
					ResultSet kre = statement.executeQuery(kredit);
					if (deb.next() && kre.next()) {
						// Kurangin dari penerima, tambahin ke pengirim
						String updatePenerima = "UPDATE nasabah SET jumlah=jumlah-" + amount + " where id_nasabah="
								+ idPengirim;
						ResultSet updPen = statement.executeQuery(updatePenerima);
						if (updPen.next()) {
							return true;
						} else {
							t = false;
						}
					} else {
						t = false;
					}
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
