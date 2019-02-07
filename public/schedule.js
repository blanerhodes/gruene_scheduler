const laurynn = new EmpStats("laurynn", new Positions(false, true, true, true, true, false), false, "all"),
grant = new EmpStats('grant', new Positions(false, true, false, false, false, false), false, "all"),
connor = new EmpStats('connor', new Positions(true, false, false, false, false, false, false), "all");
ana =  new EmpStats('ana', new Positions(false, true, true, true, false, false), false, "all"),
teddy = new EmpStats('teddy', new Positions(false, true, false, true, true, true), false, "all"),
rose = new EmpStats('rose',new Positions(false, true, true, true, false, false), false, "all"),
tucker = new EmpStats('tucker', new Positions(true, false, false, false, false, false), false, "all"),
andrew = new EmpStats('andrew', new Positions(false, true, false, false, false, false), false, "all"),
quincey = new EmpStats('quincey', new Positions(false, true, true, false, false, false), false, "all"),
ian = new EmpStats('ian', new Positions(false, true, false, true, true, false), false, "all"),
mario = new EmpStats('mario', new Positions(false, false, false, false, false, true), false, "all"),
nick = new EmpStats('nick', new Positions(true, false, false, false, false, false), false, "all"),
blane = new EmpStats('blane', new Positions(false, true, false, true, false, false), false, "all"),
roch = new EmpStats('roch', new Positions(false, false, false, false, false, true), false, "all"),
britney = new EmpStats('britney', new Positions(false, true, true, true, false, false), false, "all"),
nanette = new EmpStats('nanette', new Positions(false, false, false, false, false, true), false, "all"),
kellie =  new EmpStats('kellie', new Positions(false, true, false, false, false, false), true, "all"),
will = new EmpStats('will', new Positions(true, false, false, false, false, false), true, "all");

const employees = [laurynn, grant, connor, ana, teddy, rose, tucker, andrew, quincey, ian, mario, nick, blane, roch, britney, nanette, kellie, will]

function EmpStats(name, position, temp, availability) {
    this.name = name;
    this.position = position;
    this.temp = temp;
    this.availability = availability;
}

function Positions(bottle, bartender, door, opener, headBartender, manager) {
    this.bottle = bottle;
    this.bartender = bartender;
    this.door = door;
    this.opener = opener;
    this.headBartender = headBartender;
    this.manager = manager;
}

function DayStats(day) {
    this.day = day;
    this["8AM"] = [];
    this["9AM"] = [];
    this["10AM"] =[];
    this["1PM"] =[];
    this["3PM"] =[];
    this["5PM"] = [];
    this["6PM"] =[];
    this["7PM"] = [];
    this["8PM"] = [];
    this["9PM"] = [];
}
const currentWeek = [new DayStats("monday"), new DayStats("tuesday"), new DayStats("wednesday"), new DayStats("thursday"), new DayStats("friday"), new DayStats("saturday"), new DayStats("sunday")];
//remake console.log
function c(...args) {
    console.log(args);
}
//generate random integer in given range
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//make array of employees with given position property
function positionArray(property) {
    let positionMatch = [];
    for(let emp of employees) {
        if(emp.position[property]) {
            positionMatch.push(emp.name);
        }
    }
    return positionMatch;
}

//assign to given shift
function assignShift(array, weekdayIndex, timeProp, removeIndex, numOfEmps) {
    for(let assign=1; assign<=numOfEmps; assign++) {
        currentWeek[weekdayIndex][timeProp].push(array[removeIndex]);
        array.splice(removeIndex,1);
    }
}

//variable "day" is passed from another function, empArray is an array made from positionArray(), remove whos worked today from given array
function removeWorkedToday(empArray, dayIndex) {
    for(let prop in currentWeek[dayIndex]){
        if(currentWeek[dayIndex].hasOwnProperty(prop)){
            for(let propIndex=0; propIndex<currentWeek[dayIndex][prop].length; propIndex++) {
                if(empArray.includes(currentWeek[dayIndex][prop][propIndex])){
                    empArray.splice(empArray.indexOf(currentWeek[dayIndex][prop][propIndex]), 1);
                }
            }
        }     
    }
}

// ##################### END OF FUNCTIONS AND GLOBAL DECLARATIONS #########################


//assign morning shift to random opener based on the day, no one opens more than once a week
const opener = positionArray("opener");
for(let i=0; i<currentWeek.length; i++) {
    let randNum = randInt(0, opener.length-1);
    if(i<5 && i!==2) {
        assignShift(opener, i, "10AM", randNum, 1)
    } else if(i===2){
        assignShift(opener, i, "8AM", randNum, 1)
    } else {
        assignShift(opener, i, "9AM", randNum, 1)
    }
}

//assign midday shift on weekends to random employee, no one works twice in one day
for(let i=5; i<currentWeek.length; i++) {
    const weekendBartenders = positionArray("bartender");
    removeWorkedToday(weekendBartenders, i);
    let randNum = randInt(0, weekendBartenders.length-1);
    assignShift(weekendBartenders, i, "1PM", randNum, 1)
}

// //assign evening shifts based on the day, no one works same day twice
for(let k=0; k<currentWeek.length; k++){
    const shiftChangeBartenders = positionArray("bartender");
    removeWorkedToday(shiftChangeBartenders, k);
    let randNum = randInt(0, shiftChangeBartenders.length-1);
    if(k<4){
        assignShift(shiftChangeBartenders, k, "6PM", randNum, 1);
      } else if(k===4) {
        assignShift(shiftChangeBartenders, k, "6PM", randNum, 2);
        assignShift(shiftChangeBartenders, k, "7PM", randNum, 1);
        assignShift(shiftChangeBartenders, k, "8PM", randNum, 2);
        assignShift(shiftChangeBartenders, k, "9PM", randNum, 1);
    } else if (k===5) {
        assignShift(shiftChangeBartenders, k, "6PM", randNum, 2);
        assignShift(shiftChangeBartenders, k, "7PM", randNum, 2);
        assignShift(shiftChangeBartenders, k, "8PM", randNum, 1);
        assignShift(shiftChangeBartenders, k, "9PM", randNum, 2);
    } else {
        assignShift(shiftChangeBartenders, k, "3PM", randNum, 2);
      }
 }

c(currentWeek);

