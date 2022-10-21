//
//
//

const { model } = require('mongoose');
const Contact = require('../models/contact.model');

// List business contact list
exports.bizcontactList = function(req, res, next) {
    if (req.user) {
        Contact.find((err, bizcontactList) => {

        if (err) {
            return console.error(err);
        } else {
            res.render('bizcontactlist/list', {
                title: 'Business Contact',
                name: 'Eric Chan',
                ContactList: bizcontactList
            })
        }
        }).sort( {"lastName": 1});
    } else {
        return res.redirect('/users/signin');
    }
}

// Update page for business contact list
module.exports.displayEditPage = (req, res, next) => {
    if (req.user) {
        let id = req.params.id;

        Contact.findById(id, (err, itemToEdit) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                res.render('bizcontactlist/addedit', {
                    title: 'Update Business Contact',
                    name: 'Eric Chan',
                    label: 'Update',
                    item: itemToEdit
                })
            }
        });
    } else {
        return res.redirect('/users/signin');
    }
}

// Process update page for business contact list
module.exports.processEditPage = (req, res, next) => {
    if (req.user) {

        let id = req.params.id;

        let updatedItem = Contact({
            _id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            areaCode: req.body.areaCode,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        });

        Contact.updateOne({_id: id}, updatedItem, (err) => {
                if (err) {
                console.log(err);
                res.end(err);
            } else {
                res.redirect('/bizcontactlist');
            }
        });
    } else {
        return res.redirect('/users/signin');
    }
}

// Add page for business contact list
module.exports.displayAddPage = (req, res, next) => {
    if (req.user) {
        let newItem = Contact();

        res.render('bizcontactlist/addedit', {
            title: 'Add Business Contact',
            name: 'Eric Chan',
            label: 'Add',
            item: newItem
        });
    } else {
        return res.redirect('/users/signin');
    }
}

module.exports.processAddPage = (req, res, next) => {
    if (req.user) {
        let newItem = Contact({
            _id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            areaCode: req.body.areaCode,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        });

        Contact.create(newItem, (err, item) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                console.log(item);
                res.redirect('/bizcontactlist');
            }
        });
    } else {
        return res.redirect('/users/signin');
    }
}

module.exports.performDelete = (req, res, next) => {
    if (req.user) {
        let id = req.params.id;

        Contact.remove({_id: id}, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                res.redirect('/bizcontactlist');
            }
        });
    } else {
        return res.redirect('/users/signin');
    }
}
