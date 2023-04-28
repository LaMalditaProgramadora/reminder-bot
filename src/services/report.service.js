import dotenv from "dotenv";
import { createReport, findReports } from "./storage.service.js";

dotenv.config();

export const addReport = async (username, activity) => {
  try {
    createReport(username, activity);
  } catch (e) {
    console.log(e);
  }
};

export const listReports = async (username, startDate, endDate) => {
  try {
    let botReports = [];
    const reports = await findReports(
      username,
      startDate + " 00:00:00",
      endDate + " 23:59:59"
    );
    reports.forEach((report) => {
      botReports.push({
        date: report.date.toLocaleString(),
        detail: report.detail,
      });
    });
    return botReports;
  } catch (e) {
    console.log(e);
  }
};
