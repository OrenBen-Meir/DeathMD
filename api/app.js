const methodOverride = require('method-override');
const bodyParser     = require('body-parser');
const express        = require('express');
const app            = express();
const path           = require('path');

//---------------------------------------------------------------------------------------
// Middlewares
//---------------------------------------------------------------------------------------
app.use(express.json());
app.use(methodOverride('_method'));

//---------------------------------------------------------------------------------------
// Use routes
//---------------------------------------------------------------------------------------
app.post('/api/predict', (req, res) => {
  res.send("predict")
})

app.post('/api/retrain', (req, res) => {
  res.send("retrain")
})

//---------------------------------------------------------------------------------------
// Create Server Using port
//---------------------------------------------------------------------------------------
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});
