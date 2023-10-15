const { getFirestore, collection, doc, setDoc, getDoc, where, query, getDocs } = require("firebase/firestore");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebase = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
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
  const position = req.body.position;
  if (position == "" || position == null) {
    res
      .status(400)
      .send(
        `Allow your location to be shared to continue. <a href="/">Return</a>`
      );
    return;
  }

  console.log(position);

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const usersCollection = collection(db, "Users");
    const userDoc = doc(usersCollection);

    const userData = {
      fullName: fullName,
      email: email,
      localisation: position,
    };

    await setDoc(userDoc, userData);

    
    console.log("Logged and updated");
    res.redirect(301, "/client/Connexion/index.html")
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
      sendEmailVerification(user).then(() => {
        res
          .status(200)
          .send(
            "A verification link has been sent to your email. Please verify"
          );
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      res.status(401).send(`Login Failed: ${errorMessage}`);
    });
});

app.post("/resetPassword", (req, res) => {
  const email = req.body.email;
  const position = req.body.position
  const usersCollection = collection(db, "Users");

  // Check if the email exists in the Users collection
  const query1 = where("email", "==", email);
  const userQuery = query(collection(db, "Users"), query1);

  getDocs(userQuery)
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        // Email does not exist in the Users collection
        res.status(401).send("Email not found. Reset password failed.");
      } else {
        // Send a password reset email
        sendPasswordResetEmail(auth, email)
          .then(() => {
            res.redirect(301, "/client/Connexion/index.html");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            res.status(401).send(`Reset password failed: ${errorMessage}`);
          });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      res.status(500).send(`Server error: ${errorMessage}`);
    });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
