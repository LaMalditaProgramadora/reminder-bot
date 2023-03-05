import { GatewayIntentBits } from "discord.js";

export const allowedMentions = { parse: ["everyone"] };

export const reminderMessage = {
  content: `Hola @everyone, es momento de registrar actividades.`,
  allowedMentions: allowedMentions,
};

export const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
];
