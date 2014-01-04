// The root URL for the RESTful services
var rootURL = "http://localhost:9000/Tweety/resources/user";

//inscription d’un user 
function bindEventsOnReady() {



$('#adduser').click(function() {
        adduser();
        return false;
});

//connection
$('#login').click(function(){
    alert('login');
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
function bindLogoutEvent() {
$('#Logout').click(function(){
   
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
        alert('username'+username+'password'+password);
        $.ajax({
                type: 'GET',
                url: rootURL + '/' + username+'/'+password,
                dataType: "json",
                success: function(data){
                    alert(data.toString());
                        alert('user connected successfully');
                        $('#header').html('<div id="top_header">'+
                                                '<div class="center_frame">'+
                                                  '<div class="top">'+
                                                      '<div class="search">'+
                                                              '<form name="recherche">'+
                                                                    '<input type="text" name="champ" placeholder="Recherche">'+           	
                                                                    '<input type="button" id="chercher" onClick="controle(recherche)">'+
                                                      '</form> '+ 
                                                             ' </div>'+
                                                   ' <div class="login"><a href="@routes.Authentication.logout()" class="logout"></a></div>'+
                                                  '</div>'+
                                                '</div>'+
                                              '</div>'+
                                              '<!--Top Header End Here-->'+
                                              '<div id="logo_nav">'+
                                                '<div class="bg1">'+
                                                  '<div class="center_frame"> '+
                                                   ' <!--Logo And Navigation Start Here-->'+
                                                    '<div class="logo"></div>'+
                                                    '<ul id="navigation">'+
                                                      '<li><a href="journal.html)"><span>HOME</span></a></li>'+
                                                     '<li><a href="#"><span>Ma page</span></a></li>'+
                                                      '<li><a href="#"><span>Mes Amis</span></a></li>'+
                                                      '<li><a href="#"><span>Mes Abonnes</span></a></li>'+
                                                      '<li><a href="contact.html"><span>Contact</span></a></li>'+
                                                    '</ul>'+
                                                    '<!--Logo And Navigation End Here--> '+
                                                   ' <!--slider here-->'+

                                                   ' <!--  Outer wrapper for presentation only, this can be anything you like -->'+
                                                    '<div id="infoPerson"> '+
                                                    '<table>'+
                                                    '<tr><td id="name_bien">Bienvenu '+ username+'</td></tr>'+
                                                    '</table>'+

                                                    '</div>'+
                                                    '<!-- End outer wrapper --> '+

                                                    '<!--slider end here--> '+

                                                  '</div>'+
                                                '</div>'+
                                             ' </div>');
                        $('#wrapper').html('<div id="wrapper_top">'+
                                            '<div class="center_frame">'+
                                              '<div class="section_left">'+
                                                '<h5>Nouveau Tweet</h5>'+
                                              '</div>'+
                                              '<div class="section_middle">'+

                                                '<table>'+
                                                '<form method="post" id="form-addTweet" action="/tweet/add">'+
                                                    '<tr>'+
                                                            '<td colspan="2" align="center">'+
                                                            '<textarea cols="50" rows="8" id="areaTweet" name="contenu" placeholder="écrire un nouveau Tweet"></textarea>'+
                                                            '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                            '<td><input type="hidden" name="username" id="usernameonline" value="'+username+'"> </td>'+
                                                            '<td align="right" ><input  type="submit" class="button gray medium" value="publier" id="Publier"> </td>'+
                                                    '</tr>'+	
                                                '</form>'+
                                                '</table>'+

                                              '</div>'+
                                            '</div>'+
                                         ' </div>'+
                                            '<!--Top Wrapper End Here-->'+
                                          '<!--Main Contant Start Here-->'+
                                         ' <div id="main_contant">'+
                                            '<div class="center_frame">'+
                                              '<h2>Les tweets</h2>'+
                                                    '<div class="box_2"> <img src="bootstrap/img/box_2.png" alt=""  class="main_img_2" />'+
                                                          '<div class="text">'+
                                                           ' <h6>@tweet.user.username</h6>'+
                                                            '<h5>@tweet.creationDate</h5>'+
                                                            '<p>contenu de tweet</p>'+
                                                          '</div>'+       
                                                    '</div> '+                                                                        
                                             ' </div>'+
                                           ' </div>'+
                                         ' <!-- Main Contant End Here --> ');
                                 
                        
                        bindLogoutEvent();                                       
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
                url: rootURL+'/add',
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
//-------------------------------------Tweet------------------------------------------
//deconnection
function bindaddTweetEvent() {
$('#publier').click(function(){
    alert("addTweet");
    addTweet();
    return false;
 });
}
//fonction addTweet
function addTweet(){
    console.log('addUser');
    alert('Tweet'+$("#areaTweet").val());
    alert('username'+$('#usernameonline').val());
    var data = $("#form-addTweet").serializeArray();
    $.ajax({
                type: 'POST',
                //contentType:'application/json',
                url: rootURL + '/Tweet/add',
                dataType: "json",  // Le type de données à recevoir de service, ici, du json.
                data:data, //FormaddtweetToJSON(),
                success : function(code_html, statut){
                    alert("tweet ajouté");
                },
                error : function(resultat, statut, erreur){
                    alert("tweet non ajouté");
                    alert("status"+resultat.status); //affiche le code d erreur
                    
                }
            });
}


// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
    alert('ici' +   $('#username').val()+ $('#password').val() + $('#sexe').val()+$('#email').val());
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

