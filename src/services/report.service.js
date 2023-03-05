import dotenv from "dotenv";
import { allowedMentions } from "../util/constants.js";
import { addToDatabase } from "./storage.service.js";

dotenv.config();

export const addReport = async (msg) => {
  try {
    addToDatabase(msg.author.username, msg.content.substring(5));
    msg.reply({
      content: `${msg.author.toString()}, tu mensaje ha sido registrado.`,
      allowedMentions: allowedMentions,
    });
  } catch (error) {
    console.error(error);
  }
};
