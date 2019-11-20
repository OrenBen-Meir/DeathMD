const path           = require('path');
const fs             = require('fs');
const cp             = require('child_process');
const methodOverride = require('method-override');
const bodyParser     = require('body-parser');
const mysql          = require('mysql')
const express        = require('express');
const app            = express();
const spawn          = cp.spawn;

//---------------------------------------------------------------------------------------
// Sets environment variables
//---------------------------------------------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//---------------------------------------------------------------------------------------
// mysql query strings
//---------------------------------------------------------------------------------------

const all_symptoms = "SELECT * FROM Symptoms;";
const all_subjects = "SELECT * FROM Subjects;";
const all_conditions = "SELECT * FROM Conditions;";
const subject_symptoms = "SELECT subject_id,  SubjectSymptoms.symptom_id, intensity, symptom_name FROM SubjectSymptoms join Symptoms ON SubjectSymptoms.symptom_id = Symptoms.id;";

const all_diagnosis = "SELECT DiagnosisData.subject_id,  condition_id, condition_name FROM DiagnosisData join Conditions ON DiagnosisData.condition_id = Conditions.id;";

//---------------------------------------------------------------------------------------
// Helper functions
//--------------------------------------------------------------------------------------

// Takes in a mysql connection for our database and trains from the data in the database and will send result to client if res is specified
function train(connection, res = null) {
  // Query String
  const train_queries = all_subjects + all_symptoms + all_conditions + subject_symptoms + all_diagnosis;
  // Querying training data
  connection.query(train_queries, (err, train_data) => {
    if (err){
      if(res) {
        console.error(err.message);
        console.error(err.stacl);
        return res.status(400);
      }
      throw err;
    } 
    // Mapping train data into JSON strings
    train_data = train_data.map(elem => JSON.stringify(elem));
    // Path to python training script
    const script_path = path.join(process.cwd(), 'api', 'doctor', 'train_doctor.py');
    // script arguments
    const train_args = [script_path].concat(train_data).concat(res == null);
    // execute training script
    const train_process = spawn('python', train_args);
    // Script feedback
    train_process.stdout.on('data', data => {
      console.log(data.toString());
      if(res){
        res.send('success')
      }
    });
    // Log any error
    train_process.stderr.on('data', data => {
      console.error(data.toString())
      if(res){
        res.sendStatus(400)
      }
    });
  });
}

// diagnoses based on symptom data and will send diagnosis result to client if res is specified
function diagnose(symptomData, res = null){
  const script_path = path.join(process.cwd(), 'api', 'doctor', 'diagnose.py');
  const predict_process = spawn('python', [script_path, JSON.stringify(symptomData)]);
  predict_process.stdout.on('data', data => {
    const diagnosis = JSON.parse(data.toString());
    console.log("Diagnosis requested!!!");
    console.log("symptom data:", symptomData);
    console.log("Diagnosis:", diagnosis);
    if (res){
      res.json(diagnosis);
    }
  });
  // Log any error
  predict_process.stderr.on('data', data => {
    console.error(data.toString());
    if(res){
      res.sendStatus(400);
    }
  });
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
  // Getting path to init_data.sql to initialize the database
  init_path = path.join(process.cwd(),'api','sql', 'init_data.sql');
  // Reading init_data.sql
  fs.readFile(init_path, (err, contents) => {
    if (err) throw err;
    // Query string from init_data.sql
    const init_query = contents.toString(); 
    // Setting up database using query string from init_data.sql
    con.query(init_query, (err, results) => {
      if (err) throw err;
      console.log(results || "Database initialized!!");
      // train data
      train(con)
    });
  });
});

//---------------------------------------------------------------------------------------
// Middlewares
//---------------------------------------------------------------------------------------
app.use(express.json());
app.use(methodOverride('_method'));
app.use(bodyParser.json());

//---------------------------------------------------------------------------------------
// Use routes
//---------------------------------------------------------------------------------------

// returns array of symptoms
app.get('/api/symptoms', (req, res) => {
  con.query(all_symptoms, (err, results) => {
    if(err) {
      console.error(err.message);
      console.error(err.stack)
      res.sendStatus(404);
    }
    res.json(results);
  });
});

// returns array of conditions
app.get('/api/conditions', (req, res) => {
  con.query(all_conditions, (err, results) => {
    if(err) {
      console.error(err.message);
      console.error(err.stack)
      res.sendStatus(404);
    }
    res.json(results);
  });
});

// recieves symptomData from request body to make and send a diagnosos/
// symptomData is an object whose attributes is named to be symptom names
// and whose values are numerical values 
app.post('/api/predict', (req, res) => {
  diagnose(req.body.symptomData, res); // Will handle diagnosis and responding to client
});

// send new data so the machine learning algorithm retrains
app.post('/api/retrain', (req, res) => {
  res.send("retrain");
});

//---------------------------------------------------------------------------------------
// Create Server Using port
//---------------------------------------------------------------------------------------
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Start executing python script to train doctor
});
