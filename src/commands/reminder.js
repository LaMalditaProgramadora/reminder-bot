import { SlashCommandBuilder } from "discord.js";
import { addReport, getReponse } from "../services/report.service.js";
import { reminderSuccessfulMessage } from "../util/constants.js";

const remCommand = {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Registra tus actividades.")
    .addStringOption((option) =>
      option
        .setName("detalle")
        .setDescription("El detalle de la actividad que realizaste.")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const username = interaction.user.username;
      const detail = interaction.options._hoistedOptions[0].value;
      await addReport(username, detail);
      await interaction.reply(getReponse(username, reminderSuccessfulMessage));
    } catch (e) {
      console.log(e);
      await interaction.reply(
        await interaction.reply(getReponse(username, runCommandErrorMessage))
      );
    }
  },
};

export default remCommand;
