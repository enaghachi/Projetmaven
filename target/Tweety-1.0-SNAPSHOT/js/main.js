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
                        alert('Wine created successfully');
                },
                error: function(jqXHR, textStatus, errorThrown){
                        alert('addWine error: ' + textStatus);
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
 

