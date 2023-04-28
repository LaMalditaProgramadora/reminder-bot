import { SlashCommandBuilder } from "discord.js";
import { getReminderModal } from "../modal/reminder.modal.js";
import {
  runCommandErrorMessage
} from "../util/constants.js";
import { getReponse } from "../util/functions.js";

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
