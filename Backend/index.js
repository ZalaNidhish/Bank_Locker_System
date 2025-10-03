const express = require("express");
const app = express();
const DB = require("./connection");
const cors = require("cors");
const lockerRouter = require("./routes/lockerRouter");

const User = require("./models/user");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));


app.get("/", (req, res) => {
  res.send("Hello World");
});



app.use("/locker", lockerRouter);


app.post("/register", async (req, res) => {
  const { username, password, email, phone } = req.body;

  async function findUsers() {
    const preUser1 = await User.findOne({ username: username });
    const preUser2 = await User.findOne({ email: email });
    const preUser3 = await User.findOne({ phone: phone });
    return { preUser1, preUser2, preUser3 };
  }

  const { preUser1, preUser2, preUser3 } = await findUsers();

  if (!username || !password || !email || !phone) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  } else if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ success: false, message: "Phone number must be exactly 10 digits." });
  } else if (preUser1) {
    return res.status(400).json({ success: false, message: "User already exists with this username." });
  } else if (preUser2) {
    return res.status(400).json({ success: false, message: "User already exists with this email." });
  } else if (preUser3) {
    return res.status(400).json({ success: false, message: "User already exists with this phone number." });
  } else {
    try {
      const newUser = new User({ username, password, email, phone, isLoggedin: true });
      await newUser.save();
      return res.status(201).json({ success: true, message: "User Registered Successfully", isLoggedin: newUser.isLoggedin, username: newUser.username, id: newUser._id });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
});



app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({username});

  if(!user){
    console.log("No such User found")
    return res.status(404).json({success:false, message: "No such User found"})
  } else if(password !== user.password){
    console.log("Incorrect Password")
    return res.status(401).json({success: false, message:"Incorrect Password"})
  } else if(user && password == user.password && user.isAdmin == true ){
    console.log(" Admin logged in")
    user.isLoggedin = true;
    await user.save();
    return res.status(201).json({success:true, username:user.username, id:user._id, isLoggedin: user.isLoggedin, isAdmin: user.isAdmin, message: "Admin logged in"});
  } else if(user && password == user.password && user.isAdmin == false ){
    console.log("User logged in")
    user.isLoggedin = true;
    await user.save();
    return res.status(201).json({success:true, username:user.username, id:user._id, isLoggedin: user.isLoggedin, isAdmin: user.isAdmin, message: "User logged in", lockers:user.lockers.length });
  }
})


app.post("/logout", async (req,res)=>{
  const {id, password} = req.body;
  
  const user = await User.findById(id);

  if(!user){
    console.log("No such User found")
    return res.status(404).json({success:false, message: "No such User found"})
  } else if(password !== user.password){
    console.log("Incorrect Password")
    return res.status(401).json({success: false, message:"Incorrect Password"})
  } else if(user && password == user.password){
    user.isLoggedin = false
    await user.save();
    return res.status(201).json({success: true, isLoggedin: user.isLoggedin, message: "User Logged Out Successfully"})
  }
})





app.listen(PORT, () => {
  console.log("Server Running On Port", PORT);
});
