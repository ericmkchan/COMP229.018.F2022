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
    }
);
mongoose.model('Contact', contactModel);
