import dotenv from "dotenv";
import Report from "../model/report.model.js";

dotenv.config();

export const createReport = async (username, detail, date) => {
  try {
    const report = new Report({
      username: username,
      date: date,
      detail: detail,
    });
    await report.save();
  } catch (e) {
    console.log(e);
  }
};

export const findReports = async (username, startDate, endDate) => {
  try {
    let reports = await Report.find({
      username: username,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return reports;
  } catch (e) {
    console.log(e);
  }
};
