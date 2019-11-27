package com.wbd.wsbank;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

//Service Endpoint Interface
@WebService
@SOAPBinding(style = Style.RPC)
public interface Transfer{
	
	@WebMethod int getTransactionId();
	
	@WebMethod String getTimestamp(int id_transaksi);
	
	@WebMethod boolean isSaldoCukup(String pengirim, int amount);
	
	@WebMethod boolean transfer(String pengirim, String penerima, int amount);
	
}
