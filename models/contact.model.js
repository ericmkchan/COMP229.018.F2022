//
//
//

const mongoose = require('mongoose');

const contactModel = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        areaCode: Number,
        phoneNumber: Number,
        email: String
    },
    {
        collection: "bizcontactlist"
    }
);

module.exports = mongoose.model('bizcontactlist', contactModel);
