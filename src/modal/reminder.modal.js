import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const modal = new ModalBuilder()
  .setCustomId("reminderModal")
  .setTitle("Registra tus actividades");

const detailInput = new TextInputBuilder()
  .setCustomId("detailInput")
  .setLabel("Detalle de actividad")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

const detailActionRow = new ActionRowBuilder().addComponents(detailInput);
modal.addComponents(detailActionRow);

export const getReminderModal = () => {
  return modal;
};
