import { SlashCommandBuilder } from "discord.js";
import { getReportModal } from "../modals/report.modal.js";
import {
  runCommandErrorMessage
} from "../../infrastructure/utils/constants.js";
import { getReponse } from "../../infrastructure/utils/functions.js";

const reportCommand = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Obtén un reporte de tus actividades."),
  async execute(interaction) {
    try {
      await interaction.showModal(getReportModal());
    } catch (e) {
      console.log(e);
      await interaction.reply(getReponse(username, runCommandErrorMessage));
    }
  },
};

export default reportCommand;
