const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");

mongoose.connect(
    "INSERT YOUR MONGODB KEY HERE",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
mongoose.connection.on('error',err=>{
    console.log("Something went wrong with database connection");
})
mongoose.connection.on('connected',connected=>{
    console.log("connected to database...");
})

  // Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


// Routes
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });

      }
    })(req, res, next);
});

app.post("/register", async(req, res) => {
    const doc=await User.findOne({username: req.body.username});
    if(doc) res.send("User Already Exists");
    if(!doc){
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
    }
});

app.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});



//Start Server
app.listen(4000, () => {
    console.log("Server Has Started");
  });