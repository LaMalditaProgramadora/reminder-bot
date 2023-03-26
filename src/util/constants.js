import { GatewayIntentBits } from "discord.js";
import { fileURLToPath } from "url";

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
