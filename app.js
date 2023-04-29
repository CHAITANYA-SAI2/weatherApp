const express=require("express");
const app=express();
const https=require("https");
const bodyparser=require('body-parser')
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.render('index',{temp:"",city:""});
});
app.use(express.static('public'));
app.post("/",function(req,res){
    
    const url="https://api.openweathermap.org/data/2.5/weather?q="+req.body.location+"&units=metric&appid=02764d6fb0c70b333b2594282ca42da5";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
           
            var result=JSON.parse(data); 
            res.render('index',{temp:result.main.temp,city:req.body.location});
           
        });
    });
});
app.listen(3000,function(){
    console.log("hey!");
});