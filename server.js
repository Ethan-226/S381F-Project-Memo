const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongourl = 'mongodb+srv://admin:admin@memos.2tgoxll.mongodb.net/?retryWrites=true&w=majority'; 
const dbName = 'test';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('cookie-session');
const SECRETKEY = 'cs381';

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

var usersinfo = new Array(
    {name: "user1", password: "cs381"},
    {name: "user2", password: "cs381"},
    {name: "user3", password: "cs381"}
);

// Home page
app.get('/', function(req, res){
  res.redirect("/home");
});

// Login page
app.get('/login', function(req, res){
	res.sendFile(__dirname + '/public/login.html');
	res.render('login');
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
        return res.redirect("/");
});

// Logout
app.get('/logout', function(req, res){
	req.session = null;
    req.authenticated = false;
	res.redirect('/home');
});

// Signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle user registration logic
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    // Create user logic here
    res.redirect('/login');
  } else {
    res.render('signup', { error: 'Username and password are required' });
  }
});

// Memo CRUD Functionality

// Memo List
app.get('/memo', (req, res) => {
  const memos = db.collection('memos').find().toArray();

  res.render('memoList', { memos });
});

// Memo Creation

// Create memo form
app.get('/memo/create', (req, res) => {
  res.render('create');
});

// Handle memo creation logic
app.post('/memo/create', (req, res) => {
  const { title, content } = req.body;

  if (title && content) {
    // Create memo logic here
    res.redirect('/memo');
  } else {
    res.render('create', { error: 'Title and content are required' });
  }
});

// Memo Details

// View memo
app.get('/memo/:id', (req, res) => {
  const memoId = req.params.id;

  const memo = db.collection('memos').findOne({ _id: ObjectId(memoId) });

  res.render('view', { memo });
});

// Memo Editing

// Edit memo form
app.get('/memo/:id/edit', (req, res) => {
  const memoId = req.params.id;

  const memo = db.collection('memos').findOne({ _id: ObjectId(memoId) });

  res.render('edit', { memo });
});

// Handle memo update logic
app.post('/memo/:id/edit', (req, res) => {
  const memoId = req.params.id;
  const { title, content } = req.body;

  if (title && content) {
    // Update memo logic here
    res.redirect(`/memo/${memoId}`);
  } else {
    res.render('edit', { error: 'Title and content are required' });
  }
});

// Memo Deletion

// Handle memo deletion logic
app.post('/memo/:id/delete', (req, res) => {
  const memoId = req.params.id;

  // Delete memo logic here

  res.redirect('/memo');
});

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connect();
});