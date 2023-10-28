import axios from "axios";
import { Handler } from "express";

interface Response {
  name: string;
  status: string;
  config: Config;
  me?: any;
}

interface Config {
  proxy?: any;
  webhooks: Webhook[];
}

interface Webhook {
  url: string;
  events: string[];
  hmac?: any;
  retries?: any;
  customHeaders?: any;
}

const fetchCurrentSession = async () => {
  const url = "http://localhost:3002/api/sessions";

  const { data } = await axios.get<Response[]>(url, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const { config, name, ...rest } = data?.[0]

  return {
    ...rest,
  };
};

export const handler: Handler = async (req, res) => {
  const response = await fetchCurrentSession();

  return res.json({
    ...response,
  }).status(200)
};
