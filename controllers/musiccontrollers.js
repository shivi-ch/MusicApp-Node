var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var JSAlert = require("js-alert");

mongoose.connect('mongodb://test:test@ds231199.mlab.com:31199/pic');

var pics = new mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    addres: String
});

var userdb = new mongoose.Schema({
    fname:String,
    lname:String,
    uname:{type:String,index:true,unique:true},
    passwd:String,
    conumber:Number,
    sex:String   
});

var cartdb = new mongoose.Schema({
    usernamec:String,
    category: String,
    name: String,
    price: Number,
    addres: String
});



    var cart = mongoose.model('cart',cartdb);
   var picc =mongoose.model('picc',pics);
   var user=mongoose.model('user',userdb);


module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/',function(req,resp){

        resp.render('login',{msg:''});
    });

    app.post('/store/login',function(req,resp) {
        user.find({uname:req.body.username},function(err,data){
            if(err) {throw err} else if(data[0] == null){
                var newuser = user({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    uname: req.body.username,
                    passwd: req.body.password,
                    conumber: req.body.cnumber,
                    sex: req.body.sex
                }).save(function (err, data) {

                    resp.render('login', { msg: '' });
                });
            }else{
                resp.render('signup',{msg:'username already exist'})
            } 
        })
       
    });

    app.post('/store',function(req,resp) {
        
        user.find({uname:req.body.luname},function(err,data){
            if (err) {throw err}else if(data[0] != null){
                if (data[0].uname == req.body.luname && data[0].passwd == req.body.lpassword) {
                    var loguname=data[0].uname;
                    picc.find({}, function (err, data) {
                        if (err) throw err;
                        // console.log(data);
                        resp.render('store', { pisc: data, name:loguname});
                    });
                } else {

                    // resp.redirect("/store/login");
                    resp.render('login', { msg: 'wrong user name or password' });
                };
            }else{
                resp.render('login', { msg: 'wrong user name or password' });                
            }
       
        });
        });
        
    

    app.get('/store/contact',function(req,resp){
         resp.render('contact');
     })

    app.get('/store/signup', function (req, resp) {

        resp.render('signup', { msg: '' });

    });

    app.post('/store/:id/:namet',function(req,resp) {
        picc.find({ _id: req.params.id}, function (err, data) {
            if (err) throw err;
            var cartitem = cart({
                usernamec:req.params.namet,
                category: data[0].category ,
                name: data[0].name ,
                price: data[0].price,
                addres: data[0].addres
            }).save(function (err, data) {
            
               
            });
           });
        });
           
    
            app.post('/store/cart/item/:namec', function (req, resp) {  
                 console.log(req.params.namec);
                 
              cart.find({usernamec: req.params.namec},function(err,data){
                  if(err){ throw err}else{
                      resp.render('store-view2', { carti: data, nama: req.params.namec});    
                 console.log('done');
                  }
            });
           
        });
    
   
    app.delete('/store/cart/item/user/:id/:namet', function (req, resp) {
          console.log(req.params.namet);
        console.log(req.params.id);        
        cart.find({ _id: req.params.id }).remove(function(err,data){
            cart.find({ usernamec: req.params.namet }, function (err, data) {
                if (err) { throw err } else {
                    resp.render('store-view2', { carti: data, nama:req.params.namet});
                    console.log('done');
                }
            });
        });
});

    app.get('/store/:name', function (req, resp) {

        user.find({ uname: req.params.name }, function (err, data) {
            if (err) { throw err } else if (data[0] != null) {
                
                    var loguname = data[0].uname;
                    picc.find({}, function (err, data) {
                        if (err) throw err;
    
                        resp.render('store', { pisc: data, name: loguname });
                    });
                
                }
        });
    });


    
};

