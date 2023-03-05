import dotenv from "dotenv";
import { allowedMentions } from "../util/constants.js";
import {
  createReport,
  findAllReports,
  findReportsBetweenDates,
  findReportsFromStartDate,
} from "./storage.service.js";

dotenv.config();

export const addReport = async (msg) => {
  try {
    createReport(msg.author.username, msg.content.substring(5));
    msg.reply({
      content: `${msg.author.toString()}, tu mensaje ha sido registrado.`,
      allowedMentions: allowedMentions,
    });
  } catch (error) {
    console.error(error);
  }
};

export const listReports = async (msg) => {
  try {
    let reports = [];
    let botReports = [];
    const words = msg.content.split(" ");

    if (words[2]) {
      reports = await findReportsBetweenDates(
        msg.author.username,
        `${words[1]} 00:00:00`,
        `${words[2]} 23:59:59`
      );
    } else if (words[1]) {
      reports = await findReportsFromStartDate(
        msg.author.username,
        `${words[1]} 00:00:00`
      );
    } else {
      reports = await findAllReports(msg.author.username);
    }

    reports.forEach((report) => {
      botReports.push(
        "\n" + report.date.toLocaleString() + " -> " + report.detail
      );
    });

    if (botReports.length == 0) {
      msg.reply({
        content: `${msg.author.toString()}, no tiene registros.`,
        allowedMentions: allowedMentions,
      });
    } else {
      msg.reply({
        content: `${msg.author.toString()}, tu registro de actividades es: ${botReports}`,
        allowedMentions: allowedMentions,
      });
    }
  } catch (error) {
    console.error(error);
    msg.reply({
      content: `${msg.author.toString()}, el comando es inválido.`,
      allowedMentions: allowedMentions,
    });
  }
};
