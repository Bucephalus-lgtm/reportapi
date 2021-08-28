const Report = require('../models/report');

exports.create_report = async (req, res) => {
    try {
        const { userID, marketID, marketName, cmdtyID, marketType, cmdtyName, convFctr } = req.body;
        let price = req.body.price;
        let priceUnit = req.body.priceUnit;

        price = price / convFctr;
        priceUnit = "Kg";

        const report = new Report({
            reportDetails: {
                userID, marketID, marketName, cmdtyID, marketType, cmdtyName,
                priceUnit, convFctr, price
            }
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
        const report = await Report.findById(reportId);
        return res.json(report);
    } catch (err) {
        console.error(err.message);
        return res.json({ err: err.message });
    }
}