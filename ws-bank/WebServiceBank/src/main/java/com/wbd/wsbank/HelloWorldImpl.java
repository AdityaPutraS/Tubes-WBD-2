package com.wbd.wsbank;

import javax.jws.WebService;

//Service Implementation Bean

@WebService(endpointInterface = "com.wbd.wsbank.HelloWorld")
public class HelloWorldImpl implements HelloWorld{

	@Override
	public String getHelloWorldAsString() {
		return "Hello World JAX-WS";
	}
}