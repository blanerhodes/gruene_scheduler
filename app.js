const express  = require("express"),
app            = express(),
bodyParser     = require("body-parser"),
mongoose       = require("mongoose"),
sanitizer      = require("express-sanitizer"),
methodOverride = require("method-override"),
Employee       = require("./models/employee"),
Week           = require("./models/week"),
employeeRoutes = require("./routes/employees"),
scheduleRoutes = require("./routes/schedule")
moment         = require("moment")
;

//app config     
mongoose.connect("mongodb://localhost:27017/employees_scheduler", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());

//BAND ROUTING
//new employee form
// app.get("/employees/new", (req,res) => {
//     res.render("newEmp");
// });

app.use(employeeRoutes);
app.use(scheduleRoutes);

app.listen(3000, ()=> {
    console.log("SCHEDULE SERVER STARTED");
})


