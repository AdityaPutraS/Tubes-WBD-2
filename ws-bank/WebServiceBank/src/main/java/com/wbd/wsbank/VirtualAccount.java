package com.wbd.wsbank;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

//Service Endpoint Interface
@WebService
@SOAPBinding(style = Style.RPC)
public interface VirtualAccount{
	
	@WebMethod boolean validateVirtualAccount(String no_virtual);
	@WebMethod String createVirtualAccount(String no_rekening);
	
}
