const express = require('express');
const app = express();
const bodyParser = require('body-parser');
import firebase from 'firebase'
require('firebase/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const firebaseConfig = {
    apiKey: "AIzaSyAmnb2L3FMQ750ov2XmN2xhM9rcrgRywCc",
    authDomain: "bell-1b138.firebaseapp.com",
    projectId: "bell-1b138",
    storageBucket: "bell-1b138.appspot.com",
    messagingSenderId: "623467438376",
    appId: "1:623467438376:web:16b2aaf94b95098621f01d",
    measurementId: "G-443SD60H0V"
  };

firebase.initializeApp(firebaseConfig);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.send(`Login Successful for ${user.email}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            res.status(401).send(`Login Failed: ${errorMessage}`);
        });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});