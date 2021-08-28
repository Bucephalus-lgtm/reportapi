const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        reportDetails: {
            userId: {
                type: String
            },
            marketID: {
                type: String
            },
            marketName: {
                type: String
            },
            cmdtyID: {
                type: String
            },
            marketType: {
                type: String
            },
            cmdtyName: {
                type: String
            },
            priceUnit: {
                type: String
            },
            convFctr: {
                type: Number
            },
            price: {
                type: Number
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('report', reportSchema);