import { EmbedBuilder } from "discord.js";

const reportEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("Reporte de actividades");

export const getReportEmbed = (botReports) => {
  const responseEmbed = reportEmbed;
  botReports.forEach((report) =>
    responseEmbed.addFields({ name: report.date, value: report.detail })
  );
  return responseEmbed;
};
