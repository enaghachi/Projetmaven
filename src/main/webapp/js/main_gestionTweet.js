/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// The root URL for the RESTful services
var rootURL = "http://localhost:9000/Tweety/resources";

//inscription d’un user 
function bindEventsOnReady() {

                        bindLogoutEvent();    
                        bindaddTweetEvent();
                        bindListTweetEvent();
                        binddeleteTweetEvent();
                       // bindPassPageAmisEvent(username);
}
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

//------------------------------------Les amies-------------------------------------
//mes abonnement
function bindPassPageAmisEvent(username){
     console.log("bindPassPageAmisEvent:"+username);
    $('#mes_amis').click(function(){
       alert("mes_amis");
       pageAmis(username);
       return false;
    });
}
//function pageGetAmis(){
//    var username = $('#usernamePageAmis').val();
//    pageAmis(username)
//}
function pageAmis(username){
    console.log('pageAmis');
    $.ajax({
        type:'GET',
        url: rootURL +'/user/pageAmis/'+username,
        dataType: "json",
        success :  function(d, textStatus, jqXHR){
            alert(ok);
        },
        error : function(resultat, statut, erreur){
             alert("not ok");
             alert("status"+resultat.status); //affiche le code d erreur
         }
    });
}
//-------------------------------------Tweet------------------------------------------
//deconnection
function bindaddTweetEvent() {
$('#publier_button').click(function(){
    //alert("idididididiididididididi");
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
                    alert("tweet ajouté_add tweet");
                    // On ajoute le Tweet dans la page
                    alert("avantprepend_add tweet");
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
        //alert("attendtion");
       // alert ("data "+data.toString());
        if(data != null) {
           // alert("avantdataeach");
             $.each(data,function(key, val){
                 alert("apresdataeach111111111");
                i++;
                $("#List_Tweet").prepend(renderItem(val.id, val.label, val.sujet, val.datepublication, val.Taguser, val.user.username));
            });
            if(i==0){
                showWelcome();
            }
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
                $("<div id='loadmore'><a href='#' id='load' >J'en veux plus !</a></div>").insertAfter("#main_contant");
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
function showWelcome(){
        $("#List_Tweet").html('<div class="box_2"><img src="bootstrap/img/box_2.png" alt=""  class="main_img_2" />'+
                                                 '<div class="text">'+
                                                  ' <h6>'+userpropr+'</h6>'+
                                                   '<h5>'+strDate+'</h5>'+
                                                   '<p>'+label+' #'+sujet+' @'+Taguser+'</p>'+
                                                 '</div></div>');
    } 
//suppression du lien loadMore   
function removeLoadMore()
    {
        $.get("http://localhost:9000/Tweety/resources/Tweet/count",function(data){
            var i = $("#List_Tweet").children().length && i<5;
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
        return '<div class="box_2"><img src="bootstrap/img/box_2.png" alt=""  class="main_img_2" />'+
                                                 '<div class="text">'+
                                                  ' <h6>'+userpropr+'</h6>'+
                                                   '<h5>'+strDate+'</h5>'+
                                                   '<p>'+label+' #'+sujet+' @'+Taguser+'</p>'+
                                                 '</div></div>';      
                                          

                        //<a class='button blue delete' href='http://localhost:9000/Tweety/resources/Tweet"+id+"'>Supprimer</a>\n\
    }
    
     
$().ready(function(){
 bindEventsOnReady();
});


