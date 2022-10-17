//
//
//

const Contact = require('../models/contact.model');

exports.contactList= function(req, res, next) {
    if (err) {
        return console.error(err);
    } else {
        res.render('contact/list', {
            title: 'Business Contact',
            ContactList: contactList
        }
        )
    };
}
