const express = require('express');  
const app = express(); 
const PORT = 4000;  

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./key.json");

app.use(express.static('vedic'));

initializeApp({
    credential: cert(serviceAccount),
  });
  const db = getFirestore();
  

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/vedic/'+index.html)
})

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/vedic/'+signup.html)
})

app.get('/SignupSubmit',(req,res)=>{
    db.collection('Login_Signup').add({
        name : req.query.name,
        email : req.query.email,
        password : req.query.Password
    }).then(()=>{
        res.send("Succesfully Signup.You have created an account");
    })
})

app.get('/file', (req, res) => {
    res.sendFile(__dirname + '/vedic/file.html');
});

app.get('/LoginSubmit', (req, res) => {
    db.collection('Login_Signup')
        .where("email", "==", req.query.email)
        .where("password", "==", req.query.password)
        .get()
        .then((docs) => {
            if (docs.size >= 1) {
                res.redirect('/file');
            } else {
                res.send("Please Enter existing email and password");
            }
        });
});






app.listen(PORT,()=>{
    console.log("listening at " +PORT);
})