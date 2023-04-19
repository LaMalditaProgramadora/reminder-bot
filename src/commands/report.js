import { SlashCommandBuilder } from "discord.js";
import { getReportModal } from "../modal/report.modal.js";
import {
  getReponse
} from "../services/report.service.js";
import {
  runCommandErrorMessage
} from "../util/constants.js";

const repCommand = {
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

export default repCommand;
