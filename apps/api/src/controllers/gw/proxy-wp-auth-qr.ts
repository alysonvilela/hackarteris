import axios from "axios";
import { Handler } from "express";

const fetchQr = async () => {
  try {
    const url = "http://localhost:3002/api/default/auth/qr";
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      headers: {
        accept: "*/*",
      },
    });

    console.log({ response });

    const imageBuffer = Buffer.from(response.data, "binary").toString("base64");
    return `data:${response.headers["content-type"]};base64,${imageBuffer}`;
  } catch (err) {
    console.log("FAILED ON MAKE QR IMAGE: ", err);
    return "";
  }
};

export const handler: Handler = async (req, res) => {
  try {
    const qr = await fetchQr();

    if (!qr) {
      return res
        .json({
          message: "Retry in 1 minute.",
        })
        .status(120);
    }

    return res
      .json({
        image: qr,
      })
      .status(200);
  } catch (err) {
    console.log("FAILED ON GET QR");

    return res.status(500).json({
      message: "Report this ISSUE to admin.",
    });
  }
};

export const proxyWahaAuthQr = {
  handler,
};
