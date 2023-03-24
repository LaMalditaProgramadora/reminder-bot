import dotenv from "dotenv";
import { Client } from "discord.js";
import { addReport, listReports } from "./services/report.service.js";
import { intents } from "./util/constants.js";
import { startReminderJob } from "./services/reminder.service.js";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URL);

dotenv.config();

const client = new Client({
  intents: intents,
});

client.on("ready", (msg) => {
  console.log(`Logged in as ${client.user.tag}!`);
  startReminderJob(client, "00 00 13");
  startReminderJob(client, "00 00 18");
});

client.on("messageCreate", (msg) => {
  console.log(`New message: ${msg.content}`);
  const command = msg.content.substring(0, 4);

  switch (command) {
    case "!rem":
      addReport(msg);
      break;
    case "!rep":
      listReports(msg);
      break;
  }
});

client.login(process.env.DISCORD_TOKEN);
