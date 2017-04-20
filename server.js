const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
var ObjectID = require('mongodb').ObjectID;
var cors = require('cors');

var mongoose = require('./db/connect.js').mongoose;
var employee = require('./models/employee').employee;

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res)=>{
    res.send('Hello Express');
});

app.post('/',(req, res)=>{
    var emp = new employee({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        message: req.body.message
    });

    emp.save().then(
        (emp)=>{
            res.send(emp)
        },
        (err)=>{
            res.send(err)
        }).catch((e)=>{
        res.status(404).send();
    });
});

app.get('/employees',(req, res)=>{
    employee.find().then(
        (employees)=>{
            res.send({employees})
        },
        (error)=>{
            res.send(error)
        }).catch((e)=>{
        res.status(404).send();
    });
});

app.get('/employee/:id',(req, res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    // employee.find({_id: id}).then(
    //     (employee)=>{
    //         res.send(employee);
    //     },
    //     (error) =>{
    //         res.send(error);
    //     }
    // )
    employee.findById(id).then(
        (employee)=>{
            if(!employee){
                res.status(404).send();
            }
            res.send(employee);
        },
        (error) =>{
            res.send(error);
        }
    ).catch((e)=>{
        res.status(404).send();
    });

});

app.delete('/employee/:id',(req, res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    employee.findByIdAndRemove(id).then(
        (employee)=>{
            if(!employee){
                res.status(404).send();
            }
            res.send(employee);
        },
        (error) =>{
            res.send(error);
        }
    ).catch((e)=>{
        res.status(404).send();
    });
});

app.patch('/employee/:id',(req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'age', 'gender']);

    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }

    employee.findByIdAndUpdate(id, {$set: body}, {new: true}).then(
        (employee)=>{
            if(!employee){
                res.status(404).send();
            }
            res.send(employee);
        },
        (error) =>{
            res.send(error);
        }
    ).catch((e)=>{
        res.status(404).send();
    });
});

app.listen(port,()=>{
    console.log('App Started on port ', port);
});

