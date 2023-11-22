const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 8099;


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MongoDB
const uri = 'mongodb+srv://admin:admin@memos.2tgoxll.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
let db;

async function connect() {
  try {
    await client.connect();
    db = client.db();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

function getDB() {
  return db;
}


// Home page
app.get('/', (req, res) => {
  res.render('home');
});


// Login page
app.get('/auth/login', (req, res) => {
  res.render('login');
});

// Handle login logic
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    req.session.isLoggedIn = true;
    req.session.user = username;
    res.redirect('/memo');
  } else {
    res.render('login', { error: 'Invalid username or password' });
  }
});

// Logout
app.get('/auth/logout', (req, res) => {
  // Destroy user session or invalidate JWT token
  req.session.destroy();
  res.redirect('/');
});

// Signup page
app.get('/auth/signup', (req, res) => {
  res.render('signup');
});

// Handle user registration logic
app.post('/auth/signup', (req, res) => {
  const { username, password } = req.body;

  // Create a new user in the database
  if (username && password) {
    // Create user logic here
    res.redirect('/auth/login');
  } else {
    res.render('signup', { error: 'Username and password are required' });
  }
});

// Memo CRUD Functionality

// Memo List
app.get('/memo', (req, res) => {
  // Fetch memos from the database
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

  // Create a new memo in the database
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

  // Fetch memo by ID from the database
  const memo = db.collection('memos').findOne({ _id: ObjectId(memoId) });

  res.render('view', { memo });
});

// Memo Editing

// Edit memo form
app.get('/memo/:id/edit', (req, res) => {
  const memoId = req.params.id;

  // Fetch memo by ID from the database
  const memo = db.collection('memos').findOne({ _id: ObjectId(memoId) });

  res.render('edit', { memo });
});

// Handle memo update logic
app.post('/memo/:id/edit', (req, res) => {
  const memoId = req.params.id;
  const { title, content } = req.body;

  // Update the memo in the database
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

  // Delete the memo from the database
  // Delete memo logic here

  res.redirect('/memo');
});

// Start the server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connect();
});