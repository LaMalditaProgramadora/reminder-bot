import { EmbedBuilder } from "discord.js";

const helpEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("Ayuda con los comandos")
  .addFields({ name: "/reminder", value: "Registra tus actividades." })
  .addFields({
    name: "/report",
    value: "Obtén un reporte de tus actividades.",
  });

export const getHelpEmbed = () => {
  return helpEmbed;
};
