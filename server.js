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

const createUser = function(db, createddocuments, callback){
    const client = new MongoClient(mongourl);
    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to the MongoDB database server.");
        const db = client.db(dbName);

        db.collection('restaurants').insertOne(createddocuments, function(error, results){
            if(error){
            	throw error
            };
            console.log(results);
            return callback();
        });
    });
}
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
	res.render('login');
});

// Handle login logic
app.post('/login', function(req, res){
  for (var i=0; i<usersinfo.length; i++){
        if (usersinfo[i].name == req.body.username && usersinfo[i].password == req.body.password) {
        req.session.authenticated = true;
        req.session.userid = usersinfo[i].name;
        console.log(req.session.userid);
        return res.status(200).redirect("/memoList");
        }
    }
        console.log("Error username or password.");
        return res.redirect("/login");
});

//Handle signup logic
app.get('/home', function(req, res){
	res.sendFile(__dirname + '/public/home.html');
	res.render('home');
});

//signup
app.post('/signup', function(req,res){
	const client = new MongoClient(mongourl);
    client.connect(function(err){
        assert.equal(null, err);
        console.log("Connected successfully to the DB server.");
        const db = client.db(dbName);
		
	documents["_id"] = ObjectID;
	documents["name"] = req.body.username;
	documents["password"] = req.body.password;
	
	var addressdoc ={};
        addressdoc['borough'] = req.body.borough;
    if(req.body.street){
        addressdoc['street'] = req.body.street;
    }
	
	if(documents.restaurantID){
            console.log("...Creating the document");
            createDocument(db, documents, function(docs){
                client.close();
                console.log("Closed DB connection");
                return res.status(200).render('info', {message: "Document is created successfully!"});
            });
        } else{
            client.close();
            console.log("Closed DB connection");
            return res.status(200).render('info', {message: "Invalid entry - Restaurant ID is compulsory!"});
        }
    });
		
	
	});

//Handle memoList
app.get('/memoList', function(req, res){
	res.sendFile(__dirname + '/public/memoList.html');
	res.render('memoList');
});




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