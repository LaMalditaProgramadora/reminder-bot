import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const dataBaseJimenaId = process.env.NOTION_DATABASE_JIMENA;

const getDate = () => {
  let newDate = new Date().toLocaleString("sv-SE");
  return newDate.substring(0, 10) + "T" + newDate.substring(11) + "-05:00";
};

export const addToDatabase = async (username, detail) => {
  try {
    const response = await notion.pages.create({
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
            start: getDate(),
          },
        },
        Detail: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: detail.substring(9),
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.error(error.body);
  }
};
