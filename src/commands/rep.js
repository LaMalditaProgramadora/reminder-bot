import { SlashCommandBuilder } from "discord.js";
import { listReports } from "../services/report.service.js";

const repCommand = {
  data: new SlashCommandBuilder()
    .setName("rep")
    .setDescription("Obtén un reporte de tus actividades.")
    .addStringOption((option) =>
      option
        .setName("fecha-inicial")
        .setDescription("La fecha inicial del reporte.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("fecha-final")
        .setDescription("La fecha final del reporte.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const username = interaction.user.username;
    const startDate = interaction.options._hoistedOptions[0].value;
    const endDate = interaction.options._hoistedOptions[1].value;
    const reports = await listReports(username, startDate, endDate);
    await interaction.reply({
      content:
        reports.length === 0
          ? `${username.toString()}, no tiene registros.`
          : `${username.toString()}, tu registro de actividades es: ${reports}`,
      ephemeral: true,
    });
  },
};
export default repCommand;
