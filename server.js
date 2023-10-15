const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebase = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} = require("firebase/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

const firebaseConfig = {
  apiKey: "AIzaSyAmnb2L3FMQ750ov2XmN2xhM9rcrgRywCc",
  authDomain: "bell-1b138.firebaseapp.com",
  projectId: "bell-1b138",
  storageBucket: "bell-1b138.appspot.com",
  messagingSenderId: "623467438376",
  appId: "1:623467438376:web:16b2aaf94b95098621f01d",
  measurementId: "G-443SD60H0V",
};

firebase.initializeApp(firebaseConfig);

const appFirebase = firebase.initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

const auth = getAuth();
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    if (fullName == "" || fullName == null) {
      //// JV ECRIS
    }
    const position = req.body.position;
    console.log(position)

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        const usersCollection = collection(db, "Users");
        const userDoc = doc(usersCollection);

        const userData = {
            fullName: fullName,
            email: email,
            localisation: position
        };

        await setDoc(userDoc, userData);

        res.status(200).send("Logged and updated");
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        res.status(401).send(`Failed: ${errorMessage}`);
    }
});

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).send("Singed in");
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