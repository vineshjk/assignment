import express from 'express';

import cors from 'cors';
import path from 'path'

import bodyParser from 'body-parser';
const app = express();
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
import firebase from 'firebase'

 const firebaseConfig = {
  apiKey: "AIzaSyCN6wmFDdNKELhZc5lZemqTT9HbwV7n_7g",
  authDomain: "payfast-7739c.firebaseapp.com",
  projectId: "payfast-7739c",
  storageBucket: "payfast-7739c.appspot.com",
  messagingSenderId: "149914224948",
  appId: "1:149914224948:web:46d4a31232ec607719bd61",
  measurementId: "G-0X2YHJ8DLX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users")

const generateUniqueID=async()=>{
  const lastUser = await User.orderBy("id", "desc").limit(1).get();
  const lastUserID = lastUser.docs[0]?.data()?.id || 0;
  return lastUserID + 1;
};
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
});

app.post("/create",async(req,res)=>{
    const data=req.body;
    const userID = await generateUniqueID();
    const userRef = User.doc(userID.toString());
    await userRef.set({ ...data, id: userID });
    //await User.add(data)
    console.log("data od user",data);
    res.send({mes:userID.toString()});})

    app.get('/', async (req,res) => {
      try {
        const snapshot = await User.get();
        const users = snapshot.docs.map((doc) => doc.data());
        console.log(users);
        console.log("hello")
        
        res.json(users)
        console.log(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
      }
    });    
    app.listen(8005,()=>console.log("running on 8005"))

