const assert = require('assert');

const { MongoClient, ObjectId } = require('mongodb');

const mongourl = 'mongodb+srv://admin:admin@memos.2tgoxll.mongodb.net/?retryWrites=true&w=majority'; 
const dbName = 'test';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8099;
const session = require('cookie-session');
const SECRETKEY = '45621';

var usersinfo = new Array(
    {name: "user1", password: "cs381"},
    {name: "user2", password: "cs381"},
    {name: "user3", password: "cs381"}
);

var documents = {};
//Main Body
app.set('view engine', 'ejs');
app.use(session({
    userid: "session",  
    keys: [SECRETKEY],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Home page
app.get('/', function(req, res){
  res.redirect("/home");
});

app.get('/home', function(req, res){
	res.sendFile(__dirname + '/public/home.html');
	res.render('home');
});


// Login page
app.get('/login', function(req, res){
	res.sendFile(__dirname + '/public/login.html');
	res.render('/login');
});

// Handle login logic
app.post('/login', function(req, res){
  for (var i=0; i<usersinfo.length; i++){
        if (usersinfo[i].name == req.body.username && usersinfo[i].password == req.body.password) {
        req.session.authenticated = true;
        req.session.userid = usersinfo[i].name;
        console.log(req.session.userid);
        return res.status(200).redirect("/home");
        }
    }
        console.log("Error username or password.");
        return res.redirect("/login");
});

//Handle signup logic


// Logout
app.get('/logout', function(req, res){
	req.session = null;
    req.authenticated = false;
	res.redirect('/home');
});



// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connect();
});