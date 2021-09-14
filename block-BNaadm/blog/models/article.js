var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var articleShema= new Schema({
    title:{type:String,required:true},
description:{type:String},
tags: [{type:String}] ,
 author :{type:String},
 comments:{type:Schema.Types.ObjectId, ref:"Comment"},

likes:{type:Number,default:0}
},{timestamps:true})

var Article=mongoose.model('Article',articleShema)

module.exports=Article