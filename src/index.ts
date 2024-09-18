import fastify from "fastify";
import { version } from "../package.json";
import autoLoad from "@fastify/autoload";
import { dirname, join } from "path";
// import * as schedule from "node-schedule";

const __dirname = dirname(__filename);

// const fastify = Fastify();
const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

server.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

server.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});

server.register(require("@fastify/static"), {
  root: join(__dirname, "assets"),
});

server.register(require("@fastify/cookie"), {
  secret: "lEjoCdDLFL", // for cookies signature
  hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}, // options for parsing cookies
});

server.register(require("@fastify/view"), {
  engine: {
    nunjucks: require("nunjucks"),
  },
  templates: ["views"],
});

server.listen({ port: 3300 }, (err, address) => {

  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Software version: ${version}`);
  console.log(`Server listening at ${address}`);
});