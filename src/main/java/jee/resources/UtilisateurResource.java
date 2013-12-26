/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package jee.resources;

import jee.MD5Password;
import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlUpdate;
import com.avaje.ebean.Transaction;
import com.avaje.ebean.annotation.Transactional;
import jee.model.Utilisateur;
import java.util.Date;
import java.util.List;
import javax.naming.InitialContext;
import javax.persistence.EntityManager;
import javax.transaction.UserTransaction;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

/**
 *
 * @author bdiop
 */
@Path("/user")
public class UtilisateurResource {
    
    
    @POST
    @Path("/add")
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Utilisateur adduser(Utilisateur user) {
         String passwordhashe = MD5Password.getEncodedPassword(user.getPassword());
          Utilisateur saveuser = new Utilisateur(user.getUsername(),passwordhashe,user.getSexe(),user.getEmail(),new Date());
          Ebean.save(saveuser);
          System.out.println("creating user");
          return saveuser;
    }
    
    
    @GET @Path("/get")
    @Produces( MediaType.APPLICATION_JSON )
    public List<Utilisateur> getusers(){
        List<Utilisateur> users = Ebean.find(Utilisateur.class).findList();
        return users;
    }
    
    @GET @Path("{username}/{password}")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
        public Utilisateur login(@PathParam("username") String username, @PathParam("password") String password) {
            
                System.out.println("findById " + username);
                String passwordhashe = MD5Password.getEncodedPassword(password);
                Utilisateur user = Ebean.find(Utilisateur.class).where()
               .eq("username", username)
               .eq("password", passwordhashe).findUnique();
                
       return user;
        }
        
   
}

    

