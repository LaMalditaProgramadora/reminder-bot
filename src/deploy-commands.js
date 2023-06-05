import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { getCommandsJSON } from "./discord/services/command.service.js";

dotenv.config();

const commands = await getCommandsJSON();
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    const serversId = JSON.parse(process.env.DISCORD_SERVERS_IDS);
    serversId.forEach(async (serverId) => {
      await rest.put(
        Routes.applicationGuildCommands(
          process.env.DISCORD_APPLICATION_ID,
          serverId
        ),
        { body: commands }
      );
    });

    console.log(
      'Actualización de comandos correcta.'
    );
  } catch (error) {
    console.error(error);
  }
})();
