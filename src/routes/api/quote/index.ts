import {getQuotes, createQuote, updateQuote} from "../../../services/quotesService";

module.exports = async function (fastify, _opts) {
  fastify.get('/', async function (request, reply) {
    const quotes = await getQuotes(request.account);
    reply.send(quotes);
  });

  fastify.post('/', async function (request, reply) {
    const quote = await createQuote(request.body);
    reply.send(quote);
  });

  fastify.post('/:id', async function (request, reply) {
    const quote = await updateQuote(request.body);
    reply.send(quote);
  });
}