import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { addToDatabase } from "./src/services/report.service.js";
import { CronJob } from "cron";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", (msg) => {
  console.log(`Logged in as ${client.user.tag}!`);

  let scheduledMessage13 = new CronJob("00 00 13 * * 1-5", () => {
    let channel = client.channels.cache.find(channel => channel.name === process.env.DISCORD_CHANNEL_NAME);
    channel.send({
      content: `Hola @everyone, es momento de registrar actividades.`,
      allowedMentions: { parse: ["everyone"] },
    });
  });

  let scheduledMessage18 = new CronJob("00 00 18 * * 1-5", () => {
    let channel = client.channels.cache.find(channel => channel.name === process.env.DISCORD_CHANNEL_NAME);
    channel.send({
      content: `Hola @everyone, es momento de registrar actividades.`,
      allowedMentions: { parse: ["everyone"] },
    });
  });

  scheduledMessage13.start();
  scheduledMessage18.start();
});

client.on("messageCreate", (msg) => {
  console.log(`New message: ${msg.content}`);
  const command = msg.content.substring(0, 9);
  if (command === "!reminder") {
    addToDatabase(msg.author.username, msg.content);
    msg.reply({
      content: `${msg.author.toString()}, tu mensaje ha sido registrado.`,
      allowedMentions: { parse: ["everyone"] },
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
