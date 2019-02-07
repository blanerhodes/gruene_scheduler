const express  = require("express"),
app            = express(),
bodyParser     = require("body-parser"),
mongoose       = require("mongoose"),
sanitizer      = require("express-sanitizer"),
methodOverride = require("method-override");

//app config     
mongoose.connect("mongodb://localhost:27017/employees_scheduler", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());

//schema setup
const employeeSchema = new mongoose.Schema({
    name: String,
    positions: {
        bottle: String,
        bartender: String,
        door: String,
        opener: String,
        headBartender: String,
        manager: String
    },
    availability: {
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
        saturday: [String],
        sunday: [String],
    },
    hours: {
        current: Number,
        max: Number,
        min: Number
    }
});
const Employee = mongoose.model("Employee", employeeSchema);

//landing index
app.get("/employees", (req, res) => {
    Employee.find({}, (err, employees) => {
        if(err) {
            console.log(err);
        } else {
            res.render("schedule", {employees:employees});
        }
    })
});

//new employee form
app.get("/employees/new", (req,res) => {
    res.render("newEmp");
});

//create new employee
app.post("/employees", (req, res) => {
    // console.log(req.body.employee);
    req.body.employee.body = req.sanitize(req.body.employee.body);
    Employee.create(req.body.employee, (err, newEmployee) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/employees");
        }
    })
});

//SHOW ROUTE
app.get("/employees/:id", (req, res) => {
    Employee.findById(req.params.id, (err, foundEmp) => {
        if(err) {
            // res.redirect("/employees");
            console.log(err);
        } else {
            res.render("show", {employee: foundEmp});
        }
    }) 
 });

//EDIT ROUTE
app.get("/employees/:id/edit", (req, res) => {
    Employee.findById(req.params.id, (err, foundEmp) => {
        if(err){
            res.redirect("/employees");
        } else {
            res.render("edit", {employee: foundEmp});
        }
    })
});

//UPDATE ROUTE
app.put("/employees/:id", (req, res) => {
    req.body.employee.body = req.sanitize(req.body.employee.body);
    Employee.findByIdAndUpdate(req.params.id, req.body.employee, (err, updatedEmp) => {
        if(err) {
            // res.redirect("/employees");
            console.log(err);
        } else {
            res.redirect("/employees/" + req.params.id);
        }
    })
})

//DELETE ROUTE
app.delete("/employees/:id", (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            // res.redirect("/employees");
            console.log(err);
        } else{
            res.redirect("/employees");
        }
    })
})




app.listen(3000, ()=> {
    console.log("SCHEDULE SERVER STARTED");
})


