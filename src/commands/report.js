import { SlashCommandBuilder } from "discord.js";
import {
  getReponse,
  isValidDate,
  listReports,
} from "../services/report.service.js";
import {
  dateformatErrorMessage,
  maxLengthMessage,
  maxLengthMessageErrorMessage,
  noReportsErrorMessage,
  reportSuccessfulMessage,
  runCommandErrorMessage,
} from "../util/constants.js";

const repCommand = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Obtén un reporte de tus actividades.")
    .addStringOption((option) =>
      option
        .setName("fecha-inicial")
        .setDescription("La fecha inicial del reporte (YYYY-MM-DD).")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("fecha-final")
        .setDescription("La fecha final del reporte (YYYY-MM-DD).")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const username = interaction.user.username;
      const startDate = interaction.options._hoistedOptions[0].value;
      const endDate = interaction.options._hoistedOptions[1].value;
      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        await interaction.reply(getReponse(username, dateformatErrorMessage));
        return;
      }
      const reports = await listReports(username, startDate, endDate);
      if (reports.toString().length > maxLengthMessage) {
        await interaction.reply(
          getReponse(username, maxLengthMessageErrorMessage)
        );
        return;
      }
      await interaction.reply(
        getReponse(
          username,
          reports.length === 0
            ? noReportsErrorMessage
            : reportSuccessfulMessage + reports
        )
      );
    } catch (e) {
      console.log(e);
      await interaction.reply(getReponse(username, runCommandErrorMessage));
    }
  },
};

export default repCommand;
