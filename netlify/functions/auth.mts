import type { HandlerEvent, HandlerContext, Handler } from "@netlify/functions";
import axios from "axios";

interface Body {
  account_id: string;
  token: string;
}
const BASE_URL = "https://6630bffa8307360008152cb6--bejewelled-raindrop-24f246.netlify.app/";
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "POST") {
    return {
      body: JSON.stringify({ message: "Not Implemented" }),
      statusCode: 501,
    };
  }
  if (!event.body) {
    return {
      body: JSON.stringify({ message: "Missing required fields" }),
      statusCode: 400,
    };
  }

  try {
    let body: Body = JSON.parse(event.body);

    if (!body.account_id || !body.token) {
      return {
        body: JSON.stringify({ message: "Missing required fields" }),
        statusCode: 400,
      };
    }

    const response = await axios.post(`${BASE_URL}/api/calling`, body);
    console.log(response.data);

    return {
      body: JSON.stringify({ message: "Sucess" }),
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: JSON.stringify({ message: "Invalid JSON format" }),
      statusCode: 400,
    };
  }
};
