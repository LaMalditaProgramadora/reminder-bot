import { SlashCommandBuilder } from "discord.js";
import { isValidDate, listReports } from "../services/report.service.js";

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
        await interaction.reply({
          content: `${username}, hubo un error con el formato de las fechas.`,
          ephemeral: true,
        });
        return;
      }
      const reports = await listReports(username, startDate, endDate);
      await interaction.reply({
        content:
          reports.length === 0
            ? `${username.toString()}, no tiene registros.`
            : `${username.toString()}, tu registro de actividades es: ${reports}`,
        ephemeral: true,
      });
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: `${username}, hubo un error en la ejecución del comando`,
        ephemeral: true,
      });
    }
  },
};

export default repCommand;
