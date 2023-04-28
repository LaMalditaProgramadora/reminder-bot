import { EmbedBuilder } from "discord.js";

const reminderEmbed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle("Registro de actividades exitoso");

export const getReminderEmbed = (detail, date) => {
  return reminderEmbed
    .addFields({ name: "Fecha", value: date })
    .addFields({ name: "Detalle", value: detail });
};
