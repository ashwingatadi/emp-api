const express = require('express');

const port = process.env.PORT || 3000;
var app = express();

app.get('/',(req, res)=>{
    res.send('Hello Express');
});

app.listen(port,()=>{
    console.log('App Started on port ', port);
});

