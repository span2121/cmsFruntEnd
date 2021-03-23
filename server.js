const express = require('express');
const bodyParser = require('body-parser');
cors = require("cors");
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
const routes = require('./src/routes/index')
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
 app.use(cors());
 //app.listen(port, () => console.log("Backend server live on " + port));

// define a root route

// app.get('/', (req, res) => {
//   res.send("Hello World");
// });
// // Require student routes
// const employeeRoutes = require('./src/routes/student.routes')
// // using as middleware
// app.use('/api/v1/employees', employeeRoutes)
// // listen for requests
app.use('/api/', routes)
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});