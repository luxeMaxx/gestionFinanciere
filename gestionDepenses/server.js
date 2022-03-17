const express =require("express");
const cors =require("cors");
const bodyParser = require("body-parser");

const app = express();


app.use (bodyParser.urlencoded ({extended : true}));
app.use (cors());
app.use (express.json());

//app.use(express.static(__dirname + "/views"));

const routeIndex = require("./routes/index");
app.use('/', routeIndex);


const port = 3001;
app.listen (port, () => {console.log(`server running on port ${port}`)});

