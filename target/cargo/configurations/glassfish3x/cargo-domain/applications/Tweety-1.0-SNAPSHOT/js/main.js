// The root URL for the RESTful services
var rootURL = "http://localhost:9000/Tweety/resources";

//inscription d’un user 
function bindEventsOnReady() {



$('#adduser').click(function() {
        adduser();
        return false;
});

//connection
$('#login').click(function(){
  // alert('login');
   connection();
   return false;
});

}


function connection() {
    var usernamelog = $('#usernameconnct').val();
    var passwordlog = $('#passwordconnect').val();  
    if ( usernamelog.length < 1 || passwordlog.length < 1 ){
        
        $('#resultat').html('</br><h4>oups! le username et le mot de passe ne doivent pas être vide</h4> </br>');
        
    }else{
        
        login($('#usernameconnct').val(),$('#passwordconnect').val());
        
    }
    return false;
}


//deconnection


//fonction de connection
function login(username,password){
        console.log('username'+username);
        alert('username'+username+'password'+password);
        $.ajax({
                type: 'GET',
                url: rootURL +'/user/'+ username+'/'+password,
                dataType: "json",
                success: function(data){
                    alert(data.toString());
                        alert('user connected successfully');
                         window.location.href="tweety.html";
//                        $('#search').html('<form name="recherche">'+
//                                                                    '<input type="text" name="champ" placeholder="Recherche">'+           	
//                                                                    '<input type="button" id="chercher" onClick="controle(recherche)">'+
//                                                      '</form> ');
//                                              
//                         $('#login_div').html('<button class="logout" id="Logout"></button>');                                  
//                         $('#logo_nav').html( '<!--Top Header End Here-->'+
//                                              '<div id="logo_nav">'+
//                                                '<div class="bg1">'+
//                                                  '<div class="center_frame"> '+
//                                                   ' <!--Logo And Navigation Start Here-->'+
//                                                    '<div class="logo"></div>'+
//                                                    '<ul id="navigation">'+
//                                                      '<li><a href="journal.html)"><span>HOME</span></a></li>'+
//                                                     '<li><a href="#"><span>Ma page</span></a></li>'+
//                                                      '<li><a><button class="button gray medium" value="publier" id="mes_amis">Mes amis</button></a></li>'+
//                                                      '<li><a href="#"><span>Mes Abonnes</span></a></li>'+
//                                                      '<li><a href="contact.html"><span>Contact</span></a></li>'+
//                                                    '</ul>'+
//                                                    '<!--Logo And Navigation End Here--> '+
//                                                   ' <!--slider here-->'+
//
//                                                   ' <!--  Outer wrapper for presentation only, this can be anything you like -->'+
//                                                    '<div id="infoPerson"> '+
//                                                    '<table>'+
//                                                    '<tr><td id="name_bien">Bienvenu '+ username+'</td></tr>'+
//                                                    '</table>'+
//
//                                                    '</div>'+
//                                                    '<!-- End outer wrapper --> '+
//
//                                                    '<!--slider end here--> '+
//
//                                                  '</div>'+
//                                                '</div>'+
//                                                ' </div>');                      
//
//                        $('#center_frame').html('<div class="section_left">'+
//                                                '<h5>Nouveau Tweet</h5>'+
//                                              '</div>'+
//                                              '<div class="section_middle">'+
//                                                '<table>'+
//                                                '<form method="post" id="form-addTweet">'+
//                                                    '<tr>'+
//                                                            '<td colspan="2" align="center">'+
//                                                            '<textarea cols="50" rows="8" id="areaTweet" name="areaTweet" placeholder="écrire un nouveau Tweet"></textarea>'+
//                                                            '</td>'+
//                                                    '</tr>'+
//                                                    '<tr>'+
//                                                            '<td><input type="hidden" name="usernameonline" id="usernameonline" value="'+username+'"> </td>'+
//                                                            '<td align="right" ><button class="button gray medium" value="publier" id="publier_button">Publier</button></td>'+
//                                                    '</tr>'+	
//                                                '</form>'+
//                                                '</table>'+
//
//                                              '</div>');
//                        $('#main_contant').html( '<div class="center_frame">'+
//                                     '<h2>Les tweets</h2>'+
//                                        '<div id="List_Tweet">'+ 
//                                         '</div>'+
//                                    ' </div>');                                                    

                    },
               
                 error: function(jqXHR, textStatus, errorThrown){
                     
                     alert("status&&&&&"+jqXHR.status); //affiche le code d erreur
                     
                        //remplace le contenu de la div  
                        $('#resultat').html('</br><h4>oups! username ou mot de passe incorrecte! Essaye encore une fois </h4> </br>');
          
                
                 }
        });      
        
}

//fonction inscription
function adduser() {
        console.log('addUser');
        alert('rootURL'+$("#username").val());
        $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: rootURL+'/user/add',
                dataType: "json",
                data: formToJSON(),
                success: function(data, textStatus, jqXHR){
                        alert('user created successfully');
                        $("#inscription")[0].reset(); // vider les champs du formulaire 
                       window.location.href="login.html";
                },
                error: function(jqXHR, textStatus, errorThrown){
                        alert('addUser error: ' + textStatus);
                }
        });      
}

// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
        return JSON.stringify({
                "username": $('#username').val(), 
                "password": $('#password').val(),
                "sexe": $('#sexe').val(),
                "email": $('#email').val(),
                "date_inscription": new Date()
                });
}

//message si on a aucun Tweet

 
$().ready(function(){
 bindEventsOnReady();
});

