import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { filePrefix } from "../../infrastructure/utils/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

export const addCommandsToClient = async (client) => {
  for (const file of commandFiles) {
    const filePath = filePrefix + path.join(commandsPath, file);
    let command = await import(filePath);
    command = command.default;
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    }
  }
};

export const getCommandsJSON = async () => {
  let commands = [];
  for (const file of commandFiles) {
    const filePath = filePrefix + path.join(commandsPath, file);
    let command = await import(filePath);
    command = command.default;
    commands.push(command.data.toJSON());
  }
  return commands;
};
