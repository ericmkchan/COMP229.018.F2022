const User = require('../models/login');
const passport = require('passport');

function getErrorMessage(err) {
    let message = '';

    if (err.code) {
        switch (err.code) {
        case 11000:
        case 11001:
            message = 'Username already exists';
            break;
        default:
            message = 'Error is found'
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
}

module.exports.renderSignin = function(req, res, next) {
    if (!req.user) {
        res.render('auth/signin', {
            title: 'Login Form',
            name: 'Eric Chan',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        // console.log(req.user);
        return res.redirect('/bizcontactlist');
    }
}

module.exports.renderSignup = function(req, res, next) {
    if (!req.user) {
        let newUser = User();
        res.render('auth/signup', {
            title: 'Sign-up Form',
            name: 'Eric Chan',
            messages: req.flash('error'),
            user: newUser
        });
    } else {
        return res.redirect('/bizcontactlist');
    }
}

module.exports.signup = function(req, res, next) {
     if (!req.user && req.body.password === req.body.password_confirm) {

        console.log(req.body);
        
        let user = new User(req.body);
        user.provider = 'local';
        console.log(user);

        user.save((err) => {
            if(err) {
                let message = getErrorMessage(err);

                req.flash('error', message);
                return res.render('auth/signup', {
                    title: 'Sign-up Form',
                    name: 'Eric Chan',
                    messages: req.flash('error'),
                    user: user
                });
            }
            req.login(user, (err) => {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/bizcontactlist');
    }
}

module.exports.signout = function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/users/signin');
    });
}

module.exports.signin = function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: req.session.url || '/bizcontactlist',
        failureRedirect: '/users/signin',
        failureFlash: true
    }) (req, res, next);
    delete req.session.url;
}
