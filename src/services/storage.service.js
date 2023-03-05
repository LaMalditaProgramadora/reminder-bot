import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { DateTime } from "luxon";

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const dataBaseJimenaId = process.env.NOTION_DATABASE_JIMENA;

export const addToDatabase = async (username, detail) => {
  try {
    const date = DateTime.now().setZone('America/Lima').toISO();
    const data = {
      parent: {
        database_id: dataBaseJimenaId,
      },
      properties: {
        User: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: username,
              },
            },
          ],
        },
        Date: {
          type: "date",
          date: {
            start: date,
          },
        },
        Detail: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: detail,
              },
            },
          ],
        },
      },
    };
    const response = await notion.pages.create(data);
  } catch (error) {
    console.error(error.body);
  }
};
