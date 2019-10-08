// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Let the Express app tap into the js within the public folder 
app.use(express.static("public"));

// Table data

var tables = [
    {
      routeName: "bobross",
      name: "Bob Ross",
      phoneNumber: "1234567890",
      email:"bob@bobross.com",
      id: 1
    },
    {
        routeName: "mrrogers",
        name: "Mr. Rogers",
        phoneNumber: "7894561234",
        email: "mrrogers@pbs.com",
        id: 2
    },
    {
        routeName: "steveirwin",
        name: "Steve Irwin",
        phoneNumber: "3125347568",
        email: "steve@conservation.org",
        id: 3
    }
  ];

  // Waitlist 
  var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
  
  // Displays the add page
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });

// Gets our API Tables page
app.get("/api/tables", function(req, res){
  return res.json(tables);
})

// Gets our API Waitlist page
app.get("/api/waitlist", function(req, res){
  return res.json(waitlist);
})

app.post("/api/waitlist", function(req, res){
  var newWaitlist = req.body;
  newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();

  console.log(newWaitlist);

  res.json(waitlist);
  
})
// Create New Tables - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newTable);
  
    if (tables.length >= 5){

      waitlist.push(newTable)

    }
    else{

    tables.push(newTable);

    }
    res.json(newTable);
  });

  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
