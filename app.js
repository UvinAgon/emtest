const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb+srv://uvin:luas@7492@cluster0-0zxm0.mongodb.net/eisenhower", {useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb://localhost:27017/eisenhowerLocal", {useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb+srv://uvin:luas@7492@cluster0-0zxm0.mongodb.net/neweisen", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://luas:luas@7492@cluster0-cyk04.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

const regions = ["Do","Schedule","Delegate","Eliminate"];

const tasksSchema = new mongoose.Schema({
  regionName : String,
  taskName : String,
  description : String,
  subTasks : String,
  priority : Number,
  allocatedTime : String,
  remainingTime : String,
  status : String,
  label : []
});
const Task = mongoose.model("task", tasksSchema);

const defaultDo = new Task({
  regionName : "Do",
  taskName : "Eisenhower front-end development",
  description : "User interface with mongodb connection",
  subTasks : null,
  priority : 1,
  allocatedTime : "1w",
  remainingTime : "1w",
  status : "In-progress",
  label : ["EM-FE","Eisenhower"]
});
// defaultDo.save();
const defaultSchedule = new Task({
  regionName : "Schedule",
  taskName : "Eisenhower login",
  description : "Login system for Eisenhoer",
  subTasks : null,
  priority : 2,
  allocatedTime : "1w",
  remainingTime : "1w",
  status : "Pending",
  label : ["EM-FE","EM-BE","Eisenhower"]
});
// defaultSchedule.save();
const defaultDelegate = new Task({
  regionName : "Delegate",
  taskName : "Eisenhower front-end futurestic entrance",
  description : "Colourful welcome with a sound",
  subTasks : null,
  priority : 3,
  allocatedTime : "1w",
  remainingTime : "1w",
  status : "Pending",
  label : ["EM-FE","Eisenhower"]
});

// app.get("/find", function(req, res){
//   Task.find(function(err,task){
//     if(err){
//       console.log("ERROR is ------------> "+err);
//     }else{
//       // tasks.forEach(function(task){
//       //   console.log(task.taskName);
//       // });
//       console.log(task);
//       res.render("region", {regionName : task});
//     }
//   });
// });
app.get("/findOne", function(req, res){
  Task.find({taskName : req.body.search},function(err,foundTask){
    console.log(taskName);
    if(err){
      console.log("ERROR is ------------> "+err);
    }else{
      // tasks.forEach(function(task){
      //   console.log(task.taskName);
      // });
      console.log(foundTask);
      res.render("region", {regionName : foundTask});
    }
  });
});
app.get("/findbyname", function(req, res){
  Task.find().taskName('Eisenhower login').exec(function(err, foundTask) {
      console.log(foundTask);
      res.render("region", {regionName : foundTask});
    });
});
app.get("/delete", function(req, res){
  Task.deleteOne({_id : "5ec9a7635dc5ae7798c66f41"},function(err,task){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully deleted One");
    }
  });
});
app.get("/deletemany", function(req, res){
  Task.deleteMany({taskName : "Eisenhower front-end futurestic entrance"},function(err,task){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully deleted many");
    }
  });
});
app.get("/update", function(req, res){
  Task.updateOne({_id : "5ec95275b33f0f9358881b06"},{taskName : "New Bootstrapy interface with also custom css effects 02"},function(err,task){
    if(err){
      console.log(err);
    }else{
      console.log(task);
      res.render("region", {regionName : task.regionName, taskName : "New Bootstrapy interface with also custom css effects"});
    }
  });
});
app.get("/ins", function(req, res){
  // defaultDo.save();
  Task.insertMany([defaultSchedule,defaultDelegate], function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Successfully saved all the tasks");
    }
  });
  // res.render("region");
  // Task.find({}, function(err, foundTask){
    // if(foundTask.length === 0){
    //   Task.insertMany(defaultDo, function(err){
    //     if(err){
    //       console.log("Luus this is the ERROR : "+err);
    //     }else{
    //       console.log("Successfully inserted the Defaults");
    //     }
    //   });
      // redirect("/ins");
      // console.log(foundTask);
    // }
    // else {
    //   // render("region", {regionName: "Region Name", taskDetails: "Task Details"})
    //   // render("region", {regionName: foundTask, taskDetails: foundTask})
    // }
  // })
});
// app.post("/ins", function(req, res){
//
// });

app.get("/add",function(req,res){
  res.render("newtask");
});
app.post("/add",function(req,res){

  const newTask = new Task({
    regionName : req.body.regionName,
    taskName : req.body.taskName,
    description : req.body.description,
    subTasks : req.body.subTasks,
    priority : req.body.priority,
    allocatedTime : req.body.timeAllocated,
    remainingTime : req.body.timeRemaining,
    status : req.body.status,
    label : req.body.label
  });
  // console.log(newTask);
  newTask.save();
  res.render("region",{regionName:newTask});
  res.send(newTask);
  // res.redirect("/add");
});
app.get("/", function(req, res){
  res.render("home");
});
app.get("/about", function(req, res){
  res.render("about");
});
app.get("/do", function(req, res){
  res.render("region", {regionName: "Do"});
});
app.get("/region", function(req, res){
  res.render("about");
});
// app.get("/login", function(req, res){
//
// });
// app.get("/register", function(req, res){
//
// });


// find by id
app.get("/task/:id", function(req, res){
  const taskID = req.params.id;
  Task.find({_id : taskID}, function(err,foundTask){
    if(err){
      res.send(err);
    }else{
      console.log("Found id : "+ taskID);
      res.send(foundTask);
    }
  });
});
// insert
app.post("/task",function(req,res){
  console.log(req);
  const regionNameBody = req.body.regionName;
  console.log(req.body);
  const taskNameBody = req.body.taskName;
  const descriptionBody = req.body.description
  const subTasksBody = req.body.subTasks;
  const priorityBody = req.body.priority;
  const allocatedTimeBody = req.body.timeAllocated;
  const remainingTimeBody = req.body.timeRemaining;
  const statusBody = req.body.status;
  const labelBody = req.body.label;

  const newTask = new Task({
    regionName : regionNameBody,
    taskName : taskNameBody,
    description : descriptionBody,
    subTasks : subTasksBody,
    priority : priorityBody,
    allocatedTime : allocatedTimeBody,
    remainingTime : remainingTimeBody,
    status : statusBody,
    label : labelBody
  });
  newTask.save();
  console.log(newTask);
  res.send(newTask);
});
// update by id
app.put("/task/:id", function(req, res){
  const taskID = req.params.id;
  const newTaskName = req.body.taskName;
  Task.updateOne({_id : taskID},{taskName : newTaskName}, function(err,foundTask){
    if(err){
      res.send(err);
    }else{
      console.log("Successfully updated : "+ taskID+" \n"+newTaskName);
      res.send(foundTask);
    }
  });
});
// delete by id
app.delete("/task/:id", function(req, res){
  const taskID = req.params.id;
  Task.deleteOne({_id : taskID},function(err,foundTask){
    if(err){
      res.send(err);
    }else{
      console.log("Successfully deleted : "+ taskID);
      res.send(foundTask);
    }
  });
});
// find all
app.get("/task", function(req, res){
  const taskID = req.params.id;
  Task.find({}, function(err,foundTask){
    if(err){
      res.send(err);
    }else{
      res.send(foundTask);
    }
  });
});





app.listen(process.env.PORT || 3000, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Successfully connected 3000");
  }
});
