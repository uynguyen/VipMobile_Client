/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 1/6/16
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

var Client = require('node-rest-client').Client;

router.get('/auth/facebook', passport.authenticate('facebook', {scope:['email']}));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect:'/users/profile',
        failureRedirect:'/' })
);

router.get('/profile', function (req, res) {

    // console.log(req.user);
    var id = req.user.id;
    var token = req.user.token;
    var name = req.user.name;

    var client = new Client();

// set content-type header and data as json in args parameter
    var args = {
        data:{
            "id":id,
            "token":token,
            "username":name
        },
        headers:{"Content-Type":"application/json"}
    };

    client.post("http://localhost:8080/vipmobileshopapi/user/fbAuthenticate", args, function (data, response) {
        console.log("CALL POST");

        console.log(data);
        res.redirect('http://localhost:9000/#/home?id=' + id + '&token=' + token );//json(req.user);
    });


});

module.exports = router;

