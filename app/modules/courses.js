
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new Schema({  
	
	coursecode: String,
	courseName: String,
	coursePlan: String,
	Progression: String, // chAR???
	Termin: String

});

//NÄR NGN PÅ ANDRA SIDAN INKLUDERAR DENNA FIL SÅ KMR ETT OBJ SOM HETER myCV som innehåller schemat
module.exports = mongoose.model("courses", courseSchema);