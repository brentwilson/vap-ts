import { processCart } from "../../../services/cartsService";

module.exports = async function (fastify, _opts) {
  fastify.post(
    "/",
    async function (
      request: { body: any; cookies: { account: string } },
      reply: { send: (arg0: any) => void }
    ) {
      const cart = request.body;
      const account = request.cookies.account;
      await processCart(cart, account);
      reply.send({ message: "Cart processed successfully" });
    }
  );
};
