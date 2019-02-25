
var User = require('../models/user');

module.exports= function (router) {
    
    // creating route for users to register

    router.post('/users',function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (req.body.username == null || req.body.username ==""){
        res.send('Enter username!');}
    else if (req.body.password==null||req.body.password==""){
        res.send('Enter password!');}
    else if (req.body.email==null||req.body.email==""){
        res.send('Enter email!');}
    else {
        user.save(function (err) {
            if (err){
                res.send('Email or username already exist')
            }
            else {
                res.send('user '+ user.username+ ' created');
            }
        })
    }
});
    return router;
}