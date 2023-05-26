import { SlashCommandBuilder } from "discord.js";
import {
  runCommandErrorMessage
} from "../../infrastructure/utils/constants.js";
import { getReponse } from "../../infrastructure/utils/functions.js";
import { ReportModal } from "../modals/_index.js";

const reportCommand = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Obtén un reporte de tus actividades."),
  async execute(interaction) {
    const username = interaction.user.username;
    try {
      await interaction.showModal(ReportModal.getReportModal());
    } catch (e) {
      console.log(e);
      await interaction.reply(getReponse(username, runCommandErrorMessage));
    }
  },
};

export default reportCommand;
