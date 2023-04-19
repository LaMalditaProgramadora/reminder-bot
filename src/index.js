import { Client, Collection, Events } from "discord.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { addCommandsToClient } from "./services/command.service.js";
import { startReminderJob } from "./services/reminder.service.js";
import {
  dateformatErrorMessage,
  intents,
  maxLengthMessage,
  maxLengthMessageErrorMessage,
  noReportsErrorMessage,
  reminderSuccessfulMessage,
  reportSuccessfulMessage,
} from "./util/constants.js";
import { createReport } from "./services/storage.service.js";
import {
  getReponse,
  isValidDate,
  listReports,
} from "./services/report.service.js";

await mongoose.connect(process.env.MONGODB_URL);

dotenv.config();

const client = new Client({
  intents: intents,
});

client.commands = new Collection();
await addCommandsToClient(client);

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isModalSubmit()) {
      const inputType = interaction.fields.components[0].components[0].customId;
      if (inputType && inputType === "detailInput") {
        const detail = interaction.fields.getTextInputValue("detailInput");
        const username = interaction.user.username;
        await createReport(username, detail);
        await interaction.reply(
          getReponse(username, reminderSuccessfulMessage)
        );
      } else if (
        inputType &&
        (inputType === "startDateInput" || inputType === "endDateInput")
      ) {
        const username = interaction.user.username;
        const startDate = interaction.fields.getTextInputValue("startDateInput");
        const endDate = interaction.fields.getTextInputValue("endDateInput");

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
          await interaction.reply(getReponse(username, dateformatErrorMessage));
          return;
        }
        const reports = await listReports(username, startDate, endDate);
        if (reports.toString().length > maxLengthMessage) {
          await interaction.reply(
            getReponse(username, maxLengthMessageErrorMessage)
          );
          return;
        }
        await interaction.reply(
          getReponse(
            username,
            reports.length === 0
              ? noReportsErrorMessage
              : reportSuccessfulMessage + reports
          )
        );
      }
    } else {
      const command = interaction.client.commands.get(interaction.commandName);
      await command.execute(interaction);
    }
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
