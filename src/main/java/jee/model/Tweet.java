/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package jee.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;



@Entity
public class Tweet  implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long id;
	private String label;
	@ManyToOne(cascade={CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name="Tweet_userID")
	private Utilisateur user;
	
        @Temporal(javax.persistence.TemporalType.DATE)
        private Date datepublication ;
	

	
	

	 public Tweet() {
		
	}




	public Tweet(Long id, int num, String label,Date publica) {
		super();
		this.id = id;
		this.label = label;
		this.datepublication=publica;
	}

    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the label
     */
    public String getLabel() {
        return label;
    }

    /**
     * @param label the label to set
     */
    public void setLabel(String label) {
        this.label = label;
    }

    /**
     * @return the user
     */
    public Utilisateur getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(Utilisateur user) {
        this.user = user;
    }

    /**
     * @return the datepublication
     */
    public Date getDatepublication() {
        return datepublication;
    }

    /**
     * @param datepublication the datepublication to set
     */
    public void setDatepublication(Date datepublication) {
        this.datepublication = datepublication;
    }
        


}