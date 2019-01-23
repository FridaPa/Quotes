// lägger till bibliotek
const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");


//anslut till db
mongoose.connect("mongodb://FridaPa:frida1991@ds163164.mlab.com:63164/quotes",  { useNewUrlParser: true });


//mongodb://localhost:27017/myCV

//inkluderar schemat
var quotes = require("./app/modules/quotes.js");




//skapa instans av express i en variabel
var app = express();



app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});







//lägger till bodyparser som gör att extress kan läsa av forms
app.use(bodyParser.json());
//urlencoded låter oss få daat genom form
app.use(bodyParser.urlencoded({ extended: false }));

//fixar statisk sökväg till statiska sidor i public-mappen
app.use(express.static(path.join(__dirname, 'public')));





//hämta
app.get("/quotes", function(reg, res){
		
		quotes.find(function(err, quotes) {
	        if(err) {
				res.send(err);
			}
	
	        res.json(quotes);
});
 });




//lägger till kurs
app.post("/quotes/add", function(req, res){
	console.log(req.body); //skriver ut i konsollen fr the form
	//ny instans - funkar ej- byt til myCV
	console.log(req.body.make);
	var quote = new quotes();
	
	//skapa nytt obj
	quote.Name = req.body.Name;
	quote.Proffession = req.body.Proffession;
	quote.Genre =  req.body.Genre;
	quote.Quote = req.body.Quote;
	
	
	//spara kurs i databasen och visa felmmedd om de finns
   quote.save(function(err){
		if(err){
			
			console.log(err);
		}
		
	});
	

	//res.send({message: "lägger till kurs"});
	//så vi kmr till startsidan igen
	res.redirect("/");
});


	
//hämta enskild kurs med hjälp av ett id
app.get("/quotes/:id", (req, res, next) => {
	
	//hämtar de värdet med rätt id
quote.findById(req.params.id)
	.then(doc => {
	if (!doc) { return res.status(404).end(); }
	return res.status(200).json(doc);

})
.catch(err => next(err));	
	
});



app.put("/quotes/:id", (req, res) => {
let id = req.params.id;
	
	data = {
		Name: req.body.Name,
		Proffession: req.body.Proffession,
		Genre: req.body.Genre,
		Quote: req.body.Quote
	};
	
	quotes.findByIdAndUpdate(id, data, function(err, quote){
		if(err)throw err;
		res.send('Updaterad Quote - '+quote.Guote);
	});
	
});


//ta bort ett visst id
app.delete("/quotes/:id", function(req, res){
	 console.log("hej");
	quotes.findByIdAndRemove(req.params.id)
	.exec()
	
	//.then görs när kod ovan är klar
	.then(doc => {
		if (!doc) { return res.status(404).end();}
		return res.status(204).end();	
	})
	 
.catch(err => next(err));

	});
	
	
	
	
	




//port för anslutning
var port = process.env.PORT || 3001; 

//starta servern med kollmedd
app.listen(port, function() {
	console.log("servern är startad på port" + port);
});


//mer egenskaper för webbtjänst

