package com.wbd.wsbank;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

@WebService
@SOAPBinding(style = Style.RPC) 
public interface Users {

    @WebMethod boolean findUser(String no);
    @WebMethod int getId(String no_rekening);
    @WebMethod Akun getUserData(int id);
    @WebMethod RiwayatTransaksi getTransactionHistory(int id);
    
}