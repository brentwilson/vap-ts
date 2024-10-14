import * as accountsService from "../../../services/accountsService";

module.exports = async function (fastify, _opts) {
  fastify.get("/", async function (_request, reply) {
    const accounts = await accountsService.getAccounts();
    reply.send(accounts);
  });

  fastify.get("/:id", async function (request, reply) {
    const account = await accountsService.getAccount(request.params.id);
    reply.send(account);
  });

  fastify.post("/", async function (request, reply) {
    const account = request.body;
    const upsertedAccount = await accountsService.upsertAccount(account);
    reply.send(upsertedAccount);
  });
};
