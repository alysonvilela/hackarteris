import axios from "axios";
import { createServer } from "./server";
import { log } from "logger";

const port = process.env.PORT || 3001;
const server = createServer();

async function openWp() {
  try {
    const {data} = await axios.get('http://localhost:3002/api/sessions')

    if(!data.length) {
      console.log('OPENING WHATSAPP NEW SESSION')
      await axios.post('http://localhost:3002/api/sessions/start', {
        name: "default",
        config: {
          proxy: null,
          webhooks: [
            {
              url: "https://httpbin.org/post",
              events: ["message"],
              hmac: null,
              retries: null,
              customHeaders: null,
            },
          ],
        },
      })
    }
    console.log('WHATSAPP WAS ALREADY OPENED')
    console.log('URL', process.env.WHATSAPP_BASE_URL)

  } catch (err) {
    console.log(
      'FAILED ON INITIALIZE WHATSAPP'
    )
    openWp()
  }
}


server.listen(port, () => {
  log(`api running on ${port}`);

  (async() => {
    openWp()
  })()
});
