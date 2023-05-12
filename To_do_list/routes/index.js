var express = require('express');
var router = express.Router();
var mongoose = require ('mongoose')

const url = "mongodb+srv://vth2802:mongo12321@cluster0.shz8b2f.mongodb.net/Product3?retryWrites=true&w=majority";

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connect MongoDb Successfully ..........")
}).catch((err) => {
    throw err;
})

let ListSchema = mongoose.Schema({
  Product: { type: String},
  Number: {type: Number},
  Price: {type: Number}
})

let List = mongoose.model('Hanghoa',ListSchema)

/* GET home page. */
router.get('/', function(req, res, next) {
  List.find({},(error, data) => {
    console.log("Danh sach hang hoa", data);
    res.render('index.ejs', {list: data})
  })
});

router.get('/form-add', function(req,res,next){
  res.render('form-add',{})
})

router.post('/add', function(req, res, next){
  List.create(req.body);
  res.redirect('/')
})

router.get('/form-update/:id', function(req,res,next){
  List.findById(req.params.id, (err,data)=>{
    res.render('form-update', {update:data})
  })
})

router.post('/update', function(req, res, next){
  List.findByIdAndUpdate(req.body.id, req.body, (error, data) => {
    res.redirect('/')
  });
})

router.get('/form-delete/:id', function(req,res,next){
  List.findByIdAndDelete(req.params.id, (err,data)=>{
    res.redirect('/')
  })
})
module.exports = router;
