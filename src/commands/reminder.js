import { SlashCommandBuilder } from "discord.js";
import { getReminderModal } from "../modal/reminder.modal.js";
import { getReponse } from "../services/report.service.js";
import {
  runCommandErrorMessage
} from "../util/constants.js";

const remCommand = {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Registra tus actividades."),
  async execute(interaction) {
    const username = interaction.user.username;
    try {
      await interaction.showModal(getReminderModal());
    } catch (e) {
      console.log(e);
      await interaction.reply(getReponse(username, runCommandErrorMessage));
    }
  },
};

export default remCommand;
