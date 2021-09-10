var mongoose=require('mongoose')
var Schema=mongoose.Schema

var articlschema= new Schema({
    title:{type:String, required:true},
    description:{type:String},
    tags:[{type:String}],
    author:{type:String},
    likes:{Type:Number, default:0}
},{timestamps:true})

var Article=mongoose.model('User',articlschema);
module.exports=Article