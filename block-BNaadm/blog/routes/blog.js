var express = require('express');
var router = express.Router();
var Article=require('../models/article')
var Comment=require('../models/comment')

/* GET users listing. */
router.get('/', function(req, res, next) {
  Article.find({},(err,articles,next)=>{
    if(err) return next(err)
    
    res.render('articles',{articles});
  })
  
});

router.get('/new',(req,res)=>{
  res.render('articleForm')
})

router.post('/',(req,res)=>{
  //capture date 
  console.log(req.body)
  //save it to data base
  Article.create(req.body,(err, articleUpdated)=>{
      console.log(err,articleUpdated)
      res.redirect('/blog')
  })
  
})
router.get('/:id',(req,res)=>{
  var id=req.params.id;
  Article.findById(id,(err,article)=>{
    if(err) return next(err)
    Comment.find({articleId:id},(err,comments)=>{
      if(err) return next(err)
      res.render('articleDetails',{article,comments})})
    
  })
})

router.get('/:id/edit',(req,res,next)=>{
  var id=req.params.id;
  Article.findById(id,(err,article)=>{
    if(err) return(err)
    res.render('editForm',{article})
  })
})

router.post('/:id',(req,res,next)=>{
  var id=req.params.id;
  Article.findByIdAndUpdate(id,req.body,(err,articleUpdated)=>{
      if(err) return next(err)
      res.redirect('/blog/' + id)
  })
})
router.get('/:id/delete',(req,res)=>{
  var id=req.params.id;
  Article.findByIdAndDelete(id,req.body,(err,deletedArticle)=>{
    if(err) return next(err)
    Comment.findByIdAndDelete({articleId:id},(err,deletedComment)=>{
      if(err) return next(err)
      res.redirect('/blog')
    })
    
  })
})
router.get('/:id/like',(req,res,next)=>{
  var id=req.params.id;
  Article.findByIdAndUpdate(id,{$inc:{likes:1}},(err,updatedArticle)=>{
    if(err) return next(err)
    res.redirect('/blog')
  })
})

router.post('/:id/comments',(req,res,next)=>{
  var id=req.params.id;
  req.body.articleId=id;
  Comment.create(req.body,(err,comment)=>{
    if(err) return next(err)
    Article.findByIdAndUpdate(id,{$push:{comments:comment._id}},(err,updatedBook)=>{
      if(err) return next(err)
      res.redirect('/blog/'+id)
    })
  })
})

module.exports = router;
