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
   alert("ici");
    logout();
    return false;
 });
}

//fonction de deconnection
function logout(){
    console.log('deconnection');
    $.ajax({
         type: 'GET',
         url: rootURL +'/user/logout',
         dataType: "json",
         success: function(data){
                    alert ("vous etes deconnecté");
                    window.location.href="index.html";
                  
                },
         error: function(jqXHR, textStatus, errorThrown){
             alert ("problème de deconnection:"+errorThrown);
         }
    });
}

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
                        $('#search').html('<form name="recherche">'+
                                                                    '<input type="text" name="champ" placeholder="Recherche">'+           	
                                                                    '<input type="button" id="chercher" onClick="controle(recherche)">'+
                                                      '</form> ');
                                              
                         $('#login_div').html('<button class="logout" id="Logout"></button>');                                  
                         $('#logo_nav').html( '<!--Top Header End Here-->'+
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

                        $('#center_frame').html('<div class="section_left">'+
                                                '<h5>Nouveau Tweet</h5>'+
                                              '</div>'+
                                              '<div class="section_middle">'+
                                                '<table>'+
                                                '<form method="post" id="form-addTweet">'+
                                                    '<tr>'+
                                                            '<td colspan="2" align="center">'+
                                                            '<textarea cols="50" rows="8" id="areaTweet" name="contenu" placeholder="écrire un nouveau Tweet"></textarea>'+
                                                            '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                            '<td><input type="hidden" name="username" id="usernameonline" value="'+username+'"> </td>'+
                                                            '<td align="right" ><button class="button gray medium" value="publier" id="publier_button">Publier</button></td>'+
                                                    '</tr>'+	
                                                '</form>'+
                                                '</table>'+

                                              '</div>');
                        $('#main_contant').html( '<div class="center_frame">'+
                                     '<h2>Les tweets</h2>'+
                                           '<div class="box_2" id="List_Tweet"> <img src="bootstrap/img/box_2.png" alt=""  class="main_img_2" />'+
                                                 '<div class="text">'+
                                                  ' <h6>@tweet.user.username</h6>'+
                                                   '<h5>@tweet.creationDate</h5>'+
                                                   '<p>contenu de tweet</p>'+
                                                 '</div>'+       
                                           '</div> '+                                                                        
                                    ' </div>');                                                    
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
                url: rootURL+'/user/add',
                dataType: "json",
                data: formToJSON(),
                success: function(data, textStatus, jqXHR){
                        alert('user created successfully');
                        $("#inscription")[0].reset(); // vider les champs du formulaire 
                       window.location.href="tweety.html";
                },
                error: function(jqXHR, textStatus, errorThrown){
                        alert('addUser error: ' + textStatus);
                }
        });      
}
//-------------------------------------Tweet------------------------------------------
//deconnection
function bindaddTweetEvent() {
$('#publier_button').click(function(){
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
                //dataType: "json",  // Le type de données à recevoir de service, ici, du json.
                data:data, //FormaddtweetToJSON(),
                success : function(d, textStatus, jqXHR){
                    alert("tweet ajouté");
                    // On ajoute le Tweet dans la page
                    alert("avantprepend");
                    $.get(d,function(data){
                        alert("apresprepend");
                        $("#List_Tweet").prepend(renderItem(data.id, data.label, data.sujet, data.datepublication,data.Taguser,data.user.username));  
                    });
                },
                error : function(resultat, statut, erreur){
                    alert("tweet non ajouté");
                    alert("status"+resultat.status); //affiche le code d erreur
                    
                    
                }
            });
}
//affichage liste de Tweet d'un user
function bindListTweetEvent(){
    $.get(rootURL+"/Tweet/0/5",function(data){
        var i = 0;
        alert ("data "+data);
        if(data != null) {
            alert("avantdataeach");
             $(data.valueOf()).each(function(){
                 alert("apresdataeach");
                i++
                $("#List_Tweet").prepend(renderItem(this.id, this.label, this.sujet, this.datepublication, this.Taguser, this.user));
            });
            if(i==0)
                showWelcome();
                $("#loadmore").remove();
            // Si on est venu ici après une suppression on supprime le lien
            // "load more"
            if(removeLoadMore()){
                $("#loadmore").remove();
                console.log("DELETE");
            }else
            {
                // Si on vient ici après la publication d'un nouveau Tweet on
                // fait apparitre le bouton "load more"
                console.log("INSERT");
                $("<div id='loadmore'><a href='#' id='load' >J'en veux plus !</a></div>").insertAfter("#List_Tweet");
            }
        }
       
    },"json");
        }
function binddeleteTweetEvent() {
   // Clic sur le bouton delete pour supprimer un Tweet
    $(".delete").live("click",function(){

        var id = $(this).attr("href");
        console.log(id);

        $.ajax(id,
        {
            type:"DELETE",
            success: function(d){
                $("#Tweet-"+d).slideUp('slow',function(){
                    $(this).remove();
                    });
            }
        });
        
        if(removeLoadMore()){
            $("#loadmore").remove();
        }
        
        return false;

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
function showWelcome(){
        $("#List_Tweet").html("<div id='welcome'>Aucun Tweet n'est présent.</div>");
    } 
//suppression du lien loadMore   
function removeLoadMore()
    {
        $.get("http://localhost:9000/Tweety/resources/Tweet/count",function(data){
            var i = $("#List_Tweet").children().length;
            console.log("dans la bd : "+data+" | sur le site : "+i);
            if(data == i){
                return true;
            }else
                return false;
        });
    }
 // creation et ajout d'un article dans la page
 function renderItem(id, label, sujet, date, Taguser,userpropr)
    {
        var myDate = new Date( date );
        var strDate = "";
        strDate += myDate.getUTCDate()+"/"+myDate.getMonth()+"/"+myDate.getFullYear();
        strDate += " à "+myDate.getHours()+":"+myDate.getMinutes();
        return "<div class='Tweet' id='Tweet-"+id+"'>\
                <h2>"+label+"</h2>\
                <p class='sujet'>"+sujet+"</p>\\n\
                <p class='Taguser'>"+Taguser+"</p>\\n\
                <p class='userpropr'>"+userpropr+"</p>\\n\
                <div class='postmeta'>\n\
                    <p class='alignleft'>Article publi&eacute; le "+strDate+"</p>\n\
                    <p class='alignright'>\n\
                        <a class='button blue delete' href='http://localhost:9000/Tweety/resources/Tweet"+id+"'>Supprimer</a>\n\
                    </p>\n\
                </div>\n\
                    <div class='clearfix'></div>\
                </div>";
    }
 
$().ready(function(){
 bindEventsOnReady();
});

