var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var commentShema= new Schema({
    content:{type:String},
    articleId:{type:Schema.Types.ObjectId,ref:"Artical"},
    likes:{type:Number,default:0},
  


},{timestamps:true})

var Comment=mongoose.model('Comment',commentShema)

module.exports=Comment