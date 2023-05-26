import { SlashCommandBuilder } from "discord.js";
import { runCommandErrorMessage } from "../../infrastructure/utils/constants.js";
import { getReponse } from "../../infrastructure/utils/functions.js";
import { ReminderModal } from "../modals/_index.js";

const reminderCommand = {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("Registra tus actividades."),
  async execute(interaction) {
    const username = interaction.user.username;
    try {
      await interaction.showModal(ReminderModal.getReminderModal());
    } catch (e) {
      console.log(e);
      await interaction.reply(getReponse(username, runCommandErrorMessage));
    }
  },
};

export default reminderCommand;
