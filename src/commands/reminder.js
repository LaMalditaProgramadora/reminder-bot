import { SlashCommandBuilder } from "discord.js";
import { addReport } from "../services/report.service.js";

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
      await interaction.reply({
        content: `${username}, tu mensaje ha sido registrado.`,
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

export default remCommand;
