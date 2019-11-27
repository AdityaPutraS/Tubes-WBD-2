package com.wbd.wsbank;

import javax.jws.WebService;
import java.util.Date;
import java.sql.*;
import javax.sql.*;
import java.util.Random;
import java.util.Date;
import java.sql.*;
import javax.sql.*;

//Service Implementation Bean

@WebService(endpointInterface = "com.wbd.wsbank.VirtualAccount")
public class VirtualAccountImpl implements VirtualAccount {

	public boolean validateVirtualAccount(String no_virtual) {
		String userName = "ws_bank", password = "ws_bank";
		String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
		String dbClass = "com.mysql.cj.jdbc.Driver";
		String query = "Select * FROM akun_virtual WHERE no_virtual =" + no_virtual;
		boolean valid = false;
		try {
			Class.forName(dbClass);
			Connection connect = DriverManager.getConnection(dbUrl, userName, password);
			System.out.println("Berhasil connect");
			Statement statement = connect.createStatement();
			ResultSet resultSet = statement.executeQuery(query);
			if (resultSet.next()) {
				valid = true;
			}
			connect.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return valid;
	}

	public String createVirtualAccount(String no_rekening) {
		// Generate no virtual random
		int leftLimit = 48; // letter 'a'
		int rightLimit = 57; // letter 'z'
		int targetStringLength = 20;
		Random random = new Random();
		StringBuilder buffer = new StringBuilder(targetStringLength);
		for (int i = 0; i < targetStringLength; i++) {
			int randomLimitedInt = leftLimit + (int) (random.nextFloat() * (rightLimit - leftLimit + 1));
			buffer.append((char) randomLimitedInt);
		}
		String no_virtual = buffer.toString();

		String userName = "ws_bank", password = "ws_bank";
		String dbUrl = "jdbc:mysql://db:3306/ws_bank?connectTimeout=0&socketTimeout=0&autoReconnect=true";
		String dbClass = "com.mysql.cj.jdbc.Driver";
		String query = "INSERT INTO `akun_virtual` (`no_rekening`, `no_virtual`) VALUES (" + no_rekening + ", '"
				+ no_virtual + "')";
		boolean created = false;
		try {
			Class.forName(dbClass);
			Connection connection = DriverManager.getConnection(dbUrl, userName, password);
			System.out.println("Connection yes");
			Statement statement = connection.createStatement();
			int count = statement.executeUpdate(query);
			if (count == 1) {
				created = true;
			}
			connection.close();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (created) {
			return no_virtual;
		}else{
			return "-";
		}
	}

}
