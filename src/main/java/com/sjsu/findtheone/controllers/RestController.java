package com.sjsu.findtheone.controllers;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.sjsu.findtheone.model.Message;
import com.sjsu.findtheone.model.User;
import com.sjsu.findtheone.services.Constant;
import com.sjsu.findtheone.services.MongoService;

@Path("/rest")
public class RestController {
	
	MongoService db;
	public RestController() {
		db = new MongoService();
	}
	
	
	@GET
	@Path("/getUsersForSearch/{param}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUsersForSearch(@PathParam("param") String searchKey) {
		JSONObject result = db.getUsersForSearch(searchKey);
		System.out.println(result);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}
	
	@GET
	@Path("/hybridRecommendation/{param}")	// hybrid Recommendation based on friends and interests
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMsg(@PathParam("param") String msg) {
		List<JSONObject> list = db.getPersonalizedRecommendation(msg);
		return Response.status(200).entity(list.toString()).header("Access-Control-Allow-Origin", "*").build();
	}

	@GET
	@Path("/contentRecommendation/{param}")	// content based Recommendation
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMsg1(@PathParam("param") String username) {
		List<JSONObject> list = db.getContentRecommendation(username);
		return Response.status(200).entity(list.toString()).header("Access-Control-Allow-Origin", "*").build();
	}
	
	@GET
	@Path("/courseRecommendation/{param}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCourseRecommendation(@PathParam("param") String username){
		JSONObject jsonObject = db.getCourseRecommendation(username);
		return Response.status(Status.OK).entity(jsonObject.toString()).header("Access-Control-Allow-Origin", "*").build();
	}
	
	// for creating user
	@POST
	@Path("/create/user")					
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addUser(
			User user) throws Exception {

		Map<String, Object> map = new HashMap<String,Object>();
		map.put(Constant.UserQuery.userName, user.getUsername());
		map.put(Constant.UserQuery.email, user.getEmailID());
		map.put(Constant.UserQuery.password, user.getPassword());
		map.put(Constant.UserQuery.location, user.getLocation());
		map.put(Constant.UserQuery.description, user.getDescription());
		map.put(Constant.UserQuery.firstName, user.getFirstName());
		map.put(Constant.UserQuery.lastName, user.getLastName());
		map.put(Constant.UserQuery.phone, user.getPhone());
		map.put(Constant.UserQuery.educationLevel, user.getEducationLevel());
		map.put(Constant.UserQuery.major, user.getMajor());
		map.put(Constant.UserQuery.sessionGiven, user.getSessionGiven());
		map.put(Constant.UserQuery.sessionTaken, user.getSessionTaken());
		
		String interestList[] = trim(user.getInterests().split(Constant.COMMA));
		map.put(Constant.UserQuery.interests, interestList);
		String skillList[] = trim(user.getSkills().split(Constant.COMMA));
		map.put(Constant.UserQuery.skills, skillList);
		map.put(Constant.UserQuery.friends, trim(user.getFriends().split(Constant.COMMA)));

		boolean created = db.createUser(map);
		if (created){
			//also update the courses
			for (String interest : interestList){
				db.updateCourse(interest, user.getUsername(), true);
			}
			for (String skill : skillList){
				db.updateCourse(skill, user.getUsername(), false);
			}
			return Response.status(200).entity(Constant.ResponseMessage.userCreatedSuccess).header("Access-Control-Allow-Origin", "*").build();
		}else{
			return Response.status(Status.BAD_REQUEST).entity(Constant.ResponseMessage.userCredentialsError).header("Access-Control-Allow-Origin", "*").build();
		}
	}

	@PUT
	@Path("/update/user")				// for updating user
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateUser(
			@FormParam("username") String username,
			@FormParam("emailID") String emailID,
			@FormParam("pswd") String password,
			@FormParam("interests") String interests,
			@FormParam("skills") String skills,
			@FormParam("friends") String friends) throws Exception {

		// check if the username and password exists, if doesn't return bad request
		BasicDBObject query = new BasicDBObject().append(Constant.UserQuery.userName, username).append(Constant.UserQuery.password, password);
		boolean doesUserExist = db.doesUserExist(query);

		if(!doesUserExist){
			return Response.status(Status.BAD_REQUEST).entity(Constant.ResponseMessage.userNotFoundError).header("Access-Control-Allow-Origin", "*").build();
		}

		Map<String, Object> map = new HashMap<String,Object>();
		map.put(Constant.UserQuery.userName, username);
		map.put(Constant.UserQuery.email, emailID);
		map.put(Constant.UserQuery.password, password);
		String interestList[] = trim(interests.split(Constant.COMMA));
		map.put(Constant.UserQuery.interests, interestList);
		String skillList[] = trim(skills.split(","));
		map.put(Constant.UserQuery.skills, skillList);
		map.put(Constant.UserQuery.friends, trim(friends.split(Constant.COMMA)));

		boolean updated = db.updateUser(query, map);
		if (updated){
			//also update the courses
			for (String interest : interestList){
				db.updateCourse(interest, username, true);
			}
			for (String skill : skillList){
				db.updateCourse(skill, username, false);
			}
			return Response.status(200).entity(Constant.ResponseMessage.userUpdatedSuccess).header("Access-Control-Allow-Origin", "*").build();
		}else{
			return Response.status(Status.BAD_REQUEST).entity(Constant.ResponseMessage.userCredentialsError).header("Access-Control-Allow-Origin", "*").build();
		}
	}

	@GET
	@Path("/user/{param}")					// for getting user
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUser(@PathParam("param") String username){
		System.out.println("get user"+username);
		BasicDBObject dbobject = db.getUser(username);
		return Response.status(200).entity(dbobject.toString()).header("Access-Control-Allow-Origin", "*").build();	
	}

	@GET
	@Path("/user/{param}/friends")			// for getting friends of user
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFriendsOfUser(@PathParam("param") String userName){
		String[] friends = db.getFriendListOfUser(userName);
		BasicDBObject result = new BasicDBObject(Constant.UserQuery.friends, friends);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}

	@GET
	@Path("/user/{param}/interests")		// for getting interests of user
	@Produces(MediaType.APPLICATION_JSON)
	public Response getInterestsOfUser(@PathParam("param") String userName){
		String[] interests = db.getInterestsOfUser(userName);
		BasicDBObject result = new BasicDBObject(Constant.UserQuery.interests,interests);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}
	
	@GET
	@Path("/course/{param}")					// for getting course
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCourse(@PathParam("param") String courseName){
		System.out.println("get course"+courseName);
		BasicDBObject dbObject = db.getCourse(courseName);
		return Response.status(200).entity(dbObject.toString()).header("Access-Control-Allow-Origin", "*").build();	
	}
	
	@GET
	@Path("/course/{param}/mentors")		// for getting mentors of a subject
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMentorsOfCourse(@PathParam("param") String courseName){
		List<String> mentors = db.getMentorsOfCourse(courseName);
		BasicDBObject result = new BasicDBObject("mentors", mentors);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}
	
	@GET
	@Path("/course/{param}/students")		// for getting mentors of a subject
	@Produces(MediaType.APPLICATION_JSON)
	public Response getStudentsOfCourse(@PathParam("param") String courseName){
		List<String> students = db.getStudentsOfCourse(courseName);
		BasicDBObject result = new BasicDBObject("students", students);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}
	
	
	@POST
	@Path("/create/conversation")			// for creating message
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response addConversation(
			Message message
			) throws Exception {

		// take of exception from client side
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("from", message.getFrom());
		map.put("to", message.getTo());
		map.put("text", message.getText());
		map.put("date", new Date());

		boolean created = db.createMessage(map);
		if (created){
			System.out.println("created : true");
			return Response.status(200).entity("{\"Result\" : \"Message created successfully\"}").header("Access-Control-Allow-Origin", "*").build();
		}else{
			System.out.println("created : false");
			return Response.status(Status.BAD_REQUEST).entity("{\"Result\" : \"Message not created successfully\"}").header("Access-Control-Allow-Origin", "*").build();
		}
	}

	@GET
	@Path("/{param}/receivedText")		// for getting received Text of user
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReceivedTextsOfUser(@PathParam("param") String userName){
		List<BasicDBObject> result = db.receivedText(userName);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}
	
	@GET
	@Path("/{param}/sentText")		// for getting sent Text of user
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSentTextsOfUser(@PathParam("param") String userName){
		List<BasicDBObject> result = db.sentText(userName);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}

	@GET
	@Path("/getInbox/{param1}/{param2}") // for getting conversation between two users
	@Produces(MediaType.APPLICATION_JSON)
	public Response getInbox (@PathParam("param1") String user1,
							  @PathParam("param2") String user2){
		
		List<BasicDBObject> result = db.getInbox(user1, user2);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}

	@GET
	@Path("/getUsersWithWhomHadConversation/{username}") // getting users with whom had conversation.
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUsersWithWhomHadConversation(@PathParam("username") String userName){
		List<String> listOfUsers = db.getUsersWithWhomHadConversation(userName);
		BasicDBObject result = new BasicDBObject("result", listOfUsers);
		return Response.status(200).entity(result.toString()).header("Access-Control-Allow-Origin", "*").build();
	}
	
	
	@POST
	@Path("/isValidUser")	// is valid user
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response isValidUser(
			User user) throws Exception {
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put(Constant.UserQuery.userName, user.getUsername());
		map.put(Constant.UserQuery.password, user.getPassword());
		
		System.out.println("here");
		System.out.println(map);
		DBObject isValidUser = db.isValidUser(map);

		if (isValidUser != null){
			return Response.status(200).entity(isValidUser.toString()).header("Access-Control-Allow-Origin", "*").build();
		}else{
			return Response.status(Status.BAD_REQUEST).entity(Constant.ResponseMessage.userIncorrectCredentials).header("Access-Control-Allow-Origin", "*").build();
		}
	}

	
	//Util Functions

	//trim strings
	public String[] trim(String[] array){
		for(int i =0;i<array.length;i++){
			array[i] = array[i].trim();
		}
		return array;
	}

}
