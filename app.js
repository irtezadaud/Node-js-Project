const express = require ("express");
const path = require("path");
const fs = require('fs');
const app = express();
const port = 80;

//EXPRESS RELATED//
app.use("/static", express.static('static')); // for serving static files
app.use(express.urlencoded({ extended: true }))

//PUG RELATED//
app.set('view engine', 'pug'); // setting the template engine as pug
app.set('views', path.join(__dirname, 'views')); //setting a views directory

// ENDPOINTS //

app.get('/', (req, res) => {
    const con = "This is the greatest app you'll ever see."
    const params = {'title': 'VULCAN' , "content": con};
    res.status(200).render('index.pug', params);
})

app.post('/', (req, res) => {
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more

    let outputToWrite = `The name of the user is ${name}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`;
    fs.writeFileSync('output.txt', outputToWrite);
    const params = {'message': 'Your form has been submitted successfully.'};
    res.status(200).render('index.pug', params);
})


// STARTING THE SERVER // 
app.listen(port, ()=> {
    console.log(`The application successfully started running on port ${port}`);
})