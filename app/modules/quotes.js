// JavaScript Document
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var quotesSchema = new Schema({  
	
	Name: String,
	Proffession: String,
	Genre: String,
	Quote: String 
	

});

//NÄR NGN PÅ ANDRA SIDAN INKLUDERAR DENNA FIL SÅ KMR ETT OBJ SOM HETER myCV som innehåller schemat
module.exports = mongoose.model("quotes", quotesSchema);