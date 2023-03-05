import dotenv from "dotenv";
import { DateTime } from "luxon";
import Report from "../model/report.model.js";

dotenv.config();

export const createReport = async (username, detail) => {
  try {
    const report = new Report({
      username: username,
      date: DateTime.now().setZone("America/Lima").toISO(),
      detail: detail,
    });
    await report.save();
  } catch (e) {
    console.log(e);
  }
};

export const findAllReports = async (username) => {
  try {
    let courses = await Report.find({ username: username });
    return courses;
  } catch (e) {
    console.log(e);
  }
};

export const findReportsBetweenDates = async (username, startDate, endDate) => {
  try {
    let courses = await Report.find({
      username: username,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return courses;
  } catch (e) {
    console.log(e);
  }
};

export const findReportsFromStartDate = async (username, startDate) => {
  try {
    let courses = await Report.find({
      username: username,
      date: {
        $gte: startDate,
        $lte: DateTime.now().setZone("America/Lima").toISO(),
      },
    });
    return courses;
  } catch (e) {
    console.log(e);
  }
};
