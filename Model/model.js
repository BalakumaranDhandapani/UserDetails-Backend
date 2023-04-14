const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new mongoose.Schema({
    userid: {
        //required:true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    isDeleted: {
        required: false,
        type: Boolean
    }
})

const Usermodel = mongoose.model('Data', dataSchema);
module.exports = Usermodel