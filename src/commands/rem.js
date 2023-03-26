import { SlashCommandBuilder } from "discord.js";
import { addReport } from "../services/report.service.js";

const remCommand = {
  data: new SlashCommandBuilder()
    .setName("rem")
    .setDescription("Registra tus actividades.")
    .addStringOption((option) =>
      option
        .setName("detalle")
        .setDescription("El detalle de la actividad que realizaste.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const username = interaction.user.username;
    const detail = interaction.options._hoistedOptions[0].value;
    await addReport(username, detail);
    await interaction.reply({
      content: `${username}, tu mensaje ha sido registrado.`,
      ephemeral: true,
    });
  },
};
export default remCommand;
