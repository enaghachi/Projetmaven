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
         url: rootURL +'/user/logout',
         dataType: "json",
         success: function(data){
                    alert ("vous etes deconnecté");
                    window.location.href="index.html";
                    $('#resultat').html('</br><h4> vous étes déconnecté(e) </h4>');
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
                url: rootURL+ '/user' + '/' + username+'/'+password,
                dataType: "json", // Le type de données à recevoir du service, ici, du json.
                success: function(data){
                    alert(data.toString());
                        alert('user connected successfully');
                        $('#content').html('<h2> Bienvenue '+username+' dans votre espace personnel<h2> <button id="Logout" > Logout </button>\n\
                                            <div id="writeTweet">\
                                                <h4> Ecrire un Tweet </h4>\n\\n\
                                                <form id="form-addTweet" method="post">\
                                                <textarea cols="50" rows="5" placeholder="Ecrire un nouveau Tweet" id="areaTweet" name="areaTweet"></textarea>\
                                                <input type="hidden" id="usernameonline" name="usernameonline" value='+username+'>\n\
                                                <button id="publier"> publier </button>\n\\n\
                                                </form>\
                                            </di>\
                                            <div id="List_Tweet">\n\
                                            </div>');

                        bindLogoutEvent();    
                        bindaddTweetEvent();
                        bindListTweetEvent();
                        binddeleteTweetEvent();
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
                type: 'POST',  // Le type de la requête HTTP, ici devenu POST
                contentType: 'application/json',
                url: rootURL+'/user/add',
                dataType: "json",  // Le type de données à recevoir, ici, du json.
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
                //dataType: "json",  // Le type de données à recevoir de service, ici, du json.
                data:data, //FormaddtweetToJSON(),
                success : function(d, textStatus, jqXHR){
                    alert("tweet ajouté");
                    // On ajoute le Tweet dans la page
                    alert("avantprepend");
                    $.get(d,function(data){
                        alert("apresprepend");
                        $("#List_Tweet").prepend(renderItem(data.id, data.label, data.sujet, data.datepublication,data.Taguser,data.user));  
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
             $(data).each(function(){
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

