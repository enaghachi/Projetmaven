// The root URL for the RESTful services
var rootURL = "http://localhost:9000/Tweety/resources/user";

$('#submit').click(function() {
        alert("toto");
        adduser();
        return false;
});

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
                        
                        $("#resultat").append('vous êtes bien inscris,<h3> Entrez votre adresse email et mot de passe pour se connecter </h3> </br>'+
                        '<p> email : <input type="email" name="email"  id="email"/></p>'+
                        '<p> password : <input type="password" name="password" id="password"/></p>'+
                        '<button id="Login"> Login </button>')
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
 

