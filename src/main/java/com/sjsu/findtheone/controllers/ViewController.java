package com.sjsu.findtheone.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.glassfish.jersey.server.mvc.Viewable;

@Path("/")
public class ViewController {
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public Viewable index(){
		return new Viewable("/index.jsp",null);
	}

}
