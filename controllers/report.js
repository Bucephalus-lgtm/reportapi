const Report = require('../models/report');

exports.create_report = async (req, res) => {
    try {
        const { userID, marketID, marketName, cmdtyID, marketType, cmdtyName, convFctr, price, priceUnit } = req.body;

        const report = new Report({
            reportDetails: [{
                userID, marketID, marketName, cmdtyID, marketType, cmdtyName,
                priceUnit, convFctr, price
            }]
        });
        await report.save();
        return res.json({ status: "success", reportID: report._id });
    } catch (err) {
        console.error(err.message);
        return res.json({ err: err.message });
    }
};

exports.get_report = async (req, res) => {
    try {
        const reportId = req.query.reportId;
        const r = await Report.find({});
        console.log({ r }); //612d34906461c3a7b2d44e98
        const report = await Report.findById(reportId);

        const users = [];
        let price = 0;

        const reportDetails = report.reportDetails;
        for (let i = 0; i < reportDetails.length; i++) {
            users.push(reportDetails[i].userId);
            price += reportDetails.price / reportDetails.convFctr;
        }
        price = price / reportDetails.length;
        return res.json({
            _id: reportId,
            cmdtyID: report.cmdtyID,
            cmdtyName: report.cmdtyName,
            marketID: report.cmdtyID,
            marketName: report.marketName,
            users,
            timestamp: report.timestamp,
            priceUnit: "Kg",
            price
        });
    } catch (err) {
        console.error(err.message);
        return res.json({ err: err.message });
    }
}