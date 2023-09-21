const User = require("./user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async(username, password, done) => {
      const user =await User.findOne({ username: username });
      if (!user) return done(null, false);
      await bcrypt.compare(password, user.password)
      .then((result) => {
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err=>{
        throw err;
      });
      //   if(result==true) return done(null, user);
      //   else return done(null, false);
      //   User.findOne({ username: username }, (err, user) => {
      //     if (err) throw err;
      //     if (!user) return done(null, false);
      //     bcrypt.compare(password, user.password, (err, result) => {
      //       if (err) throw err;
      //       if (result === true) {
      //         return done(null, user);
      //       } else {
      //         return done(null, false);
      //       }
      //     });
      //   });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    const user = User.findOne({ _id: id });
    const userInformation = {
      username: user.username,
    };
    cb(null, userInformation);
    // User.findOne({ _id: id }, (err, user) => {
    //   const userInformation = {
    //     username: user.username,
    //   };
    //   cb(err, userInformation);
    // });
  });
};
