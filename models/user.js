////mongo code/////
var bcrypt =require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {type: String,lowercase: true, required: true, unique: true},
    password: {type: String,required: true},
    email: {type: String, lowercase: true,required: true,unique: true}

});

userSchema.pre('save',function (next) {

    var user = this;
    bcrypt.hash(user.password,null,null,function (err,hash) {
        if (err) return next(err);
        user.password =hash;
        next();

    })
    next();
});

module.exports = mongoose.model('users',userSchema);
