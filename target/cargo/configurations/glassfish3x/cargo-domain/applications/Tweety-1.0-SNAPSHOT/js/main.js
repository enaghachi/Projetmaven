// The root URL for the RESTful services
var rootURL = "http://localhost:9000/Tweety/resources/user";

$('#submit').click(function() {
        alert("toto");
        adduser();
        return false;
});

$('#login').click(function(){
    alert("tata");
    if ($('#usernameconnct').val() != '' && $('#passwordconnect').val() != ''){
        alert($('#usernameconnct').val());
        alert($('#passwordconnect').val());
        
        login($('#usernameconnct').val(),$('#passwordconnect').val());
    }  
        return false;
});

function login(username,password){
        console.log('username'+username);
        alert('username'+username);
        $.ajax({
                type: 'GET',
                url: rootURL + '/' + username+'/'+password,
                dataType: "json",
                success: function(data){
                    if(data==null){
                         $("#resultat").append('</br><h4>oups! username ou mot de passe incorrecte! Essaye encore une fois </h4> </br>')
                    }else{
                        alert('user connected successfully');
                    }
                },
        });      
        
}

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
                        
                        $("#resultat").append('</br> Vous etes bien inscris,<h4> Entrez votre adresse email et votre mot de passe pour se connecter </h4> </br>')
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
 

