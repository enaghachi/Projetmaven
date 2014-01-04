/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jee.resources;

import com.avaje.ebean.Ebean;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger; 
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import jee.Status;
import jee.model.Tweet;
import jee.model.Utilisateur;


/**
 *
 * @author ighachane
 */
@Path("/Tweet")
public class TweetResource {
    
    @POST 
    @Path("/add")
    @Consumes({MediaType.APPLICATION_FORM_URLENCODED, "application/json","application/xml"})
    @Produces({MediaType.APPLICATION_FORM_URLENCODED, "application/json","application/xml"})
    public Tweet addTweet(MultivaluedMap<String, String> inFormParams){
  
           String contenu = inFormParams.getFirst("areaTweet");
           String userconnecte = inFormParams.getFirst("usernameonline");
           Utilisateur usernew = Ebean.find(Utilisateur.class).where()
                                                               .eq("username",userconnecte).findUnique();
           //Tweet savetweet = new Tweet(new Date(),label,usernew);
           Tweet saveTweet = new Tweet();
           saveTweet.setDatepublication(new Date());
           saveTweet.setUser(usernew);
            if(!contenu.contains("@")){
        	 if(!contenu.contains("#") ){
        		 saveTweet.setLabel(contenu);
        		 saveTweet.setSujet("");
        	 }
        	 else{
        		Pattern p1 = Pattern.compile("(.*) #(.*)");
                        Matcher m1 = p1.matcher(contenu);
                        while(m1.find()){
        			saveTweet.setLabel(m1.group(1));
        			saveTweet.setSujet(m1.group(2));
        				}		 
                    }
            }else{
        	 if(!contenu.contains("#") ){
		        	 Pattern p2 = Pattern.compile("(.*) @(.*)");
		        	 Matcher m2 = p2.matcher(contenu);
		        	 while(m2.find()){
		        		 saveTweet.setLabel(m2.group(1));
		        		 saveTweet.setSujet("");
		    			 saveTweet.setTaguser(m2.group(2));
		  			}
        	 }
        	 else{
        		 Pattern p3 = Pattern.compile("(.*) @(.*) #(.*)");
        		 Matcher m3 = p3.matcher(contenu);
        		 while(m3.find()){
        			 saveTweet.setLabel(m3.group(1));
        			 saveTweet.setSujet(m3.group(3));
        			 saveTweet.setTaguser(m3.group(2));
                                           }
                      }
                }	
       
            Ebean.save(saveTweet);
            System.out.println("creating tweet");
            //return Response.status(new Status(Status.OK)).build(); 
            return saveTweet;
	    //}
    }
    
    @GET @Path("/get")
    @Produces( MediaType.APPLICATION_JSON )
    public List<Tweet> getTweets(@CookieParam("authCookie") Cookie authenciateCookie){
        List<Tweet> Tweets;
        if (authenciateCookie == null) {
			//return Response.status(new Status(Status.USER_OFFLINE)).build();
                System.out.println("vous avez pas le droit vous etes deconnecté");
                Tweets = null;
		}
        else{
                Tweets = Ebean.find(Tweet.class).findList(); 
        }
        return Tweets;
    }
    
}
