import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { faker } from "@faker-js/faker";

function getMessage() {
  const userName = faker.internet.userName();
  return {
    id: faker.string.uuid(),
    from: userName,
    subject: "Hello from " + userName,
    body: "Long message body here",
    received: Date.now(),
  };
}

let messages = [getMessage()];

setInterval(() => {
  if (messages.length > 10) {
    messages = [];
  }
  messages.push(getMessage());
}, 10000);

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/messages/unread", async (request, response) => {
  const res = {
    status: "ok",
    timestamp: Date.now(),
    messages: messages,
  };
  response.status(200).send(JSON.stringify(res)).end();
  messages = [];
});

const server = http.createServer(app);

const port = process.env.PORT || 7070;

const bootstrap = async () => {
  try {
    server.listen(port, () =>
      console.log(`Server has been started on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();