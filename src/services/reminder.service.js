import { CronJob } from "cron";
import dotenv from "dotenv";
import { reminderMessage } from "../util/constants.js";

dotenv.config();

export const startReminderJob = (client, hour) => {
  let reminderJob = new CronJob("00 00 " + hour.toString() + " * * 1-5", () => {
    let channel = client.channels.cache.find(
      (channel) => channel.name === process.env.DISCORD_CHANNEL_NAME
    );
    channel.send(reminderMessage);
  });

  reminderJob.start();
};
