const express = require("express"),
router = express.Router(),
Week = require("../models/week"),
Employee = require("../models/employee");

// router.get("/schedule", (req, res) => {
//     Employee.find({}, (err, employees) => {
//         if(err) {
//             console.log(err);
//         } else {
//             res.render("scheduleTest", {employees:employees});
//         }
//     })
//})

//show the schedule
router.get("/schedule", (req, res) => {
    Employee.find({}, (err, employees) => {
        if(err) {
            console.log(err);
        } else {
            Week.find({}, (err, weeks) => {
                if(err) {
                    console.log(err);
                } else {
                    res.render("scheduleTest", {weeks:weeks, employees:employees});
                }
            })
        }
    })
});

//post request to update week busy-ness array
router.post("/week", (req, res) => {
    // req.body.week.body = req.sanitize(req.body.week.body);
    Week.remove({}, (err, week) => {
        Week.create(req.body.week, (err, newWeek) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect("/employees");
            }
        })
    })
    
});

module.exports = router;