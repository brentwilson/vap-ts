import { $Enums } from "@prisma/client";
import {
  getQuotes,
  createQuote,
  updateQuote,
  getQuoteItems,
  getQuoteItem,
} from "../../../services/quotesService";

module.exports = async function (
  fastify: {
    get: (
      arg0: string,
      arg1: (request: any, reply: any) => Promise<void>
    ) => void;
    post: (
      arg0: string,
      arg1: {
        (request: any, reply: any): Promise<void>;
        (request: any, reply: any): Promise<void>;
      }
    ) => void;
  },
  _opts: any
) {
  fastify.get("/", async function (request, reply) {
    const quotes = await getQuotes(request.account);
    reply.send(quotes);
  });

  fastify.get("/quoteitems", async function (request, reply) {
    const quoteItems = await getQuoteItems(request.account);
    reply.send(quoteItems);
  });

  fastify.get("/quoteitems/:id", async function (request, reply) {
    const quoteItem = await getQuoteItem(request.params.id);
    reply.send(quoteItem);
  });

  fastify.post(
    "/",
    async function (
      request: { body: any },
      reply: {
        send: (arg0: {
          id: string;
          accountId: string;
          status: $Enums.QuoteStatus;
          createdAt: Date;
          updatedAt: Date;
        }) => void;
      }
    ) {
      const quote = await createQuote(request.body);
      reply.send(quote);
    }
  );

  fastify.post(
    "/:id",
    async function (
      request: { body: any },
      reply: {
        send: (arg0: {
          id: string;
          accountId: string;
          status: $Enums.QuoteStatus;
          createdAt: Date;
          updatedAt: Date;
        }) => void;
      }
    ) {
      const quote = await updateQuote(request.body);
      reply.send(quote);
    }
  );
};
