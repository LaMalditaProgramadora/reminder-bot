import { EmbedBuilder } from "discord.js";

export const getReportEmbed = (botReports) => {
  const responseEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Reporte de actividades");
  botReports.forEach((report) =>
    responseEmbed.addFields({ name: report.date, value: report.detail })
  );
  return responseEmbed;
};
