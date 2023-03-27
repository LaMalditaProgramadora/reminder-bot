import dotenv from "dotenv";
import { createReport, findReports } from "./storage.service.js";

dotenv.config();

export const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
};

export const getReponse = (username, message) => {
  return {
    content: username + message,
    ephemeral: true,
  };
};

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
      botReports.push(
        "\n" + report.date.toLocaleString() + " -> " + report.detail
      );
    });
    return botReports;
  } catch (e) {
    console.log(e);
  }
};
