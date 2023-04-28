import {
  dateformatErrorMessage,
  maxLengthMessage,
  maxLengthMessageErrorMessage,
  noReportsErrorMessage,
  reportSuccessfulMessage,
  genericErrorMessage,
} from "../util/constants.js";
import { createReport } from "./storage.service.js";
import { listReports } from "./report.service.js";
import { getReminderEmbed } from "../embed/reminder.embed.js";
import { DateTime } from "luxon";
import { getReponse, getReponseEmbed, isValidDate } from "../util/functions.js";
import { getReportEmbed } from "../embed/report.embed.js";

export const processModalResponse = async (fields, username) => {
  const inputType = fields.components[0].components[0].customId;
  let response = getReponse(username, genericErrorMessage);

  if (validateDetailInput(inputType)) {
    const detail = fields.getTextInputValue("detailInput");
    response = await processReminderModal(username, detail);
  } else if (validateDatesInput(inputType)) {
    const startDate = fields.getTextInputValue("startDateInput");
    const endDate = fields.getTextInputValue("endDateInput");
    response = await processReportModal(username, startDate, endDate);
  }

  return response;
};

const processReminderModal = async (username, detail) => {
  const now = new Date();
  const date = DateTime.fromISO(now).setZone("America/Lima").toISO();
  await createReport(username, detail, date);
  return getReponseEmbed(getReminderEmbed(detail, now.toLocaleString()));
};

const processReportModal = async (username, startDate, endDate) => {
  if (validateDatesFormat(startDate, endDate)) {
    return getReponse(username, dateformatErrorMessage);
  }

  const reports = await listReports(username, startDate, endDate);
  return getReponseEmbed(getReportEmbed(reports));
};

const validateDatesFormat = (startDate, endDate) => {
  return !isValidDate(startDate) || !isValidDate(endDate);
};

const validateDetailInput = (inputType) => {
  return inputType && inputType === "detailInput";
};

const validateDatesInput = (inputType) => {
  return (
    inputType &&
    (inputType === "startDateInput" || inputType === "endDateInput")
  );
};
