module.exports = async function (fastify, _opts) {
  fastify.get('/', async function (_request: any, reply: { view: (arg0: string) => void; }) {
    return reply.view('index.html');
  });

  fastify.get('/login', async function (_request: any, reply: { view: (arg0: string) => void; }) {
    return reply.view('admin/login.html');
  });
}
