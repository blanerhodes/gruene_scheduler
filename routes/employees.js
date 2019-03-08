const express = require("express"),
router = express.Router(),
Employee = require("../models/employee");


router.get("/employees", (req, res) => {
    Employee.find({}, (err, employees) => {
        if(err) {
            console.log(err);
        } else {
            res.render("employees", {employees:employees});
        }
    })
});

//new employee form
router.get("/employees/new", (req,res) => {
    res.render("newEmp");
});

//create new employee
router.post("/employees", (req, res) => {
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

//SHOW Employee ROUTE
router.get("/employees/:id", (req, res) => {
    Employee.findById(req.params.id, (err, foundEmp) => {
        if(err) {
            // res.redirect("/employees");
            console.log(err);
        } else {
            res.render("show", {employee: foundEmp});
        }
    }) 
 });

//EDIT Employee ROUTE
router.get("/employees/:id/edit", (req, res) => {
    Employee.findById(req.params.id, (err, foundEmp) => {
        if(err){
            res.redirect("/employees");
        } else {
            res.render("edit", {employee: foundEmp});
        }
    })
});

//EDIT Employee Vacation ROUTE
router.get("/employees/:id/vacation", (req, res) => {
    Employee.findById(req.params.id, (err, foundEmp) => {
        if(err){
            res.redirect("/employees");
        } else {
            res.render("vacation", {employee: foundEmp});
        }
    })
});



//UPDATE Employee ROUTE
router.put("/employees/:id", (req, res) => {
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

//DELETE Employee ROUTE
router.delete("/employees/:id", (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            // res.redirect("/employees");
            console.log(err);
        } else{
            res.redirect("/employees");
        }
    })
})

module.exports = router;