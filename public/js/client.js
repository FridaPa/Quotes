// JavaScript Document

//url adresen till webbtjänsten
var URL = "http://localhost:3001/quotes";

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
					
				
					/*var button = document.createElement("BUTTON");
					button.innerHTML = "updatera";
					inlaggworkout.appendChild(button);
					button.setAttribute("id", "update");
					update.addEventListener("click", function(){
						
						var div = document.createElement("DIV");
						document.body.appendChild(div);
						//div.setAttribute("class", "hiddendiv");
						div.innerHTML = " <form method='post' action=''>" +
							"<label for='Name'>Namn</label> <br> " +
							"<input type='text'  id='Name' name='Name'><br>" +
							"<input type='submit' id='Updatera" + "name='update' value='updatera'></form>" ;
					});*/
					
					
					
					
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
        xmlhttp.open("POST", "http://localhost:3001/quotes/add", true); // AJAX ANROP MED metoden post
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
        http.open("DELETE", "http://localhost:3001/quotes/" +ev.target.id, true); 
	
	   
	   
        http.send(); //ajax anrop med metoden send
		
        http.onload = function() { //väntar på att funktionen ska avsluta
         location.reload(); //sedn ladda om sidan med ny version
        };
		
        
    });
	
	
	
	
	

	
	
	
	
	
	  // Click on update  button - PUT
   /*document.getElementById("updatera").addEventListener("click", function(ev){
	 
	   
        let id = document.getElementById("idno").value;
        let brand = document.getElementById("brando").value;
        let model = document.getElementById("modelo").value;
        let year = document.getElementById("yearo").value;
	   
        if( !(id != '' && brand != '' && model != '' && year != '') ) location.reload();

        let json =  {"car": brand, "model": model, "year": year};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", URL+"/"+id, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send( JSON.stringify(json) );

        xmlhttp.onload = function() {
       var jsonData = JSON.parse( this.responseText );
     for(var i=0; i < jsonData.length; i++){
		 document.getElementById("carlist").innerHTML += "<td>"+jsonData[i].ID+"</td><td>"+jsonData[i].Car+"</td><td>" + jsonData[i].Model + "</td><td>" + jsonData[i].Year + "</td>";    
     }
            location.reload();
        }  
  })*/
	
	
	
	
	
	
	
	
	
}); 

