import type { HandlerEvent, HandlerContext, Handler } from "@netlify/functions";
import axios from "axios";
import cookie from "cookie";
interface Body {
  account_id: string;
  token: string;
}
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log("calling");

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

    const hour = 3600000;
    const twoWeeks = 14 * 24 * hour;
    const Cookie1 = cookie.serialize("account_id", body.account_id, {
      httpOnly: true,
      path: "/",
      maxAge: twoWeeks,
      sameSite: "none",
    });
    const Cookie2 = cookie.serialize("token", body.token, {
      // secure: true,
      httpOnly: true,
      path: "/",
      maxAge: twoWeeks,
      sameSite: "none",
    });
    return {
      body: JSON.stringify({ message: "Cookie set" }),
      multiValueHeaders: {
        "Set-Cookie": [Cookie1, Cookie2],
      },
      statusCode: 200,
    };
  } catch (error) {
    return {
      body: JSON.stringify({ message: "Invalid JSON format" }),
      statusCode: 400,
    };
  }
};
