import { Client, Collection, Events } from "discord.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { addCommandsToClient } from "./services/command.service.js";
import { startReminderJob } from "./services/reminder.service.js";
import { intents } from "./util/constants.js";
import { processModalResponse } from "./services/modal.service.js";

await mongoose.connect(process.env.MONGODB_URL);

dotenv.config();

const client = new Client({
  intents: intents,
});

client.commands = new Collection();
await addCommandsToClient(client);

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    const command = interaction.client.commands.get(interaction.commandName);
    if (command) await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isModalSubmit()) {
      const fields = interaction.fields;
      const username = interaction.user.username;
      const response = await processModalResponse(fields, username);
      interaction.reply(response);
    }
  } catch (error) {
    console.error(error);
  }
});

client.on(Events.ClientReady, () => {
  startReminderJob(client, "00 00 13");
  startReminderJob(client, "00 00 18");
});

client.login(process.env.DISCORD_TOKEN);
