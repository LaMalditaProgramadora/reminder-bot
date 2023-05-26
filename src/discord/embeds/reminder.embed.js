import { EmbedBuilder } from "discord.js";

export const getReminderEmbed = (detail, date) => {
  const responseEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Registro de actividades exitoso")
    .addFields({ name: "Fecha", value: date })
    .addFields({ name: "Detalle", value: detail });
  return responseEmbed;
};
