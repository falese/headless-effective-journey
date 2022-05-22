const express = require('express');
const documentRouter = require('./routes/document.router');
require('dotenv').config();
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8099;
const app= express()

mongoose.connect(process.env.DB_CONNECT_STRING,
    {useNewUrlParser: true,
    useUnifiedTopology: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      
    });


app.use(express.urlencoded({ extended: true }));

app.use(documentRouter);

 
app.listen(PORT,()=>{console.log(`Document Service is running on ${PORT}`)});