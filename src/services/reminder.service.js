import { CronJob } from "cron";
import dotenv from "dotenv";
import { reminderMessage } from "../util/constants.js";

dotenv.config();

export const startReminderJob = (client, hour) => {
  let reminderJob = new CronJob(hour.toString() + " * * 1-5", () => {
    const channelIds = JSON.parse(process.env.DISCORD_CHANNEL_IDS);
    channelIds.forEach((channelId) => {
      client.channels.cache.get(channelId).send(reminderMessage);
    });
  });

  reminderJob.start();
};
