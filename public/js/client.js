// JavaScript Document

//url adresen till webbtjänsten
var URL = "https://limitless-inlet-21021.herokuapp.com/quotes";

var jsonData;

// DOM onload
document.addEventListener("DOMContentLoaded", function(){ // Wait for DOM tree to get parsed
 // Show all courses in table - GET

//nytt ajaxanrop 
   var xmlhttp = new XMLHttpRequest();

	//en funktion som ska utföras när förfrågan GET får ett svar.
xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
			  
                  //hämtar jsonarray fr servern och gör om till js genom parse()
               jsonData = JSON.parse( xmlhttp.responseText );
                for(var i=0; i <jsonData.length; i++){

					var list = document.getElementById("row");
					
                   list.innerHTML +=  "<div class='col-sm-3'> <p class='font-italic'>" + jsonData[i].Quote + "</p><p class='blockquote-footer'>" + jsonData[i].Name+ ", " + jsonData[i].Proffession + "</p><p class='authormessage'>" + jsonData[i].Genre + "</p><p><button type='button' class='btn btn-secondary btn-sm' id='" + jsonData[i]._id + "'>Radera</button></div>" ;
					
			
					
					
					
					
				}
		   }
           else if (xmlhttp.status == 400) {
              alert('error 400');
           }
           else {
               alert('error 200');
           }
        }
};
	
	
xmlhttp.open("GET", URL, true); 
    xmlhttp.send();
   

	
	
	
  // Click on register - POST
   document.getElementById("add").addEventListener("click", function(ev){
        var Name = document.getElementById("Name").value;
        var Proffession = document.getElementById("Proffession").value;
        var Genre = document.getElementById("Genre").value;
		var Quote = document.getElementById("Quote").value; 
		
        if (Name != '' || Proffession != '' || Genre != '' || Quote != '') {   
		   
		location.reload(); 
	} else {  
		  
		   //om man inte skrivit in ngt, om det inte är '' en sträng.  ladda bara om sidan
		var json =  {"Name": Name, "Proffession": Proffession, "Genre": Genre, "Quote": Quote};  // skapa json obj med infon
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "https://limitless-inlet-21021.herokuapp.com/quotes/add", true); // AJAX ANROP MED metoden post
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send( JSON.stringify(json));// skickar json till servern via ajax som gör om den till en assoc

        xmlhttp.onload = function() {
			location.reload();
       };
		
	}
		
		
  });

	

	
	 // ta bort kurs  - DELETE
   document.getElementById("row").addEventListener("click", function(ev){ 
		
        var http = new XMLHttpRequest(); //genom xmlhttprequest kan ja göra AJAX anrop som behövs för att komma åt webbtjänsterna via JS.
        http.open("DELETE", "https://limitless-inlet-21021.herokuapp.com/quotes" +ev.target.id, true); 
	
	   
	   
        http.send(); //ajax anrop med metoden send
		
        http.onload = function() { //väntar på att funktionen ska avsluta
         location.reload(); //sedn ladda om sidan med ny version
        };
		
        
    });
	
	
	

	
	  // Click on update  button - PUT
  /* document.getElementById("update").addEventListener("click", function(ev){
	 
	   
        var Name = document.getElementById("Name").value;
        var Proffession = document.getElementById("Proffession").value;
        var Genre = document.getElementById("Genre").value;
		var Quote = document.getElementById("Quote").value; 
	   
	   if (Name != '' || Proffession != '' || Genre != '' || Quote != '') {   
		   location.reload(); 
	   } else {  
				 
		 var json =  {"Name": Name, "Proffession": Proffession, "Genre": Genre, "Quote": Quote}; 
		 var xmlhttp = new XMLHttpRequest();
		 xmlhttp.open("PUT", "http://localhost:3001/quotes/"+ "/" +Name, true);
		 xmlhttp.setRequestHeader('Content-Type', 'application/json');
		 xmlhttp.send( JSON.stringify(json) );
		 xmlhttp.onload = function() {
		var jsonData = JSON.parse( this.responseText );
			 
			for(var i=0; i < jsonData.length; i++){
				 var list = document.getElementById("row");
					list.innerHTML +=  "<div class='col-sm-3'> <p class='font-italic'>" + jsonData[i].Quote + "</p><p class='blockquote-footer'>" + jsonData[i].Name+ ", " + jsonData[i].Proffession + "</p><p class='authormessage'>" + jsonData[i].Genre + "</p></div>" ;
					 }
					 location.reload();
				 }; 
			 }
   });	*/
  }); 

