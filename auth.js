const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

Passport.use(new LocalStrategy( async(UserName, Password, done) => {
    try{
      const user = await Person.findOne({username: UserName});
      if(!user){
        return done(null, false, {message: "Incorrect UserName"});
      }
  
      const isPassword = await user.comparePassword(Password);
      if(isPassword){
        return done(null, user);
      } 
      else{
        return done(null, false, {message: "Incorrect Password"});
      }
    }catch(err){
      return done(err);
    }
  }))

module.exports = Passport;