/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package jee.resources;

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
        
          //Utilisateur user = new Utilisateur(username,password,sexe,email,new Date());
          Ebean.save(user);
          System.out.println("creating user");
          return user;
    }
    
    
    @GET @Path("/get")
    @Produces( MediaType.APPLICATION_JSON )
    public List<Utilisateur> getuser(){
        List<Utilisateur> users = Ebean.find(Utilisateur.class).findList();
        return users;
    }
    

}

    

