import { SlashCommandBuilder } from "discord.js";
import { runCommandErrorMessage } from "../util/constants.js";
import { getReponse, getReponseEmbed } from "../util/functions.js";
import { getHelpEmbed } from "../embed/help.embed.js";

const helpCommand = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Ayuda con los comandos."),
  async execute(interaction) {
    const username = interaction.user.username;
    try {
      await interaction.reply(getReponseEmbed(getHelpEmbed()));
    } catch (e) {
      console.log(e);
      await interaction.reply(getReponse(username, runCommandErrorMessage));
    }
  },
};

export default helpCommand;
