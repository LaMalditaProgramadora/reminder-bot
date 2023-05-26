import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

const modal = new ModalBuilder()
  .setCustomId("reportModal")
  .setTitle("Obtén tu reporte de actividades");

const startDateInput = new TextInputBuilder()
  .setCustomId("startDateInput")
  .setLabel("Fecha inicial (yyyy-MM-dd)")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

const endDateInput = new TextInputBuilder()
  .setCustomId("endDateInput")
  .setLabel("Fecha final (yyyy-MM-dd)")
  .setStyle(TextInputStyle.Short)
  .setRequired(true);

const startDateActionRow = new ActionRowBuilder().addComponents(startDateInput);
const endDateActionRow = new ActionRowBuilder().addComponents(endDateInput);
modal.addComponents(startDateActionRow, endDateActionRow);

export const getReportModal = () => {
  return modal;
};
