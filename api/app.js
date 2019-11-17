const path           = require('path');
const cp             = require('child_process')
const fs             = require('fs');
const methodOverride = require('method-override');
const bodyParser     = require('body-parser');
const mysql          = require('mysql')
const express        = require('express');
const app            = express();

//---------------------------------------------------------------------------------------
// Sets environment variables
//---------------------------------------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//---------------------------------------------------------------------------------------
// mysql connection
//---------------------------------------------------------------------------------------

const con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  multipleStatements: true
});

con.connect( err => {
  if (err) throw err;
  console.log("Connected!");

  // Setting up database using init_data.sql
  init_path = path.join(process.cwd(),'api','sql', 'init_data.sql');
  fs.readFile(init_path, (err, contents) => {
    if (err) throw err;
    const init_query = contents.toString();
    con.query(init_query, err, results => {
      if (err) throw err;
      console.log(results || "Database initialized!!")
    });
  });

});

//---------------------------------------------------------------------------------------
// Middlewares
//---------------------------------------------------------------------------------------
app.use(express.json());
app.use(methodOverride('_method'));

//---------------------------------------------------------------------------------------
// Use routes
//---------------------------------------------------------------------------------------

// returns array of symptoms
app.get('/api/symptoms', (req, res) => {
  res.send("predict")
})

// recieves symptom data to make and send a diagnosos
app.post('/api/predict', (req, res) => {
  res.send("predict")
})

// send new data so the machine learning algorithm retrains
app.post('/api/retrain', (req, res) => {
  res.send("retrain")
})

//---------------------------------------------------------------------------------------
// Create Server Using port
//---------------------------------------------------------------------------------------
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Start executing python script to train doctor
});
