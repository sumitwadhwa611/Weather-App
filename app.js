const { response, json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");


const https =require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){

 res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req , res){

    const query = req.body.cityName;
const apiKey = "0cace20f94989e722227f53ab3c3a961";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?units=" + units + "&appid=" + apiKey + "&q=" + query; 


https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){ //to get hold of the data
    const weatherData = JSON.parse(data);  //stringify for the other way around 
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const weatherDescription = weatherData.weather[0].description;
   const imageURL = "http://openweeathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<h1>The temp in " + query + " is " + temp + " degrees celcius<//h1>");
    res.write("<h3>The weather is currently " + weatherDescription + "<h3>");
    res.write("<img src =" + imageURL + ">");

    res.send();
  });
}); 


}) 





app.listen(3000, function(){
    console.log("server is running on port 3000");
});