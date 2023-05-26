import { SlashCommandBuilder } from "discord.js";
import { getReminderModal } from "../modals/reminder.modal.js";
import { runCommandErrorMessage } from "../../infrastructure/utils/constants.js";
import { getReponse } from "../../infrastructure/utils/functions.js";

const reminderCommand = {
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

export default reminderCommand;
