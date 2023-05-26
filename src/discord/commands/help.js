import { SlashCommandBuilder } from "discord.js";
import { runCommandErrorMessage } from "@infrastructure/utils/constants.js";
import {
  getReponse,
  getReponseEmbed,
} from "../../infrastructure/utils/functions.js";
import { HelpEmbed } from "../embeds/_index.js";

const helpCommand = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Ayuda con los comandos."),
  async execute(interaction) {
    const username = interaction.user.username;
    try {
      await interaction.reply(getReponseEmbed(HelpEmbed.getHelpEmbed()));
    } catch (e) {
      console.log(e);
      await interaction.reply(getReponse(username, runCommandErrorMessage));
    }
  },
};

export default helpCommand;
