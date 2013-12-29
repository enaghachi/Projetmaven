// The root URL for the RESTful services
var rootURL = "http://localhost:9000/Tweety/resources/user";

//inscription d’un user 
function bindEventsOnReady() {

$('#adduser').click(function() {
        adduser();
});

//connection
$('#login').click(function(){
   connection();
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
function bindLogoutEvent() {
$('#Logout').click(function(){
    alert("logout");
    logout();
    return false;
 });
}

//fonction de deconnection
function logout(){
    console.log('deconnection');
    $.ajax({
         type: 'GET',
         url: rootURL + '/logout',
         dataType: "json",
         success: function(data){
                    alert ("vous etes deconnecté");
                    window.location.href="index.html";
                },
         error: function(jqXHR, textStatus, errorThrown){
             alert ("problème de deconnection");
         }
    });
}

//fonction de connection
function login(username,password){
        console.log('username'+username);
        alert('username'+username);
        $.ajax({
                type: 'GET',
                url: rootURL + '/' + username+'/'+password,
                dataType: "json",
                success: function(data){
                    alert(data.toString());
                        alert('user connected successfully');
                        $('#content').html('<h2> Bienvenue '+username+' dans votre espace personnel<h2> <button id="Logout" > Logout </button>\n\
                                            <div id="writeTweet">\
                                            <h4> Ecrire un Tweet </h4>\n\
                                            <textarea cols="50" rows="5" name="areaTweet" placeholder="Ecrire un nouveau Tweet" id="areaTweet"></textarea>\n\
                                            <button id="publier"> publier </button>\n\
                                            </di>\
                                            <div id="displayTweet">\n\
                                            </div>');

                        bindLogoutEvent();                                       
                    },
               
                 error: function(jqXHR, textStatus, errorThrown){
                     
                     alert("status"+jqXHR.status); //affiche le code d erreur
                     
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
                url: rootURL+'/add',
                dataType: "json",
                data: formToJSON(),
                success: function(data, textStatus, jqXHR){
                        alert('user created successfully');
                        $("#inscription")[0].reset(); // vider les champs du formulaire 
                        $("#resultat").html('</br> Vous etes bien inscris,<h4> Entrez votre username et votre mot de passe pour se connecter </h4> </br>')
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
 
$().ready(function(){
 bindEventsOnReady();
});

