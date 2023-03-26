import { Client, Collection, Events } from "discord.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { addCommandsToClient } from "./services/command.service.js";
import { startReminderJob } from "./services/reminder.service.js";
import { intents } from "./util/constants.js";

await mongoose.connect(process.env.MONGODB_URL);

dotenv.config();

const client = new Client({
  intents: intents,
});

client.commands = new Collection();
await addCommandsToClient(client);

client.on(Events.InteractionCreate, async (interaction) => {
  const command = interaction.client.commands.get(interaction.commandName);
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

client.on("ready", (msg) => {
  console.log(`Logged in as ${client.user.tag}!`);
  startReminderJob(client, "00 00 13");
  startReminderJob(client, "00 00 18");
});

client.login(process.env.DISCORD_TOKEN);
