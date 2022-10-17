//
//
//

const Contact = require('../models/contact.model');

exports.bizcontactList = function(req, res, next) {

    Contact.find((err, bizcontactList) => {

    if (err) {
        return console.error(err);
    } else {
        res.render('bizcontactlist/list', {
            title: 'Business Contact',
            ContactList: bizcontactList
        })
    }
    });
}
