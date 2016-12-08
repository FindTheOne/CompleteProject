package com.sjsu.findtheone.services;

public class Constant {

	//baseURL
	public static String baseURL = "http://findtheone-env.us-west-1.elasticbeanstalk.com";
	//DB
	public static String FINDTHEONEDB = "findtheonedb";

	//URI
	public static String MONGOCLIENT = "mongodb://saumeel:111@ds047592.mlab.com:47592/findtheonedb";

	//Collection
	public static String meetingCollection = "meeting";
	public static String userCollection = "user";
	public static String courseCollection = "course";
	public static String conversationCollection = "conversation";
	
	//MeetingQuery
	public static class MeetingQuery{
		public static String student = "student";
		public static String teacher = "teacher";
		public static String subject = "subject";
		public static String studyPlace = "location";
	}
	
	//CourseQuery
	public static class CourseQuery{
		public static String courseName = "name";
		public static String teachers = "teachers";
		public static String students = "students";
	}
	
	//UserQuery
	public static class UserQuery{
		public static String userName = "userName";
		public static String interests = "interests";
		public static String friends = "friends";
		public static String email = "emailID";
		public static String skills = "skills";
		public static String password = "pswd";
		public static String location = "location";
		public static String major = "major";
		public static String educationLevel = "educationLevel";
		public static String phone = "phone";
		public static String firstName = "firstName";
		public static String lastName = "lastName";
		public static String description = "description";
		public static String sessionGiven = "sessionGiven";
		public static String sessionTaken = "sessionTaken";
		public static String photoURL = "photoURL";
		
		public static String replaceRegex = "[\\[\\]\\s\"]";
		public static String emptyString = "";
	}
	
	//ResponseMessages
	public static class ResponseMessage{
		public static String userUpdatedSuccess = "{\"Message\" : \"User updated successfully\"}";
		public static String userCreatedSuccess = "{\"Message\" : \"User created successfully\"}";
		public static String userCredentialsError = "{\"Message\" : \"username already present. Try some other username !\"}";
		public static String userIncorrectCredentials = "{\"Message\" : \"Incorrect credentials, Try again!\"}";
		public static String userNotFoundError = "{\"Message\" : \"User not found !\"}";
	}
	
	
	//Extras
	public static String COMMA = ",";
}
