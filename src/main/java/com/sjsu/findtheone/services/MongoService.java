package com.sjsu.findtheone.services;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;


public class MongoService {
	public MongoClientURI mongoLab;
	public MongoClient client;
	public DB database;
	public DBCollection userCollection;
	public DBCollection courseCollection;
	public DBCollection meetingCollection;
	public DBCollection conversationCollection;

	public DBObject currentUser;
	public static String username = "nikita";

	//comment
	public MongoService(){
		try{
			mongoLab = new MongoClientURI(Constant.MONGOCLIENT);
			client = new MongoClient(mongoLab);
		} catch (Exception e) {
			e.printStackTrace();
		}	
		
		database = client.getDB(Constant.FINDTHEONEDB);
		userCollection = database.getCollection(Constant.userCollection);
		courseCollection = database.getCollection(Constant.courseCollection);
		meetingCollection = database.getCollection(Constant.meetingCollection);
		conversationCollection = database.getCollection(Constant.conversationCollection);
		currentUser = null;
	}
	/*
	// Hybrid Recommendation
	public List<JSONObject> getPersonalizedRecommendation(String username){
		String friends = getFriends(username);
		String[] friendsList = parseList(friends);

		String interests = getInterests(username);
		String[] interestsList = parseList(interests);

		List<JSONObject> resultJSON = new ArrayList<>();

		for (String friend : friendsList){
			for(String interest : interestsList){
				BasicDBObject query = new BasicDBObject();
				query.put(Constant.MeetingQuery.student, friend);
				query.put(Constant.MeetingQuery.subject, interest);
				DBCursor cursor = meetingCollection.find(query);
				if(cursor.hasNext()){
					//A friend can learn a same subject from multiple people, 
					//Currently assuming, he learnt a subject from only one person.
					DBObject dbObject = cursor.next();
					String teacher = dbObject.get(Constant.MeetingQuery.teacher).toString();
					String location = dbObject.get(Constant.MeetingQuery.studyPlace).toString();
					System.out.println("Recommendation based on : ");
					System.out.println("1. Friend : "+friend);
					System.out.println("2. Subject : "+interest);
					System.out.println("3. Teacher : "+teacher);
					System.out.println("3. Location : "+location);
					// Nikita learnt CS50 from Meghana at San Jose State University.
					// Would you like to contact Meghana?
					try{
						JSONObject entry = new JSONObject();
						entry.put(Constant.MeetingQuery.student, friend.toString());
						entry.put(Constant.MeetingQuery.subject, interest);
						entry.put(Constant.MeetingQuery.studyPlace, location);
						entry.put(Constant.MeetingQuery.teacher, teacher);

						resultJSON.add(entry);
					} catch(JSONException exception){
						exception.printStackTrace();
					}
				}
			}
		}
		System.out.println("printing return json : "+resultJSON.toString());
		return resultJSON;
	}
	*/
	

	// Content Recommendation
	public List<JSONObject> getContentRecommendation(String userName){
		String interests = getInterests(userName);
		String[] interestsList = parseList(interests);
		List<JSONObject> result = new ArrayList<>();
		for(String interest : interestsList){
			String teachers = getTeachers(interest);
			if(teachers.length()>0){
				String[] teacherList = parseList(teachers);
				JSONObject entry = new JSONObject();
				entry.put(interest, teacherList);
				result.add(entry);
			}
		}
		System.out.println("printing return json : "+result.toString());
		return result;
	}


	public String getInterests(String userName){
		if(currentUser == null){
			//			userCollection = database.getCollection(Constant.userCollection);
			BasicDBObject query = new BasicDBObject();
			query.put(Constant.UserQuery.userName, userName);
			DBCursor cursor = userCollection.find(query);
			if(cursor.hasNext()){
				currentUser = cursor.next();
			}
		}
		String stringify = currentUser.get(Constant.UserQuery.interests).toString();
		stringify = stringify.replaceAll(Constant.UserQuery.replaceRegex, Constant.UserQuery.emptyString);
		return stringify;
	}

	public String getFriends(String userName){
		if(currentUser == null){
			BasicDBObject query = new BasicDBObject();
			query.put(Constant.UserQuery.userName, userName);
			DBCursor cursor = userCollection.find(query);
			if(cursor.hasNext()){
				currentUser = cursor.next();
			}
		}
		String stringify = currentUser.get(Constant.UserQuery.friends).toString();
		stringify = stringify.replaceAll(Constant.UserQuery.replaceRegex, Constant.UserQuery.emptyString);
		return stringify;
	}

	public String getTeachers(String course){
		//		DBCollection collection = database.getCollection("course");
		BasicDBObject query = new BasicDBObject();
		query.put(Constant.CourseQuery.courseName, course);
		DBCursor cursor = courseCollection.find(query);
		if(cursor.hasNext()){
			currentUser = cursor.next();
		}
		String stringify = currentUser.get(Constant.CourseQuery.teachers).toString();
		stringify = stringify.replaceAll(Constant.UserQuery.replaceRegex, Constant.UserQuery.emptyString);
		return stringify;
	}



	public boolean createUser(Map<String, Object> map){
		BasicDBObject dbObject = new BasicDBObject(map);

		BasicDBObject query = new BasicDBObject(Constant.UserQuery.userName, map.get("userName"));
		DBCursor cursor = userCollection.find(query);
		if(!cursor.hasNext()){
			WriteResult result = userCollection.insert(dbObject);
			System.out.println("result : "+result.toString());
			return true;
		}
		else{
			return false;
		}
	}

	public BasicDBObject getUser(String userName){
		BasicDBObject query = new BasicDBObject();
		query.put(Constant.UserQuery.userName, userName);
		DBCursor cursor = userCollection.find(query);
		if(cursor.hasNext()){
			return new BasicDBObject("Result", cursor.next());
		}else
			return new BasicDBObject("Result", "No such username found");
	}

	
	public boolean updateCourse(String courseName, String userName, boolean isStudent){
		//		DBCollection courseCollection = database.getCollection("course");
		//check if course is present, add userName to isStudent or isTeacher
		// if course is not present, create course and then add userName to isStudent or isTeacher
		BasicDBObject isCoursePresentQuery = new BasicDBObject();
		isCoursePresentQuery.put(Constant.CourseQuery.courseName, courseName);
		DBCursor cursor = courseCollection.find(isCoursePresentQuery);
		if(!cursor.hasNext()){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put(Constant.CourseQuery.courseName, courseName);
			map.put(Constant.CourseQuery.students, new ArrayList<String>());
			map.put(Constant.CourseQuery.teachers, new ArrayList<String>());
			BasicDBObject dbObject = new BasicDBObject(map);
			courseCollection.insert(dbObject);
			System.out.println("inserted course");

		}
		cursor = courseCollection.find(isCoursePresentQuery);
		if(isStudent){
			List<String> studentList = (List<String>) cursor.next().get(Constant.CourseQuery.students);
			if (!studentList.contains(userName)) studentList.add(userName);
			courseCollection.update(new BasicDBObject(Constant.CourseQuery.courseName, courseName),
					new BasicDBObject("$set", new BasicDBObject(Constant.CourseQuery.students, studentList)));
			System.out.println("student update");
		}else{
			List<String> teachersList = (List<String>) cursor.next().get(Constant.CourseQuery.teachers);
			if (!teachersList.contains(userName)) teachersList.add(userName);
			courseCollection.update(new BasicDBObject(Constant.CourseQuery.courseName, courseName),
					new BasicDBObject("$set", new BasicDBObject(Constant.CourseQuery.teachers, teachersList)));
			System.out.println("teacher update");
		}
		return false;
	}

	public boolean updateUser(BasicDBObject userCredentials, Map<String, Object> userMap){
		userCollection.remove(userCredentials);
		return createUser(userMap);
	}

	public String[] getFriendListOfUser(String userName){
		String result = getFriends(userName);
		String[] resultJSON = parseList(result);
		return resultJSON;
	}
	public String[] getInterestsOfUser(String userName){
		String result = getInterests(userName);
		String[] resultJSON = parseList(result);
		return resultJSON;
	}
	
	public List<String> getMentorsOfCourse(String courseName){
		BasicDBObject query = new BasicDBObject().append("name", courseName);
		DBObject courseObject = courseCollection.findOne(query);
		return (List<String>)courseObject.get("teachers");
	}
	
	public List<String> getStudentsOfCourse(String courseName){
		BasicDBObject query = new BasicDBObject().append("name", courseName);
		DBObject courseObject = courseCollection.findOne(query);
		return (List<String>)courseObject.get("students");
	}

	
	public boolean createMessage(BasicDBObject messageObject){
		conversationCollection.insert(messageObject);
		return true;
	}
	
	public List<BasicDBObject> receivedText(String to){
		List<BasicDBObject> list = new ArrayList<BasicDBObject>();
		
		DBCursor cursor = conversationCollection.find(new BasicDBObject().append("to", to));
		
		while(cursor.hasNext()){
			DBObject obj = cursor.next();
			BasicDBObject listItem = new BasicDBObject().append("from", obj.get("from").toString())
														.append("text", obj.get("text").toString())
														.append("date", obj.get("date"));
			list.add(listItem);
		}
		return list;
	}
	
	public List<BasicDBObject> sentText(String from){
		List<BasicDBObject> list = new ArrayList<BasicDBObject>();
		
		DBCursor cursor = conversationCollection.find(new BasicDBObject().append("from", from));
		
		while(cursor.hasNext()){
			DBObject obj = cursor.next();
			BasicDBObject listItem = new BasicDBObject().append("to", obj.get("to").toString())
														.append("text", obj.get("text").toString())
														.append("date", obj.get("date"));
			list.add(listItem);
		}
		return list;
	}
	
	//get conversation between two users
	public List<BasicDBObject> getInbox(String user1, String user2){
		List<BasicDBObject> list = new ArrayList<BasicDBObject>();
		List<BasicDBObject> queries = new ArrayList<BasicDBObject>();
		
		queries.add(new BasicDBObject().append("to", user1).append("from", user2));
		queries.add(new BasicDBObject().append("to", user2).append("from", user1));
		
		DBCursor cursor = conversationCollection.find(new BasicDBObject("$or", queries)).sort(new BasicDBObject("date", 1));
		
		while(cursor.hasNext()){
			DBObject obj = cursor.next();
			BasicDBObject listItem = new BasicDBObject().append("to", obj.get("to").toString())
														.append("text", obj.get("text").toString())
														.append("date", obj.get("date"));
			list.add(listItem);
		}
		return list;
	}
	
	public boolean doesUserExist(BasicDBObject query){
		DBObject findUser = userCollection.findOne(query);
		if (findUser == null)
			return false;
		return true;
	}

	public String[] parseList(String combinedString){
		String[] list = combinedString.split(Constant.COMMA);
		if(list.length>0)
			return list;
		return new String[0];
	}
}
