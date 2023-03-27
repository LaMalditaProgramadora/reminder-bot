import { GatewayIntentBits } from "discord.js";

export const allowedMentions = { parse: ["everyone"] };

export const reminderMessage = {
  content: `Hola @everyone, es momento de registrar actividades.`,
  allowedMentions: allowedMentions,
};

export const filePrefix = "file:\\\\\\";

export const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
];

export const maxLengthMessage = 2000;
export const dateformatErrorMessage = ', hubo un error con el formato de las fechas.';
export const maxLengthMessageErrorMessage = ', intente un rango de fechas más pequeño.';
export const noReportsErrorMessage = ', no tiene registros.';
export const reportSuccessfulMessage = ', tu registro de actividades es: ';
export const reminderSuccessfulMessage = ', tu mensaje ha sido registrado.';
export const runCommandErrorMessage = ', hubo un error en la ejecución del comando';